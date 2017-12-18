'use strict';

module.exports = function (UserBadge) {

    UserBadge.listUserBadges = function (ctx, cb) {
        let userIdValue = ctx.req.accessToken.userId;

        let configs = ctx.req.configs;
        UserBadge.find({
            where: {
                userId: userIdValue,
            },
            include: [
                {
                    user: ["scores"],
                },
                {
                    badge: {
                        level: ["category"],
                    },
                }],
            limit: configs[0].value,
        }, function (err, userBadges) {

            let uBadges = [];
            let usBadges = [];
            uBadges = uBadges.concat(userBadges);
            usBadges = usBadges.concat(userBadges);
            if (uBadges.length < configs[0].value) {
                let noOfDefaultBadges = configs[0].value - uBadges.length;
                let index = 0;

                const promises = [];
                uBadges.forEach(function (uBadge) {
                    if (index < noOfDefaultBadges) {
                        uBadge = uBadge.toJSON();
                        promises.push(new Promise(function (resolve) {
                            getNextLevelBadges(parseInt(uBadge.badge.level.sequence) + 1, uBadge.badge.level.categoryId, configs, resolve);
                        })
                        );
                        ++index;
                    }
                });

                Promise.all(promises)
                    .then((response) => {
                        response.forEach(function (resp) {
                            resp = resp.toJSON();
                            let tempBadges = {
                                "badge": resp
                            };

                            tempBadges.pointsForNextLevel = tempBadges.badge.level.pointsEndRange;
                            usBadges = usBadges.concat(tempBadges);
                        });
                        let defaultPromises = [];
                        if (usBadges.length < configs[0].value) {
                            defaultPromises.push(new Promise(function (resolve) {
                                getDefaultBadges(resolve);
                            })
                            );
                            Promise.all(defaultPromises)
                                .then((defaultResponse) => {
                                    index = 0;
                                    noOfDefaultBadges = configs[0].value - usBadges.length;
                                    defaultResponse[0].forEach(function (resp) {
                                        resp = resp.toJSON();
                                        if (index < noOfDefaultBadges) {
                                            let foundCat = false;
                                            uBadges.forEach(function (uBadge) {
                                                uBadge = uBadge.toJSON();

                                                if (uBadge.badge.level.categoryId == resp.categoryId) {
                                                    foundCat = true;
                                                }
                                            });
                                            if (!foundCat) {
                                                let tempBadges = {
                                                    "badge": resp
                                                };
                                                usBadges = usBadges.concat(tempBadges);
                                                ++index;
                                            }
                                        }
                                    });
                                    cb(null, usBadges);
                                });
                        } else {
                            cb(null, usBadges);
                        }
                    });
            } else {
                cb(null, badges);
            }
        });
    };

    var getNextLevelBadges = function (nextLevelSequence, categoryId, configs, resolve) {
        UserBadge.app.models['Level'].find({
            where: {
                sequence: nextLevelSequence,
                categoryId: categoryId
            }
        }, function (err, nextLevel) {
            UserBadge.app.models['Badge'].find({
                where: {
                    levelId: nextLevel[0].id
                },
                include: {
                    level: ["category"],
                },
                limit: configs[0].value,
            }, function (err, badges) {
                resolve(badges[0]);
            });
        })
    };
    var getDefaultBadges = function (resolve) {

        UserBadge.app.models['Badge'].find({
            where: {
                default: true
            },
            include: {
                level: ["category"],
            }
        }, function (err, badges) {
            resolve(badges);
        });

    };
    UserBadge.beforeRemote('listUserBadges', function (context, unused, next) {
        UserBadge.app.models.config.find({
            where: { name: 'no_of_badges_in_widget' },
        },
            function (err, configs) {
                context.req.configs = configs;
                next();
            });
    });

    UserBadge.remoteMethod('listUserBadges', {
        accepts: [
            { arg: 'ctx', type: 'object', http: { source: 'context' } },
        ],
        http: {
            path: '/list-user-badges',
            verb: 'get',
        },
        returns: {
            arg: 'badges',
            type: 'array',
        },
    });

    UserBadge.listSystemBadges = function (ctx, cb) {
        let userIdValue = ctx.req.accessToken.userId;

        UserBadge.find({
            where: {
                userId: userIdValue,
            },
            include: [
                {
                    user: ["scores"],
                },
                {
                    badge: {
                        level: ["category"],
                    },
                }],
        }, function (err, userBadges) {

            let usBadges = [];
            let defaultPromises = [];

            defaultPromises.push(new Promise(function (resolve) {
                getAllBadges(resolve);
            })
            );
            Promise.all(defaultPromises)
                .then((defaultResponse) => {
                    defaultResponse[0].forEach(function (resp) {
                        resp = resp.toJSON();
                        userBadges.forEach(function (uBadge) {
                            uBadge = uBadge.toJSON();
                            if (uBadge.badge.id == resp.id) {
                                resp.userId = uBadge.userId;
                                resp.user = uBadge.user;
                            }
                        });
                        let tempBadges = {
                            "badge": resp
                        };

                        if (resp.userId !== undefined && resp.userId !== '') {
                            tempBadges.userId = resp.userId;
                            tempBadges.user = resp.user;
                            delete resp.userId;
                            delete resp.user;
                        } else {


                            tempBadges.pointsForNextLevel = tempBadges.badge.level.pointsEndRange;
                        }
                        usBadges = usBadges.concat(tempBadges);
                    });

                    let categoryGroup = groupByCategory(usBadges);
                    cb(null, categoryGroup);
                });
        });
    };


    var groupByCategory = function (usBadges) {

        let categoryGroup = {};
        usBadges.forEach(function (resp) {
            if (categoryGroup[resp.badge.level.categoryId] != undefined) {
                let catArr = categoryGroup[resp.badge.level.categoryId];
                catArr.push(resp);
                categoryGroup[resp.badge.level.categoryId] = catArr;
            } else {
                let catArr = [];
                catArr.push(resp);
                categoryGroup[resp.badge.level.categoryId] = catArr;
            }
        });

        return categoryGroup;
    };

    var getDefaultBadges = function (resolve) {

        UserBadge.app.models['Badge'].find({
            where: {
                default: true
            },
            include: {
                level: ["category"],
            }
        }, function (err, badges) {
            resolve(badges);
        });

    };
    var getAllBadges = function (resolve) {

        UserBadge.app.models['Badge'].find({
            include: {
                level: ["category"],
            }
        }, function (err, badges) {
            resolve(badges);
        });

    };

    UserBadge.remoteMethod('listSystemBadges', {
        accepts: [
            { arg: 'ctx', type: 'object', http: { source: 'context' } },
        ],
        http: {
            path: '/list-system-badges',
            verb: 'get',
        },
        returns: {
            arg: 'badges',
            type: 'array',
        },
    });
    var getNextLevelsInCategories = function (score, categoryId, resolve) {
        UserBadge.app.models['Level'].find({
            where: {
                categoryId: categoryId
            }
        }, function (err, nextLevels) {
            score.levels = nextLevels;
            resolve(score);
        })
    };




    UserBadge.listUserCategories = function (ctx, cb) {
        let userIdValue = ctx.req.accessToken.userId;

        let configs = ctx.req.configs;
        UserBadge.app.models.score.find({
            where: {
                userId: userIdValue,
            },
            include: ["category"],
            limit: configs[0].value,
        }, function (err, userScores) {
            const promises = [];


            const categoryIdArr = [];

            if (userScores != undefined) {
                userScores.forEach(function (score) {
                    categoryIdArr.push(score.categoryId);
                    promises.push(new Promise(function (resolve) {
                        getNextLevelsInCategories(score, score.categoryId, resolve);
                    }));
                });

                let noOfCategories = configs[0].value;
                let noOfDefaultCategories = noOfCategories - userScores.length;

                const catPromises = [];
                if (noOfDefaultCategories > 0) {
                    catPromises.push(new Promise(function (resolve) {
                        UserBadge.app.models.category.find({
                            limit: configs[0].value,
                        }, function (err, categories) {
                            resolve(categories)
                        })
                    })
                    );
                    Promise.all(catPromises)
                        .then((response) => {
                            let index = 0;

                            response[0].forEach(function (category) {
                                if (index < noOfDefaultCategories) {

                                    if (categoryIdArr.indexOf(category.id) == -1) {
                                        let score = {};
                                        score.category = category;
                                        score.categoryId = category.id;                                        
                                        index++;
                                        promises.push(new Promise(function (resolve) {
                                            getNextLevelsInCategories(score, category.id, resolve);
                                        }));
                                    }
                                }
                            });

                            Promise.all(promises)
                                .then((response) => {
                                    console.log(response);
                                    cb(null, response);
                                });
                        });


                } else {
                    Promise.all(promises)
                        .then((response) => {

                            console.log(response);
                            cb(null, response);
                        });
                }

            } else {
                cb(null);
            }

        });
    };


    UserBadge.beforeRemote('listUserCategories', function (context, unused, next) {
        UserBadge.app.models.config.find({
            where: { name: 'no_of_categories_in_widget' },
        },
            function (err, configs) {
                context.req.configs = configs;
                next();
            });
    });

    UserBadge.remoteMethod('listUserCategories', {
        accepts: [
            { arg: 'ctx', type: 'object', http: { source: 'context' } },
        ],
        http: {
            path: '/list-user-categories',
            verb: 'get',
        },
        returns: {
            arg: 'categories',
            type: 'array',
        },
    });


















};
