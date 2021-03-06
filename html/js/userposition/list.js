define(['require',"app",'jquery'
	,'../data/getData' , './form', 'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , data , list ) {
	app.directive('userpositionList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList, $state){
	        	$scope.title = "用户组列表";
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
								require(['../common/editPop'], function(pop) {
                  
                  function getAddForm (callback) {
										var _data = {
											data: obj
										};										
										callback(_data);
                  }

	        				pop.init({
	        					obj        : obj,
	        					list       : list,
	        					$uibModal  : $uibModal,
	        					updateData : getAddForm,
	        					save : function(obj, _detail) {

	        						data.position.updatePosition({
	        							id           : _detail.id,												
												positionName  : obj.positionName,
												
												callback : function(_data){
													layui.use(['layer'], function(){
														var layer = layui.layer;
														layer.msg(_data.message);
														$state.reload();
													});
												}
	        						})
	        					},
								  	close : function () {
									   	$uibModal.dismiss('cancel');
								  	},  					
	        					callback : function(list, callback){
	        						callback(list);
	        					}

	        				});
	        				
			  				});
							},

							editPermission : function(obj) {
								require(['./permissionsPop'], function(pop) {
                  
	        				pop.init({
	        					obj        : obj,	        					
	        					$uibModal  : $uibModal,	        				  
	        					save : function(obj, _detail) {
	        						
	        					},
								  	close : function () {
									   	$uibModal.dismiss('cancel');
								  	},  					
	        					callback : function(list, callback){
	        						callback(list);
	        					}

	        				});
	        				
			  				});
							},

    					del   : function (obj) {
								pop.alert({
			 						 text:'您确定要删除'+obj.positionName + '吗'
			 						,btn : ['确定','取消']
			 						,fn : function(){
										var _data = data.position.delPosition(obj)
									}
			 					})

			 					obj.callback = function(_data) {
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);													
										if(_data.code == 0) {									
											$('table').find("tr[data-id=" + obj.id + "]").hide();
										}
									});					
			 					}
    					},
							filter : [ //过滤不需要展示的
								'id','categoryId'
							]
						});

						function getDataList(){							
							data.position.listPosition({

								callback : function(_data){
									var th = [
													{name:'ID' , key: 'id', width : '200'},
													{name:'用户组名称', key: 'positionName' },
													{name:'操作' , width : '300', class:'center'}
									];
									
									$scope.listdata = { //确认按钮
											title : $scope.title,
											table : {
												select : true,
												th : th,
												td : GenerateArrList.setArr(_data.data,th),
												edit : [
													{cls : 'edit' , name : '赋予权限',evt:$scope.editPermission},
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
											
						};

						getDataList();
				
	     	}
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
