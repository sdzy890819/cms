(function(){
	var ngbody = angular.module("ngbody", []);
	ngbody.directive("main", function() {
	    return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/main.html',
	        controller : function(){

	        }
	    };
	});
	ngbody.directive("headerNav", function() {
	    return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/header.html',
	        controller : function(){

	        },
	        link : function(scope,element){
	        	var b;
	        }
	    };
	});
	ngbody.directive("menuNav", function() {
	    return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/menu.html',
	        controller:function(){
	        	
	        },
	        scope : function(){
	        	title : '=data'
	        },
	        link : function(scope,element){
	        	var time = 0 , 
	        		ng = angular.element,
	        		submenu = element.find('.option li>a') ;
	        	window.onresize = function(){
	        		clearTimeout(time);
	        		var height = angular.element(window).height()-angular.element('#Header').height();
	        		time = setTimeout(function(){
	        			if(element.height()<height){
	        				element.height(height)
	        			}
	        		}, 300);
	        	}
	        	submenu.each(function( i , ele ){
	        		ng(ele).click(function(){
		        		ng(this).parent().addClass('open')
		        			.find('.arrow').addClass('cur');
		        	});
	        	})
	        }
	    };
	});
})();