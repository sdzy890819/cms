define(['require',"app",'jquery'
	,'../data/getData' , './addForm', 'search', './searchForm'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , getData , list, search, searchForm ) {
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
										getData.fragment.findFragment({
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

	        						getData.fragment.updateFragment({
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

														if (_data.code == 0) {
															$state.reload();
															
														}
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
										getData.fragment.fragmentMap({
											id:  obj.id,
											callback : function(_data) {																												
												_data.data.id = obj.id;												
												callback(_data);
											}											
										})										
									}

									function getList(callback){			
										var list = [];
										getData.fragment.fragmentMap({
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

	        						var values = {};	        						
	        						$.each(obj, function(k, v){

	        							if (k != 'selects') {
	        								values[k] = v;
	        							}
	        						})
	        						
	        						getData.fragment.editFragment({
	        							id : _detail.id,
	        							values : JSON.stringify(values),	        							
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
										getData.fragment.delFragment(obj)
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

							release : function( obj ) {
								pop.alert({
									text: '确认发布' + obj.fragmentName,
									btn : ['确定', '取消'],
									fn  : function(index) {
										getData.fragment.publish(obj);
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
						
						function setList(_data){
							var th = [							
								{name: '碎片ID', width: '50', key: 'id'},
								{name:'碎片名称', key: 'fragmentName' },
								{name:'最后维护人', key: 'editUserName',width:60 },
								{name:'最后维护时间', key: 'editTimeStr',width:60 },						
								
								{name: '创建人', key: 'createUserName' , width:60},
								{name: '创建时间', key: 'createTimeStr' , width:80},
								{name: '修改人', key: 'lastModifyUserName' , width:60},
								{name: '修改时间', key: 'updateTimeStr' , width:80},

								{name:'操作' , width : '100', class:'center'}
							];

							$scope.listdata = { //确认按钮
								title : $scope.title,
								table : {
									select : true,
									th : th,
									td : GenerateArrList.setArr(_data.data.list,th) ,
									edit : [
										{cls : 'edit' , name : '编辑',evt:$scope.edit},
										{cls : 'edit' , name : '碎片维护',evt:$scope.editFragmentMap},
										{cls : 'del'  , name : '删除',evt:$scope.del}
										// {cls : 'edit'  , name : '发布',evt:$scope.release}
									]
								}
							}
							GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
	        				GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
	        				$scope.$apply();								
						}

						var page = 1
						function getDataList(){
							getData.fragment.listFragment({
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
						}
						
						getDataList();



						//搜索
						function search(){
							var searchPage = 1;
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
										var fragmentClassifyId , channelId;
										$.each(obj.selects,function(){
											if(this.title == 'fragmentClassifyId'){
												fragmentClassifyId = this.id;
											}
											if(this.title == 'channelId'){
												channelId = this.id;
											}

										});
										function getSearchList(){
											getData.search.searchFragment({
												"condition":obj.condition,
												"fragmentClassifyId":fragmentClassifyId,												
												"channelId":channelId,//频道ID
												page : searchPage,
												pageSize : 20,
												callback : function(_data){
													//分页
													$scope.page = _data.data.page;
													$scope.page.jump = function( obj ){
														if(searchPage != obj.curr){
															searchPage = obj.curr;
															getSearchList();
														}
													}
													$scope.searchform.search = {
														count : _data.data.page.count , 
														name : obj.condition
													}

													if (_data.data.list == undefined){
														_data.data.list = [];
													}
													setList(_data);
												}
											})
										};
										getSearchList();
									}
								}
								$scope.$apply();
							});
						}
						search();
						//end 搜索
						


	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
