define(function (require, exports, module) {
	exports.init = function( obj ){
		var $ = jQuery,
			create = require('./createElement'),
			config = {
				app : obj.app , 
				name : 'headerNav' , 
				templateUrl : '../template/common/header.html'
			}
		$.extend(config,obj);
		create.init( config );
	}
});