define(function (require, exports, module) {
	require('../plug/jquery-1.9.1.min');
	var $ = jQuery,
	obj = {
		init : function( config ){
			obj.config = {
				app : null,
				name : 'elementName',
				restrict : 'E',
		    	replace : true,//我们希望使用template完整地替换原始的DOM对象，而不是填充其内容，replace 属性负责这件事。
		    	transclude : true, //允许指令包含其他HTML元素，这通常用于实现一个容器类型的Widget。
		        templateUrl : null,
		        scope : null,
		        controller : function(){},
		        link : function(){}
			}
			$.extend(obj.config , config );
			obj.create();
		},
		create : function(){
			var config = obj.config;
			if(!config.app) return;
			config.app.directive(config.name,function(){
				return {
			    	restrict : config.restrict,
			    	replace : config.replace,
			    	transclude : config.transclude,
			        templateUrl : config.templateUrl,
			        controller : config.controller,
			        scope : config.scope,
			        link : config.link
			    };
			});
		}
	}
	return obj;
});