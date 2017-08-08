define(['require',"app",'jquery','search','./recommendlistForm'
	,'../common/editPop','../data/getData','../moduls/Tool','../upload/index'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , search , searchForm  , editPop ,getData , Tool,upload  ) {
	app.directive('newsRecommendList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope,pop,$uibModal , $css , GenerateArrList, $state,Upload){
				$scope.title = "推荐新闻列表";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				angular.extend($scope,{
					isSearch : false, //是否是执行搜索
					getNewList : function(){
						if($scope.isSearch){
							$scope.getSearchList();
						}else{
							getDataList();
						}
					},
					edit : function( obj ){ //保存
						require(['./recommendListEditForm'], function(list){
							var newsId = obj.id;
							function getAddForm(callback , editPopScope){
								getData.news.recommendNewsInfo({
									id : obj.id,
									callback : function(_data){	
										_data.data.position = obj.paixue;
										callback(_data);
										$('.layui-upload-button').unbind().click(function(){
											upload.init({
					        					data : {
					        						obj : {},
						        					title : '上传图片',
						        					name : '请选择图片',
						        					type : 'image',
						        					event : function(file , $uibModalInstance){	        						
						        						imageInfo = file;
						        						var suffix = imageInfo.name.match(/\w+$/)[0];
														Upload.base64DataUrl(imageInfo).then(function(urls){	        						   						
								        					var image = "<img src='" + file.$ngfDataUrl + "'width='50px' class='thumb'>";        						
								        						// $('.layui-upload-button').empty().append(image);												
								        					$('.imagePre').empty().append(image);
															if( urls  ){
																getData.upload.uploadImage({
																	"baseCode":urls.split(',')[1],
																	"suffix":suffix,//"文件后缀png|jpg"
																	"watermark":0, //是否水印

																	callback : function(_data) {
																		var data = _data.data;
																		$scope.imgInfo = data;
																		editPopScope.updateData({
																			recommendImages : data.imageUrl
																		})
																	}
																})
															}
														})
						        						
						        						$uibModalInstance.dismiss('cancel');
						        					}
					        					},
					        					$uibModal :$uibModal
					        				});
										});		
										
									}
								})
							}
							editPop.init({
								obj : obj,
								$uibModal : $uibModal,
								list : list,
								updateData : getAddForm,

								save : function(obj , _detail){		

									var recommendColumnId = _detail.recommendColumnId;									
									$.each(obj.selects,function(){										
										if(this.title == 'recommendColumnId'){
											recommendColumnId = this.id;
										}										
									})

									if(recommendColumnId == undefined) {											
										alert('请选择推荐栏目');
										return;
									}					
									var imgsrc = $scope.imgInfo?$scope.imgInfo.imageUrl:'';		
									
									getData.news.recommend({
										id : newsId,
										recommendTitle : obj.recommendTitle,
										recommendDescription : obj.recommendDescription,
										recommendImages : imgsrc,
										recommendColumnId : recommendColumnId,
										position : obj.position,
										sort : obj.sort,

										callback : function(_data){
											layui.use(['layer'], function(){
												var layer = layui.layer;
												layer.msg(_data.message);
												if(_data.code == 0) {									
													$scope.getNewList();
												}
												// setTimeout(function(){
												// 	location.reload();
												// },300);
											});											
										}
									})						
								},

								callback : function(list, callback){
									callback(list)
								}

							})
						})
					},
					del : function( obj ){ //取消
						obj.callback = function(_data){//删除成功
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
																								
								if(_data.code == 0) {									
									$scope.getNewList();
								}

							});
						};
						pop.alert({
	 						 text:'您确定要取消推荐吗"'+obj.title+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.news.deleteRecommend(obj);
							}
	 					})
					}
				});
				/*$scope.navEdit = { //导航操作按钮
					//nav : [selectAll],
					list : [
						{
							name : '批量删除',
							event : function(id , scope , evt){
								scope.delAll(function( ids ){
									console.log(ids)
								});
							},
							cls :'red',
							icon_cls : 'remove'
						}
					]
				}*/

				function setList(_data){
					var th = [	
						{name:'推荐名' , key:'title'},					
						{name:'排序' , key:'paixue'},					
						{name:'推荐人' , key:'recommendUserName'},								
						{name:'推荐栏目' , key:'recommendColumnName'},
						{name:'操作' , width : '220' , class: 'center'}
					];
					var list = _data.data.list;
					$.each(list,function( i , obj ){ //增加排序
						obj.paixue = (i+1)*page;
					});
					var td = GenerateArrList.setArr(list, th);

					$scope.listdata = { //确认按钮
						title : $scope.title + "（共" + _data.data.page.count + "条数据）",
						table : {
							select : true,
							th : th,									
							td : td,
							edit : [																
								{cls : 'edit' , name : '修改推荐',evt:$scope.edit},
								{cls : 'del' , name : '取消推荐',evt:$scope.del},
							]

						},
						/*submit : [
							selectAll,
							{
								name : '批量删除',
								evt : function(id , scope , evt){
									scope.delAll(function( ids ){
										console.log(ids)
									});
								},
								cls :'red',
								icon_cls : 'remove'
							}
						]*/
					}
					$.each($scope.listdata.table.td, function(i, obj){
						if (obj.url) {
							obj.list[0].href = obj.url;
						}
					})

					GenerateArrList.extendType($scope.listdata.table.td,th,['width','name','key']); //把TH 中的出name,key,width属性以外的属性合传给td							
      				GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');			   		        		
      				$scope.$apply();						
				}

				//搜索
				function search(){
					searchForm(function(data){
						$scope.searchform = {
							list : data,
							return : function(){ //返回列表
								$scope.searchform.search = null;
								page = 1;
								searchPage = 1;
								$scope.$$childHead.current = 1;
								getDataList();
							},							
							submit : function( obj , data ){
								$scope.isSearch = true;
								var page = 1 , recommendColumnId;
                                $.each(obj.selects,function(){
                                    if(this.title == 'recommendColumnId'){
                                        recommendColumnId = this.id;
                                    }
                                });
								function getSearchList(){
									getData.news.recommendList({
										recommendColumnId : recommendColumnId,
										page : page,
										pageSize : 20,
										callback : function(_data){
											_data.data.list = _data.data.list || [];
											//分页
											$scope.page = _data.data.page;
											$scope.page.jump = function( obj ){
												if(page != obj.curr){
													page = obj.curr;
													getSearchList();
												}
											}
											$scope.searchform.search = {
												count : _data.data.page.count , 
												name : obj.condition
											}
											setList(_data);
										}
									})
								};
								getSearchList();
								$scope.getSearchList = getSearchList;
							}
						}
					},{st:"sortByColumnName"});
				}
				search();
				//end 搜索

				var page = 1;

				function getDataList(){
					$scope.isSearch = false;
					getData.news.recommendList({
						page : page,
						pageSize : 20,
						callback : function(_data){
							//分页
							$scope.page = _data.data.page;
							$scope.page.jump = function( obj ){
								if(page != obj.curr){
									page = obj.curr;
									getDataList();
								}
							}
							setList(_data);	
		        		
						}
					});
				};
				getDataList();
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
