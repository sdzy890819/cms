define(function (require, exports, module) {
	exports.init = function( obj ){
		var $ = jQuery,
			create = require('./createElement'),
			config = {
				app : obj.app , 
				name : 'position' , 
				templateUrl : '../template/position.html',
				scope : {
		            menu : '=menu'
		        },
				controller : function($scope , $state){
					$scope.position = {
						name : '首页' , 
						link : 'home'
					}
				},
				link : function(){
				}
			}
		$.extend(config,obj);
		create.init( config );
	}
});