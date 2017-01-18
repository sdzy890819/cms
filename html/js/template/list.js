define(['require',"app",'jquery'
	,'../data/getData' , './addForm'
	,'../moduls/Tool','../common/editPop' , './relationPop'
	,'../upload/index'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , getData , list , Tool , editPop,relationPop , upload ) {
	app.directive('templateList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList , Upload){
	        	$scope.title = "模版列表";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				
				/*$scope.navEdit = { //导航操作按钮
					nav : [{
						name : '下载模版',
						event : function(obj , scope , evt){
							scope.getOneSelect($scope.down);
						},
						cls : 'down'
					}],
					list : [
						{
							name : '模版关联',
							event : function(obj , scope , evt){
								scope.getOneSelect($scope.relation);
							},
							cls : 'plus'
						},
						{
							name : '删除',
							event : function(obj , scope , evt){
								scope.getOneSelect($scope.del);
							},
							cls : 'del'
						}
					]
				}*/
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
						function updateData(callback){ //填充数据
							getData.template.templateInfo({
								id : obj.id,
								callback : function(_data){
									//_data.data.releaseTime = new Date(_data.data.releaseTime).format('yyyy-MM-dd h:m:s');
									callback(_data);
								}
							})
						}										

        				editPop.init({
        					obj : obj,
        					list : list,
        					updateData : updateData,
        					save : function(obj , _detail ){ //保存 新增 确认 等
								var templateClassify  , channelId;
								$.each(obj.selects,function(){
									if(this.title == 'templateClassify'){
										templateClassify = this.type;
									}
									if(this.title == 'channelId'){
										channelId = this.type;
									}
								});
								getData.template.updateTemplate({
									id : _detail.id,
									"templateName":obj.templateName,
									"templateDesc":obj.templateDesc,
									"filename":obj.filename,
									"path":obj.path,
									"templateClassify":templateClassify,
									"job":(obj.job=='触发生成'?1:0), //是否定时生成。1是定时生成。0是触发生成
									"encoded":obj.encoded,
									"channelId":channelId,//频道ID
									"sortNum":obj.sortNum,//排序值
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
								callback(list);
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
	 						 text:'您确定要删除"'+obj.templateName+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.template.delTemplate(obj);
							}
	 					})
					},
					down : function( obj ){ // 下载
						getData.template.downTemplate({
							id : obj.id,
							callback : function(){

							}
						})
					},
					upload : function( obj ){
						upload.init({
        					obj : obj,
        					data : {
	        					title : '上传文件',
	        					name : '请选择文件',
	        					type : 'file',
	        					event : function(file , $uibModalInstance){
	        						Upload.base64DataUrl(file).then(function(urls){	 
	        							urls = urls.split(',')[1];  //不要BASE64 CODE 的前缀
	        							getData.template.uploadTemplate({
	        								baseCode : urls,
	        								id : obj.id,
	        								callback : function(_data){
	        									layui.use(['layer'], function(){
													var layer = layui.layer;
													layer.msg(_data.message);
												});
												setTimeout(function(){
													$uibModalInstance.dismiss('cancel');
												},400)
	        								}
	        							})
	        						});
	        					}
        					},
        					$uibModal :$uibModal
        				});
					},
					relation : function( obj ){ //关联
						relationPop.init({
        					obj : obj,
        					callback : function( list , callback ){ //返回获取的数据 用于操作
								callback(list);
        					},
        					$uibModal :$uibModal 
        				});
					}
				});
				getData.template.listTemplate({
					callback : function(_data){
						$.each(_data.data.list,function( i , obj){ //时间格示化
							obj.releaseTime = new Date(obj.releaseTime).format('yyyy-MM-dd h:m:s');
							if(obj.publish==1){//需要加链接 把topicUrl值 复制到 href 生成新的 href
								Tool.changeObjectName(_data.data.list,[{name:'topicUrl',newName:'href'}])
							}
						});
						var th = [
							{name:'模版名称' , key:'templateName', width : '200'},
							//{name:'模版说明' , key:'templateDesc' },
							//{name:'文件名',width:'90' , key:'filename'},
							//{name:'发布目录',width:'100' , key:'path'},
							{name:'模版分类', key:'templateClassifyStr'},
							{name:'编码',width:'80',class:'center' , key:'encoded'},
							//{name:'排序值', width:'90',class:'center' , key:'sortNum'},
							{name:'操作' , width : '350',class:'center'}
						];
						$scope.listdata = { //确认按钮
							title : $scope.title,
							table : {
								select : true,
								th : th,
								td : GenerateArrList.setArr(_data.data.list,th) ,
								edit : [
									{cls : 'down', name : '下载',evt:$scope.down},
									{cls : 'upload', name : '上传',evt:$scope.upload}, //'exe|dmg'
									{cls : 'add', name : '关联',evt:$scope.relation},
									{cls : 'edit' , name : '编辑',evt:$scope.edit},
									{cls : 'del' , name : '删除',evt:$scope.del}
								]
							}
						}
						GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
			        	GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
			        	$.each($scope.listdata.table.td,function( i , item ){
			        		if(item.job==1){//1是定时生成。0是触发生成
			        			var arr = [];
			        			$.each(item.list.edit,function( j , obj ){
			        				if(obj.name!='关联'){
			        					arr.push(obj);
			        				}
			        			});
			        			item.list.edit = arr;
			        		}
			        	});
			        	$scope.$apply();
			        }
				});
				
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
