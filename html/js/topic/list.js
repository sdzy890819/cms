define(['require',"app",'jquery'
	,'../data/getData' , './addForm',
	,'../common/editPop'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , getData , list , editPop ) {
	app.directive('topicList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$scope.title = "专题列表";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				angular.extend($scope,{
					add : function( id ){ //保存
						pop.alert({
							 text:'你的ID为：'+id
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					},
					edit : function( obj ){ //保存
						function getAddForm(callback){ //填充数据
							getData.topic.topicInfo({
								id : obj.id,
								callback : function(_data){
									_data.data.writeTime = new Date(_data.data.writeTime).format('yyyy-MM-dd h:m:s');
									callback(_data);
								}
							})
						}										

        				editPop.init({
        					obj : obj,
        					list : list,
        					updateData : getAddForm,
        					save : function(obj , _detail ){ //保存 新增 确认 等
        						var channelId = _detail.channelId , 
        							columnId = _detail.columnId , 
        							categoryId = _detail.categoryId;
								$.each(obj.selects,function(){
									if(this.title == 'channelId'){
										channelId = this.id;
									}
									if(this.title == 'columnId'){
										columnId = this.id;
									}
									if(this.title == 'categoryId'){
										categoryId = this.id;
									}
								})
								getData.news.updateNews({
									"id":_detail.id,
									"title":obj.title,
									"subTitle":obj.subTitle,
									"keyword":obj.keyword,
									"description":obj.description,
									"source":obj.source,
									"author":obj.author,
									"channelId":channelId,//频道ID
									"columnId":columnId,//栏目ID
									"categoryId": categoryId, //部门分类ID
									"content":obj.html,
									"autoPublish":(obj.show=='yes'?1:0), //1 是自动发布。0是不自动发布.默认不自动发布
									"timer":obj.writeTime, //定时发布。//可不传
									"field1":obj.field1,
									"field2":obj.field2,
									"field3":obj.field3,
									"field4":obj.field4,
									"field5":obj.field5,
									callback : function(_data){
										layui.use(['layer'], function(){
											var layer = layui.layer;
											layer.msg(_data.message);
										});
									}
								});
        					},
        					callback : function( list , callback ){ //返回获取的数据 用于操作
								
        					},
        					$uibModal :$uibModal 
        				});
					},
					del : function( id ){ //删除
						pop.alert({
							 text:'你的ID为：'+id
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					}
				});
				getData.topic.listTopic(function(_data){
					$.each(_data.data.list,function( i , obj){ //时间格示化
						obj.releaseTime = new Date(obj.releaseTime).format('yyyy-MM-dd h:m:s');
					});
					var th = [
						{name:'专题标题' , key:'topicTitle' , width : '200'},
						//{name:'专题内容' , key:'topicContent' },
						{name:'专题相对路径' , key:'topicPath' },
						{name:'专题文件名' , key:'topicFilename' },
						{name:'发布时间' , key:'releaseTime' },
						//{name:'关键字' , key:'keyword' },
						//{name:'描述、SEO标准' , key:'description' },
						{name:'URL' , key:'topicUrl' },
						{name:'操作' , width : '120', class:'center'}
					];
					$scope.listdata = { //确认按钮
						title : $scope.title,
						table : {
							select : true,
							th : th,
							td : GenerateArrList.setArr(_data.data.list,th) ,
							edit : [
								{cls : 'edit' , name : '编辑',evt:$scope.edit},
								{cls : 'del' , name : '删除',evt:$scope.del}
							]
						}
					}
					
					// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
	        		GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
	        		$scope.$apply();
				});
				
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
