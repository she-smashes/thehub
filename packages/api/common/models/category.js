'use strict';

module.exports = function(Category) {
	Category.disableRemoteMethodByName("replaceOrCreate");
	Category.disableRemoteMethodByName("patchOrCreate");
	Category.disableRemoteMethodByName("destroyById");
    Category.disableRemoteMethodByName("count");
    Category.disableRemoteMethodByName("exists");
	Category.disableRemoteMethodByName("replaceById");
	Category.disableRemoteMethodByName("prototype.patchAttributes");
	Category.disableRemoteMethodByName("createChangeStream");
	Category.disableRemoteMethodByName("replaceOrCreate");
	Category.disableRemoteMethodByName("replaceById");
    Category.disableRemoteMethodByName("upsertWithWhere");
    Category.disableRemoteMethodByName("updateAll");
    Category.disableRemoteMethodByName("create");  
   	Category.disableRemoteMethodByName('prototype.__count__initiatives');
	Category.disableRemoteMethodByName('prototype.__create__initiatives');
	Category.disableRemoteMethodByName('prototype.__delete__initiatives');
	Category.disableRemoteMethodByName('prototype.__destroyById__initiatives');
	Category.disableRemoteMethodByName('prototype.__findById__initiatives');
	Category.disableRemoteMethodByName('prototype.__get__initiatives');
	Category.disableRemoteMethodByName('prototype.__updateById__initiatives');    
};
