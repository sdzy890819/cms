define(["app",'require','./data/getInitInfo'], function ( app , require , dataInfo ) {
	app.directive('headerNav',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/header.html',
	        controller : function($scope){
	        	angular.extend($scope,{
	        		loginOut : function(){
	        			dataInfo.loginOut();
	        		}
	        	})
	        },
			link : function($scope , element ){
				var ele = $(element[0])
					,list = ele.find('.dropdown-menu')
					,timer = 0;
				ele.find('.myInfo').mouseenter(function(){
					list.show();
					setTimeout(function(){
						list.addClass('cur')
					},20);
					clearTimeout(timer)
				})
				.mouseleave(function(){
					list.removeClass('cur');
					timer = setTimeout(function(){
						list.hide();
					},520);
				})
			}
	    };
	});
});
