define(["app",'./addForm','../data/getData','../moduls/Tool','form','position','fixedNav'], function ( app , getList , getData , Tool ) {
	app.directive('newsAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
	        	$scope.$parent.menu.push({name:"新增新闻"})
				$scope.save = function( obj ){ //保存
					alert(obj)
				}
				$scope.rlease = function( obj ){ //发布
					alert(obj)
				}
				$scope.view = function( obj ){ //预览
					alert(obj)
				}
				$scope.cancel = function( obj ){ //取消
					alert(obj)
				}
				
				$scope.edit = { //导航操作按钮
					nav : [{
						name : '保存',
						evt : $scope.save,
						cls : 'save'
					}],
					list : [
						{
							name:'发布',
							evt : $scope.rlease,
							cls : 'add'
						}
					]
				}

				getList(function(list){
					$.each(list,function( i , obj){
						if(obj.title == 'content'){
							obj.width = '800px';
						}
						if(obj.type=='select'){
							obj.callback = function( _obj , callback ){
								$.each(obj.select,function(j,arr){
									if(arr[0].title==_obj.elem.name){//请选择部门
										var id = arr[_obj.elem.selectedIndex].id || null;
										if(_obj.elem.name == 'categoryId'){
											getData.channel.currentChannelList({
												categoryId : id,
												callback : function(_data){
													var arr = [obj.select[1][0]];
													obj.select[1] = arr;
													//obj.select[1] = obj.select[1].concat({name:'hasdfsadf',id:10001});
													var _data = {
														data : [{
														      "categoryId": 10001,
														      "channelDesc": "世界频道，带你看世界",
														      "channelName": "世界频道",
														      "channelPath": "/data/publish/",
														      "channelUrl": "http://120.77.220.11/publish/",
														      "delTag": 1,
														      "id": 10001,
														      "lastModifyUserId": "14840345528522311094",
														      "templatePath": "/data/template/"
														    }]											
														}
													obj.select[1] = obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:'channelName',newName:'name'}]));
													//$(_obj.elem).parent().next().find()
													
													$scope.$apply();
													callback();
												}
											})
										}else if(_obj.elem.name == 'channelId'){
											getData.news.newscolumnlist({
												channelId : id,
												callback : function(_data){
													var arr = [obj.select[2][0]];
													obj.select[2] = arr;
													obj.select[2] = obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:'columnName',newName:'name'}]));
													$scope.$apply();
													callback();
												}
											})
										}
									} 
								})
							}
						}
					});
					//debugger;
					$scope.formdata = { //确认按钮
						title : '新增新闻',
						list : list,
						submit : [
							/*{
								name : '保存',
								evt : 'save',
								icon_cls : 'save'
							},
							{
								name:'预览',
								evt : 'view',
								icon_cls : 'view'
							},*/
							{
								name:'确认发布',
								evt : 'rlease',
								icon_cls : 'ok'
							},
							{
								name:'取消',
								evt : 'cancel',
								icon_cls : 'cancel',
								cls : 'cancel'
							}
						]
					}
					$scope.$apply();
				})
	        }

	    };
	});
});