define(function (require, exports, module) {
	exports.init = function( obj ){
		require('../plug/jquery-1.9.1.min');
		var $ = jQuery;
			create = require('./createElement'),
			config = {
				app : obj.app , 
				name : 'headerNav' , 
				templateUrl : '../template/header.html'
			}
		$.extend(config,obj);
		create.init( config );
	}
});