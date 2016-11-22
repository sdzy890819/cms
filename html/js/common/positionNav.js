define(function (require, exports, module) {
	exports.init = function( obj ){
		var $ = jQuery,
			create = require('./createElement'),
			config = {
				app : obj.app , 
				name : 'positionNav' , 
				templateUrl : '../template/common/positionNav.html',
				scope : {
		            edit : '=edit'
		        },
				controller : function($scope , $state){
					
				},
				link : function(){
				}
			}
		$.extend(config,obj);
		create.init( config );
	}
});