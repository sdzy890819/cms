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

	        	function getHeight(){
	        		clearTimeout(time);
	        		var height = angular.element(window).height()-angular.element('#Header').height();
	        		time = setTimeout(function(){
	        			if(element.height()<height){
	        				element.height(height)
	        			}else{
	        				element.height(element.height())
	        			}
	        		}, 300);
	        	}
	        	window.onresize = getHeight;
	        	getHeight();
	        	function clearMenu(){
	        		submenu.parent().removeClass('open')
	        			.find('.arrow').removeClass('cur');
	        	}
	        	submenu.each(function( i , ele ){
	        		ng(ele).click(function(){
	        			clearMenu();
	        			if(this.parentclas){
	        				this.parentclas = false;
	        				ng(this).parent().removeClass('open')
			        			.find('.arrow').removeClass('cur');
	        			}else{
	        				this.parentclas=true;
			        		ng(this).parent().addClass('open')
			        			.find('.arrow').addClass('cur');
	        			}


		        	});
	        	});

	        	var tabNav = element.find('.webapp-tab li') , 
	        		option = element.find('.option');
	        	tabNav.each(function( i , ele ){
	        		ng(ele).click(function(){
	        			tabNav.removeClass('current')
	        				.eq(i).addClass('current')
	        			option.hide();
	        			option.eq(i).show();
	        		})
	        	})
	        }
	    };
	});
})();