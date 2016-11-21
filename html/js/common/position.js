define(function (require, exports, module) {
	exports.init = function( obj ){
		var $ = jQuery,
			create = require('./createElement'),
			config = {
				app : obj.app , 
				name : 'position' , 
				templateUrl : '../template/position.html',
				controller : function($rootScope){
					//console.dir($rootScope)
				},
				link : function(){
				}
			}
		$.extend(config,obj);
		create.init( config );
	}
});