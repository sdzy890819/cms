define(["app",'require','./data/getInitInfo', './data/getData'], function ( app , require , dataInfo, data ) {
	app.directive('headerNav',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/header.html',
	        controller : function($scope, $uibModal){

						data.user.currentUser({
							callback : function(_data){
								$scope.currentUser =_data;								
								console.log($scope.currentUser);
							}
						})	 	        	
	        	
	        	angular.extend($scope,{
	        		loginOut : function(){
	        			dataInfo.loginOut();
	        		},

	        		editUser : function(obj){
        				
        				require([ './user/editUser', './user/addForm'], function(pop, list){
	        					        				
	        				function getAddForm(callback){
       							callback($scope.currentUser);
	        				}

	        				pop.init({	  
	        					obj : obj,      					
	        					list       : list,
	        					$uibModal  : $uibModal,
	        					updateData : getAddForm,

	        					callback : function(list, callback){
	        						var newlist = [];
	        						$.each(list, function(i, obj){
	        							if (obj.title != 'userName'){
	        								newlist.push(obj);
	        							}
	        						})
	        						callback(newlist);
	        					}
	        				})  
        				})

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
