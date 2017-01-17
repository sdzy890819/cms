define(['require',"app",'jquery'
	,'../data/getData' , './addForm',
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , data , list ) {
	app.directive('fragmentList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList, $state){
	        	$scope.title = "碎片列表";
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

									function getAddForm(callback){
										data.fragment.findFragment({
											id:  obj.id,
											callback : function(_data) {												
												callback(_data);
											}
										})										
									}
	        				pop.init({
	        					obj : obj,
	        					list : list,
	        					$uibModal :$uibModal,
	        					updateData : getAddForm,

	        					save : function(obj, _detail) {
											var channelId, fragmentClassifyId;
											$.each(obj.selects, function(){
												if(this.title == 'channelId'){
													channelId = this.id;
												}

												if(this.title == 'fragmentClassifyId') {
													fragmentClassifyId = this.id;
												}
											})

	        						data.fragment.updateFragment({
	        							id : _detail.id,
												channelId : channelId,
												fragmentClassifyId : fragmentClassifyId,
												fragmentName : obj.fragmentName,
												fragmentModel : obj.fragmentModel,
												sortNum : obj.sortNum,

												callback : function(_data){
													layui.use(['layer'], function(){
														var layer = layui.layer;
														layer.msg(_data.message);
													});													
												}
	        						})
	        					},

	        					callback : function(list, callback) {	        						
	        						callback(list);
	        					}
	        				});
			  				});
							},

							editFragmentMap : function(obj) { //修改碎片map
								require(['../common/editPop'], function(pop) {

									function getAddForm(callback){
										data.fragment.fragmentMap({
											id:  obj.id,
											callback : function(_data) {																												
												_data.data.id = obj.id;												
												callback(_data);
											}											
										})										
									}

									function getList(callback){			
										var list = [];
										data.fragment.fragmentMap({
											id:  obj.id,
											callback : function(_data) {																
												$.each(_data.data, function(k , v){
													list.push({
														title : k,
														name : k,
														type : 'text',
														placeholder : k,
														verify : 'title'
													})												
												})

												callback(list);
											}											
										})										
									}

	        				pop.init({
	        					obj : obj,
	        					list : getList,
	        					$uibModal :$uibModal,
	        					updateData : getAddForm,

	        					save : function(obj, _detail) {

	        						var values = [];	        						
	        						$.each(obj, function(k, v){
	        							if (k != 'selects') {
	        								values.push(v);
	        							}
	        						})

	        						data.fragment.editFragment({
	        							id : _detail.id,
	        							values : values,	        							
	        							callback : function(_data) {
													layui.use(['layer'], function(){
														var layer = layui.layer;
														layer.msg(_data.message);
														$state.reload();
													});	        								
	        							}
	        						})
	        					},

	        					callback : function(list, callback) {	        							        						
	        						callback(list);
	        					}
	        				});
			  				});
							},
							del : function( obj ){ //删除
								pop.alert({
									text:'你确定删除' + obj.fragmentName + '吗',
									btn : ['确定','取消'],
								  fn : function(index){//确定
										data.fragment.delFragment(obj)
									}
								})

								obj.callback = function(_data) {
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);													
										location.reload();
									});										
								}
							},

							release : function( obj ) {
								pop.alert({
									text: '确认发布' + obj.fragmentName,
									btn : ['确定', '取消'],
									fn  : function(index) {
										data.fragment.publish(obj);
									}
								})

								obj.callback = function(_data) {
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);																							
									});									
								}
							},
							filter : [ //过滤不需要展示的
								'id','fragmentClassifyId'
							]
						});

						var page = 1
						function getDataList(){
							data.fragment.listFragment({
								page : page,
								pageSize : 5,

								callback : function(_data)	{
									//分页
									$scope.page = _data.data.page;
									$scope.page.jump = function( obj ){
										if(page != obj.curr){
											page = obj.curr;
											getDataList();
										}
									}
									//end 分页
									
									var th = [							
												{name: '碎片ID', key: 'id'},
												{name:'碎片名称', key: 'fragmentName' },												
												{name:'操作' , width : '400', class:'center'}
									];

									$scope.listdata = { //确认按钮
										title : $scope.title,
										table : {
											select : true,
											th : th,
											td : GenerateArrList.setArr(_data.data.list,th) ,
											edit : [
												{cls : 'edit' , name : '编辑',evt:$scope.edit},
												{cls : 'edit' , name : '修改碎片对应关系',evt:$scope.editFragmentMap},
												{cls : 'del'  , name : '删除',evt:$scope.del},
												{cls : 'edit'  , name : '发布',evt:$scope.release}
											]
										}
									}
									GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
			        		GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
			        		$scope.$apply();															
								}

							});							
						}
						
						getDataList();
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
