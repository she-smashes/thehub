/*jshint esversion: 6 */
/*global fetch, btoa */
import Q from 'q';
/**
 * 
 * @class initiative
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
let initiative = (function() {
    'use strict';

    function initiative(options) {
        let domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    function serializeQueryParams(parameters) {
        let str = [];
        for (let p in parameters) {
            if (parameters.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(parameters[p]));
            }
        }
        return str.join('&');
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    let parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name initiative#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    initiative.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred) {
        const queryParams = queryParameters && Object.keys(queryParameters).length ? serializeQueryParams(queryParameters) : null;
        const urlWithParams = url + (queryParams ? '?' + queryParams : '');

        if (body && !Object.keys(body).length) {
            body = undefined;
        }

        fetch(urlWithParams, {
            method,
            headers,
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json();
        }).then((body) => {
            deferred.resolve(body);
        }).catch((error) => {
            deferred.reject(error);
        });
    };

    /**
     * Create a new instance of the model and persist it into the data source.
     * @method
     * @name initiative#userBadge_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.userBadge_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#userBadge_patchOrCreate
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.userBadge_patchOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#userBadge_replaceOrCreate__put_userBadges
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.userBadge_replaceOrCreate__put_userBadges = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find all instances of the model matched by filter from the data source.
     * @method
     * @name initiative#userBadge_find
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.userBadge_find = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#userBadge_replaceOrCreate__post_userBadges_replaceOrCreate
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.userBadge_replaceOrCreate__post_userBadges_replaceOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/replaceOrCreate';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     * @method
     * @name initiative#userBadge_upsertWithWhere
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.userBadge_upsertWithWhere = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/upsertWithWhere';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name initiative#userBadge_exists__get_userBadges__id__exists
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.userBadge_exists__get_userBadges__id__exists = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/{id}/exists';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name initiative#userBadge_exists__head_userBadges__id_
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.userBadge_exists__head_userBadges__id_ = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('HEAD', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a model instance by {{id}} from the data source.
     * @method
     * @name initiative#userBadge_findById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {string} parameters.filter - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.userBadge_findById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#userBadge_replaceById__put_userBadges__id_
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.userBadge_replaceById__put_userBadges__id_ = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a model instance by {{id}} from the data source.
     * @method
     * @name initiative#userBadge_deleteById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.userBadge_deleteById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#userBadge_prototype_patchAttributes
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - userBadge id
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.userBadge_prototype_patchAttributes = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#userBadge_replaceById__post_userBadges__id__replace
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.userBadge_replaceById__post_userBadges__id__replace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/{id}/replace';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find first instance of the model matched by filter from the data source.
     * @method
     * @name initiative#userBadge_findOne
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.userBadge_findOne = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/findOne';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update instances of the model matched by {{where}} from the data source.
     * @method
     * @name initiative#userBadge_updateAll
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.userBadge_updateAll = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/update';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Count instances of the model matched by where from the data source.
     * @method
     * @name initiative#userBadge_count
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.userBadge_count = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a change stream.
     * @method
     * @name initiative#userBadge_createChangeStream__post_userBadges_change_stream
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.options - 
     */
    initiative.prototype.userBadge_createChangeStream__post_userBadges_change_stream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/change-stream';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            form['options'] = parameters['options'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a change stream.
     * @method
     * @name initiative#userBadge_createChangeStream__get_userBadges_change_stream
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.options - 
     */
    initiative.prototype.userBadge_createChangeStream__get_userBadges_change_stream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/userBadges/change-stream';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            queryParameters['options'] = parameters['options'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a related item by id for events.
     * @method
     * @name initiative#initiative_prototype___findById__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - initiative id
     * @param {string} parameters.fk - Foreign key for events
     */
    initiative.prototype.initiative_prototype___findById__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/events/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a related item by id for events.
     * @method
     * @name initiative#initiative_prototype___destroyById__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - initiative id
     * @param {string} parameters.fk - Foreign key for events
     */
    initiative.prototype.initiative_prototype___destroyById__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/events/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update a related item by id for events.
     * @method
     * @name initiative#initiative_prototype___updateById__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - initiative id
     * @param {string} parameters.fk - Foreign key for events
     * @param {} parameters.data - 
     */
    initiative.prototype.initiative_prototype___updateById__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/events/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Fetches belongsTo relation users.
     * @method
     * @name initiative#initiative_prototype___get__users
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - initiative id
     * @param {boolean} parameters.refresh - 
     */
    initiative.prototype.initiative_prototype___get__users = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/users';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['refresh'] !== undefined) {
            queryParameters['refresh'] = parameters['refresh'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Fetches belongsTo relation createdByUsers.
     * @method
     * @name initiative#initiative_prototype___get__createdByUsers
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - initiative id
     * @param {boolean} parameters.refresh - 
     */
    initiative.prototype.initiative_prototype___get__createdByUsers = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/createdByUsers';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['refresh'] !== undefined) {
            queryParameters['refresh'] = parameters['refresh'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Queries events of initiative.
     * @method
     * @name initiative#initiative_prototype___get__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - initiative id
     * @param {string} parameters.filter - 
     */
    initiative.prototype.initiative_prototype___get__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates a new instance in events of this model.
     * @method
     * @name initiative#initiative_prototype___create__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - initiative id
     * @param {} parameters.data - 
     */
    initiative.prototype.initiative_prototype___create__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes all events of this model.
     * @method
     * @name initiative#initiative_prototype___delete__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - initiative id
     */
    initiative.prototype.initiative_prototype___delete__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Counts events of initiative.
     * @method
     * @name initiative#initiative_prototype___count__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - initiative id
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.initiative_prototype___count__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/events/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a new instance of the model and persist it into the data source.
     * @method
     * @name initiative#initiative_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.initiative_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#initiative_patchOrCreate
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.initiative_patchOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#initiative_replaceOrCreate__put_initiatives
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.initiative_replaceOrCreate__put_initiatives = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find all instances of the model matched by filter from the data source.
     * @method
     * @name initiative#initiative_find
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.initiative_find = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#initiative_replaceOrCreate__post_initiatives_replaceOrCreate
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.initiative_replaceOrCreate__post_initiatives_replaceOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/replaceOrCreate';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     * @method
     * @name initiative#initiative_upsertWithWhere
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.initiative_upsertWithWhere = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/upsertWithWhere';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name initiative#initiative_exists__get_initiatives__id__exists
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.initiative_exists__get_initiatives__id__exists = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/exists';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name initiative#initiative_exists__head_initiatives__id_
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.initiative_exists__head_initiatives__id_ = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('HEAD', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a model instance by {{id}} from the data source.
     * @method
     * @name initiative#initiative_findById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {string} parameters.filter - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.initiative_findById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#initiative_replaceById__put_initiatives__id_
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.initiative_replaceById__put_initiatives__id_ = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a model instance by {{id}} from the data source.
     * @method
     * @name initiative#initiative_deleteById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.initiative_deleteById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#initiative_prototype_patchAttributes
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - initiative id
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.initiative_prototype_patchAttributes = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#initiative_replaceById__post_initiatives__id__replace
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.initiative_replaceById__post_initiatives__id__replace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/{id}/replace';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find first instance of the model matched by filter from the data source.
     * @method
     * @name initiative#initiative_findOne
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.initiative_findOne = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/findOne';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update instances of the model matched by {{where}} from the data source.
     * @method
     * @name initiative#initiative_updateAll
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.initiative_updateAll = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/update';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Count instances of the model matched by where from the data source.
     * @method
     * @name initiative#initiative_count
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.initiative_count = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a change stream.
     * @method
     * @name initiative#initiative_createChangeStream__post_initiatives_change_stream
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.options - 
     */
    initiative.prototype.initiative_createChangeStream__post_initiatives_change_stream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/change-stream';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            form['options'] = parameters['options'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a change stream.
     * @method
     * @name initiative#initiative_createChangeStream__get_initiatives_change_stream
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.options - 
     */
    initiative.prototype.initiative_createChangeStream__get_initiatives_change_stream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/change-stream';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            queryParameters['options'] = parameters['options'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name initiative#initiative_listInitiatives
     * @param {object} parameters - method options and parameters
     */
    initiative.prototype.initiative_listInitiatives = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/initiatives/list-initiatives';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a related item by id for events.
     * @method
     * @name initiative#event_prototype___findById__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {string} parameters.fk - Foreign key for events
     */
    initiative.prototype.event_prototype___findById__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/events/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a related item by id for events.
     * @method
     * @name initiative#event_prototype___destroyById__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {string} parameters.fk - Foreign key for events
     */
    initiative.prototype.event_prototype___destroyById__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/events/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update a related item by id for events.
     * @method
     * @name initiative#event_prototype___updateById__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {string} parameters.fk - Foreign key for events
     * @param {} parameters.data - 
     */
    initiative.prototype.event_prototype___updateById__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/events/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a related item by id for enrollments.
     * @method
     * @name initiative#event_prototype___findById__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {string} parameters.fk - Foreign key for enrollments
     */
    initiative.prototype.event_prototype___findById__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/enrollments/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a related item by id for enrollments.
     * @method
     * @name initiative#event_prototype___destroyById__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {string} parameters.fk - Foreign key for enrollments
     */
    initiative.prototype.event_prototype___destroyById__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/enrollments/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update a related item by id for enrollments.
     * @method
     * @name initiative#event_prototype___updateById__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {string} parameters.fk - Foreign key for enrollments
     * @param {} parameters.data - 
     */
    initiative.prototype.event_prototype___updateById__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/enrollments/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Fetches belongsTo relation users.
     * @method
     * @name initiative#event_prototype___get__users
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {boolean} parameters.refresh - 
     */
    initiative.prototype.event_prototype___get__users = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/users';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['refresh'] !== undefined) {
            queryParameters['refresh'] = parameters['refresh'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Fetches belongsTo relation createdByUsers.
     * @method
     * @name initiative#event_prototype___get__createdByUsers
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {boolean} parameters.refresh - 
     */
    initiative.prototype.event_prototype___get__createdByUsers = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/createdByUsers';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['refresh'] !== undefined) {
            queryParameters['refresh'] = parameters['refresh'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Queries events of event.
     * @method
     * @name initiative#event_prototype___get__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {string} parameters.filter - 
     */
    initiative.prototype.event_prototype___get__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates a new instance in events of this model.
     * @method
     * @name initiative#event_prototype___create__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {} parameters.data - 
     */
    initiative.prototype.event_prototype___create__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes all events of this model.
     * @method
     * @name initiative#event_prototype___delete__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     */
    initiative.prototype.event_prototype___delete__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Counts events of event.
     * @method
     * @name initiative#event_prototype___count__events
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.event_prototype___count__events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/events/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Queries enrollments of event.
     * @method
     * @name initiative#event_prototype___get__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {string} parameters.filter - 
     */
    initiative.prototype.event_prototype___get__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/enrollments';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates a new instance in enrollments of this model.
     * @method
     * @name initiative#event_prototype___create__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {} parameters.data - 
     */
    initiative.prototype.event_prototype___create__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/enrollments';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes all enrollments of this model.
     * @method
     * @name initiative#event_prototype___delete__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     */
    initiative.prototype.event_prototype___delete__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/enrollments';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Counts enrollments of event.
     * @method
     * @name initiative#event_prototype___count__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.event_prototype___count__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/enrollments/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a new instance of the model and persist it into the data source.
     * @method
     * @name initiative#event_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.event_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#event_patchOrCreate
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.event_patchOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#event_replaceOrCreate__put_events
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.event_replaceOrCreate__put_events = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find all instances of the model matched by filter from the data source.
     * @method
     * @name initiative#event_find
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.event_find = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#event_replaceOrCreate__post_events_replaceOrCreate
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.event_replaceOrCreate__post_events_replaceOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/replaceOrCreate';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     * @method
     * @name initiative#event_upsertWithWhere
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.event_upsertWithWhere = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/upsertWithWhere';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name initiative#event_exists__get_events__id__exists
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.event_exists__get_events__id__exists = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/exists';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name initiative#event_exists__head_events__id_
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.event_exists__head_events__id_ = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('HEAD', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a model instance by {{id}} from the data source.
     * @method
     * @name initiative#event_findById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {string} parameters.filter - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.event_findById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#event_replaceById__put_events__id_
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.event_replaceById__put_events__id_ = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a model instance by {{id}} from the data source.
     * @method
     * @name initiative#event_deleteById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.event_deleteById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#event_prototype_patchAttributes
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - event id
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.event_prototype_patchAttributes = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#event_replaceById__post_events__id__replace
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.event_replaceById__post_events__id__replace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/{id}/replace';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find first instance of the model matched by filter from the data source.
     * @method
     * @name initiative#event_findOne
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.event_findOne = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/findOne';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update instances of the model matched by {{where}} from the data source.
     * @method
     * @name initiative#event_updateAll
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.event_updateAll = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/update';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Count instances of the model matched by where from the data source.
     * @method
     * @name initiative#event_count
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.event_count = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a change stream.
     * @method
     * @name initiative#event_createChangeStream__post_events_change_stream
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.options - 
     */
    initiative.prototype.event_createChangeStream__post_events_change_stream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/change-stream';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            form['options'] = parameters['options'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a change stream.
     * @method
     * @name initiative#event_createChangeStream__get_events_change_stream
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.options - 
     */
    initiative.prototype.event_createChangeStream__get_events_change_stream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/change-stream';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            queryParameters['options'] = parameters['options'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name initiative#event_listEvents
     * @param {object} parameters - method options and parameters
     */
    initiative.prototype.event_listEvents = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/events/list-events';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Fetches belongsTo relation user.
     * @method
     * @name initiative#task_prototype___get__user
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - task id
     * @param {boolean} parameters.refresh - 
     */
    initiative.prototype.task_prototype___get__user = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/{id}/user';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['refresh'] !== undefined) {
            queryParameters['refresh'] = parameters['refresh'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a new instance of the model and persist it into the data source.
     * @method
     * @name initiative#task_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.task_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#task_patchOrCreate
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.task_patchOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#task_replaceOrCreate__put_tasks
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.task_replaceOrCreate__put_tasks = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find all instances of the model matched by filter from the data source.
     * @method
     * @name initiative#task_find
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.task_find = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#task_replaceOrCreate__post_tasks_replaceOrCreate
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.task_replaceOrCreate__post_tasks_replaceOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/replaceOrCreate';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     * @method
     * @name initiative#task_upsertWithWhere
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.task_upsertWithWhere = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/upsertWithWhere';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name initiative#task_exists__get_tasks__id__exists
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.task_exists__get_tasks__id__exists = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/{id}/exists';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name initiative#task_exists__head_tasks__id_
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.task_exists__head_tasks__id_ = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('HEAD', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a model instance by {{id}} from the data source.
     * @method
     * @name initiative#task_findById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {string} parameters.filter - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.task_findById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#task_replaceById__put_tasks__id_
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.task_replaceById__put_tasks__id_ = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a model instance by {{id}} from the data source.
     * @method
     * @name initiative#task_deleteById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.task_deleteById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#task_prototype_patchAttributes
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - task id
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.task_prototype_patchAttributes = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#task_replaceById__post_tasks__id__replace
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.task_replaceById__post_tasks__id__replace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/{id}/replace';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find first instance of the model matched by filter from the data source.
     * @method
     * @name initiative#task_findOne
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.task_findOne = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/findOne';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update instances of the model matched by {{where}} from the data source.
     * @method
     * @name initiative#task_updateAll
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.task_updateAll = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/update';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Count instances of the model matched by where from the data source.
     * @method
     * @name initiative#task_count
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.task_count = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a change stream.
     * @method
     * @name initiative#task_createChangeStream__post_tasks_change_stream
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.options - 
     */
    initiative.prototype.task_createChangeStream__post_tasks_change_stream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/change-stream';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            form['options'] = parameters['options'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a change stream.
     * @method
     * @name initiative#task_createChangeStream__get_tasks_change_stream
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.options - 
     */
    initiative.prototype.task_createChangeStream__get_tasks_change_stream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/change-stream';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            queryParameters['options'] = parameters['options'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name initiative#task_listPendingTasks
     * @param {object} parameters - method options and parameters
     */
    initiative.prototype.task_listPendingTasks = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/tasks/list-pending-tasks';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a related item by id for accessTokens.
     * @method
     * @name initiative#user_prototype___findById__accessTokens
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.fk - Foreign key for accessTokens
     */
    initiative.prototype.user_prototype___findById__accessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/accessTokens/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a related item by id for accessTokens.
     * @method
     * @name initiative#user_prototype___destroyById__accessTokens
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.fk - Foreign key for accessTokens
     */
    initiative.prototype.user_prototype___destroyById__accessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/accessTokens/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update a related item by id for accessTokens.
     * @method
     * @name initiative#user_prototype___updateById__accessTokens
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.fk - Foreign key for accessTokens
     * @param {} parameters.data - 
     */
    initiative.prototype.user_prototype___updateById__accessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/accessTokens/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a related item by id for tasks.
     * @method
     * @name initiative#user_prototype___findById__tasks
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.fk - Foreign key for tasks
     */
    initiative.prototype.user_prototype___findById__tasks = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/tasks/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a related item by id for tasks.
     * @method
     * @name initiative#user_prototype___destroyById__tasks
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.fk - Foreign key for tasks
     */
    initiative.prototype.user_prototype___destroyById__tasks = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/tasks/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update a related item by id for tasks.
     * @method
     * @name initiative#user_prototype___updateById__tasks
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.fk - Foreign key for tasks
     * @param {} parameters.data - 
     */
    initiative.prototype.user_prototype___updateById__tasks = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/tasks/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a related item by id for enrollments.
     * @method
     * @name initiative#user_prototype___findById__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.fk - Foreign key for enrollments
     */
    initiative.prototype.user_prototype___findById__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/enrollments/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a related item by id for enrollments.
     * @method
     * @name initiative#user_prototype___destroyById__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.fk - Foreign key for enrollments
     */
    initiative.prototype.user_prototype___destroyById__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/enrollments/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update a related item by id for enrollments.
     * @method
     * @name initiative#user_prototype___updateById__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.fk - Foreign key for enrollments
     * @param {} parameters.data - 
     */
    initiative.prototype.user_prototype___updateById__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/enrollments/{fk}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{fk}', parameters['fk']);

        if (parameters['fk'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: fk'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Queries accessTokens of user.
     * @method
     * @name initiative#user_prototype___get__accessTokens
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.filter - 
     */
    initiative.prototype.user_prototype___get__accessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/accessTokens';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates a new instance in accessTokens of this model.
     * @method
     * @name initiative#user_prototype___create__accessTokens
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {} parameters.data - 
     */
    initiative.prototype.user_prototype___create__accessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/accessTokens';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes all accessTokens of this model.
     * @method
     * @name initiative#user_prototype___delete__accessTokens
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     */
    initiative.prototype.user_prototype___delete__accessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/accessTokens';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Counts accessTokens of user.
     * @method
     * @name initiative#user_prototype___count__accessTokens
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.user_prototype___count__accessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/accessTokens/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Queries tasks of user.
     * @method
     * @name initiative#user_prototype___get__tasks
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.filter - 
     */
    initiative.prototype.user_prototype___get__tasks = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/tasks';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates a new instance in tasks of this model.
     * @method
     * @name initiative#user_prototype___create__tasks
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {} parameters.data - 
     */
    initiative.prototype.user_prototype___create__tasks = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/tasks';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes all tasks of this model.
     * @method
     * @name initiative#user_prototype___delete__tasks
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     */
    initiative.prototype.user_prototype___delete__tasks = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/tasks';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Counts tasks of user.
     * @method
     * @name initiative#user_prototype___count__tasks
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.user_prototype___count__tasks = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/tasks/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Queries enrollments of user.
     * @method
     * @name initiative#user_prototype___get__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.filter - 
     */
    initiative.prototype.user_prototype___get__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/enrollments';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates a new instance in enrollments of this model.
     * @method
     * @name initiative#user_prototype___create__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {} parameters.data - 
     */
    initiative.prototype.user_prototype___create__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/enrollments';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes all enrollments of this model.
     * @method
     * @name initiative#user_prototype___delete__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     */
    initiative.prototype.user_prototype___delete__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/enrollments';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Counts enrollments of user.
     * @method
     * @name initiative#user_prototype___count__enrollments
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.user_prototype___count__enrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/enrollments/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a new instance of the model and persist it into the data source.
     * @method
     * @name initiative#user_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.user_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#user_patchOrCreate
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.user_patchOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#user_replaceOrCreate__put_users
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.user_replaceOrCreate__put_users = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find all instances of the model matched by filter from the data source.
     * @method
     * @name initiative#user_find
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.user_find = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name initiative#user_replaceOrCreate__post_users_replaceOrCreate
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.user_replaceOrCreate__post_users_replaceOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/replaceOrCreate';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     * @method
     * @name initiative#user_upsertWithWhere
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.user_upsertWithWhere = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/upsertWithWhere';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name initiative#user_exists__get_users__id__exists
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.user_exists__get_users__id__exists = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/exists';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name initiative#user_exists__head_users__id_
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.user_exists__head_users__id_ = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('HEAD', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find a model instance by {{id}} from the data source.
     * @method
     * @name initiative#user_findById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {string} parameters.filter - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.user_findById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#user_replaceById__put_users__id_
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.user_replaceById__put_users__id_ = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a model instance by {{id}} from the data source.
     * @method
     * @name initiative#user_deleteById
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     */
    initiative.prototype.user_deleteById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#user_prototype_patchAttributes
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.user_prototype_patchAttributes = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name initiative#user_replaceById__post_users__id__replace
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - Model id
     * @param {} parameters.data - Model instance data
     */
    initiative.prototype.user_replaceById__post_users__id__replace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/replace';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Find first instance of the model matched by filter from the data source.
     * @method
     * @name initiative#user_findOne
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
     */
    initiative.prototype.user_findOne = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/findOne';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update instances of the model matched by {{where}} from the data source.
     * @method
     * @name initiative#user_updateAll
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     * @param {} parameters.data - An object of model property name/value pairs
     */
    initiative.prototype.user_updateAll = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/update';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Count instances of the model matched by where from the data source.
     * @method
     * @name initiative#user_count
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.where - Criteria to match model instances
     */
    initiative.prototype.user_count = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/count';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a change stream.
     * @method
     * @name initiative#user_createChangeStream__post_users_change_stream
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.options - 
     */
    initiative.prototype.user_createChangeStream__post_users_change_stream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/change-stream';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            form['options'] = parameters['options'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a change stream.
     * @method
     * @name initiative#user_createChangeStream__get_users_change_stream
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.options - 
     */
    initiative.prototype.user_createChangeStream__get_users_change_stream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/change-stream';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            queryParameters['options'] = parameters['options'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Login a user with username/email and password.
     * @method
     * @name initiative#user_login
     * @param {object} parameters - method options and parameters
     * @param {} parameters.credentials - 
     * @param {string} parameters.include - Related objects to include in the response. See the description of return value for more details.
     */
    initiative.prototype.user_login = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/login';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['credentials'] !== undefined) {
            body = parameters['credentials'];
        }

        if (parameters['credentials'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: credentials'));
            return deferred.promise;
        }

        if (parameters['include'] !== undefined) {
            queryParameters['include'] = parameters['include'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Logout a user with access token.
     * @method
     * @name initiative#user_logout
     * @param {object} parameters - method options and parameters
     */
    initiative.prototype.user_logout = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/logout';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Trigger user's identity verification with configured verifyOptions
     * @method
     * @name initiative#user_prototype_verify
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - user id
     */
    initiative.prototype.user_prototype_verify = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/{id}/verify';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Confirm a user registration with identity verification token.
     * @method
     * @name initiative#user_confirm
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.uid - 
     * @param {string} parameters.token - 
     * @param {string} parameters.redirect - 
     */
    initiative.prototype.user_confirm = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/confirm';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['uid'] !== undefined) {
            queryParameters['uid'] = parameters['uid'];
        }

        if (parameters['uid'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: uid'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: token'));
            return deferred.promise;
        }

        if (parameters['redirect'] !== undefined) {
            queryParameters['redirect'] = parameters['redirect'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Reset password for a user with email.
     * @method
     * @name initiative#user_resetPassword
     * @param {object} parameters - method options and parameters
     * @param {} parameters.options - 
     */
    initiative.prototype.user_resetPassword = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/reset';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['options'] !== undefined) {
            body = parameters['options'];
        }

        if (parameters['options'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: options'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Change a user's password.
     * @method
     * @name initiative#user_changePassword
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.oldPassword - 
     * @param {string} parameters.newPassword - 
     */
    initiative.prototype.user_changePassword = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/change-password';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['oldPassword'] !== undefined) {
            form['oldPassword'] = parameters['oldPassword'];
        }

        if (parameters['oldPassword'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: oldPassword'));
            return deferred.promise;
        }

        if (parameters['newPassword'] !== undefined) {
            form['newPassword'] = parameters['newPassword'];
        }

        if (parameters['newPassword'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: newPassword'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Reset user's password via a password-reset token.
     * @method
     * @name initiative#user_setPassword
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.newPassword - 
     */
    initiative.prototype.user_setPassword = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/reset-password';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['newPassword'] !== undefined) {
            form['newPassword'] = parameters['newPassword'];
        }

        if (parameters['newPassword'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: newPassword'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name initiative#user_listTasks
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - 
     */
    initiative.prototype.user_listTasks = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/list-tasks';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['userId'] !== undefined) {
            queryParameters['userId'] = parameters['userId'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name initiative#user_listEnrollments
     * @param {object} parameters - method options and parameters
     * @param {number} parameters.userId - 
     */
    initiative.prototype.user_listEnrollments = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/users/list-enrollments';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/json, application/xml, text/xml, application/javascript, text/javascript'];
        headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

        if (parameters['userId'] !== undefined) {
            queryParameters['userId'] = parameters['userId'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };

    return initiative;
})();

exports.initiative = initiative;