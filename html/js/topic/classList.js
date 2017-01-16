define(['require',"app",'jquery'
	,'../data/getData' , './classForm'
	,'../common/editPop'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , getData , list ,editPop ) {
	app.directive('topicClassList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$scope.title = "专题分类列表";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				angular.extend($scope,{
					edit : function( obj ){ //保存 obj为原始数据
						function updateData(callback){ //填充数据
							GenerateArrList.changeTypeName([obj],[{name:'classifyName',newName:'name'}])
							callback({data:obj})
							/*getData.topic.topicInfo({
								id : obj.id,
								callback : function(_data){
									_data.data.writeTime = new Date(_data.data.writeTime).format('yyyy-MM-dd h:m:s');
									callback(_data);
								}
							})*/
						}										

        				editPop.init({
        					obj : obj,
        					list : list,
        					updateData : updateData,
        					save : function(_obj , _detail ){ //保存 新增 确认 等 _obj为修改后的数据 _detail等于updateData 
								getData.topic.updateTopicClassify({
									id : obj.id,
									name : _obj.name,
									callback : function(_data){
										layui.use(['layer'], function(){
											var layer = layui.layer;
											layer.msg(_data.message);
											setTimeout(function(){
												location.reload();
											},300)
										});
									}
								});
        					},
        					callback : function( list , callback ){ //返回获取的数据 用于操作
								callback(list); //不需要处理
        					},
        					$uibModal :$uibModal 
        				});
					},
					del : function( obj ){ //删除
						obj.callback = function(_data){//删除成功
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
								setTimeout(function(){
									location.reload();
								},300)
							});
						};
						pop.alert({
	 						 text:'您确定要删除"'+obj.columnName+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.topic.delTopicClassify(obj);
							}
	 					})
					}
				});
				getData.topic.topicClassifyList({
					callback : function(_data){
						var th = [
							{name:'专题分类名称' , key:'classifyName'},
							{name:'操作' , width : '120', class:'center'}
						];
						$scope.listdata = { //确认按钮
							title : $scope.title,
							table : {
								select : true,
								th : th,
								td : GenerateArrList.setArr(_data.data,th) ,
								edit : [
									{cls : 'edit' , name : '编辑',evt:$scope.edit},
									{cls : 'del' , name : '删除',evt:$scope.del}
								]
							}
						}
						// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
		        		GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
		        		$scope.$apply();
		        	}
				});
				
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
