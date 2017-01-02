define(["app",'form','position','fixedNav','../moduls/service'], function ( app , list ) {
	app.directive('userRandomPassword',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope,pop){
	        	$scope.title = '用户密码随机生成'
	        	$scope.$parent.menu.push({name:$scope.title});
	        	function randomAlphanumeric(charsLength,chars) { 
				    var length = charsLength; 
				    if (!chars) 
				        var chars = "~!@#$%^&*()_+abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789"; 
				 
				    var randomChars = ""; 
				 
				    for(x=0; x<length; x++) { 
				        var i = Math.floor(Math.random() * chars.length); 
				        randomChars += chars.charAt(i); 
				    }
				    return randomChars; 
				} 
	        	angular.extend($scope,{
					save : function( arr ){ //保存
						alert(arr)
					},
					cancel : function( arr ){ //取消
						alert(arr)
					},
					rendomPwd : function( obj , target ){//生成密码
						var pwd = randomAlphanumeric(9)
						var input = $(target).parent().parent().prev().find('input');
						input.val(pwd);
						pop.alert({
							title : '生成密码成功'
							,text:'请记住您的密码：'+pwd
							,btn : ['确定']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					},
					edit : { //导航操作按钮
						list : [
							{
								name:'保存',
								evt : $scope.save,
								cls : 'add'
							}
						]
					}
				});
				$scope.formdata = { //确认按钮
					title : $scope.title,
					list : [
						[
							{
								title : 'title',
								name : '用户密码',
								type : 'password' //text textarea radio checkbox edit
							},
							{
								title : 'button',
								name : '生成密码',
								type : 'button',
								evt : $scope.rendomPwd
							}
						]
					],
					submit : [
						{
							name : '保存',
							evt : 'save',
							icon_cls : 'save'
						},
						{
							name:'取消',
							evt : 'cancel',
							icon_cls : 'cancel',
							cls : 'cancel'
						}
					]
				}
	        }
	    };
	});
});