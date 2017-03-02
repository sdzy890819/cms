define(['require',"app",'jquery',
	'../data/getData' , './addForm', 'search', './searchForm',
	'../common/editPop',
	'formlist','position','fixedNav',
	'../moduls/service','../moduls/factory'
], function ( require , app , $ , getData , list, search, searchForm,editPop ) {
	app.directive('userList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$scope.title = '用户列表';
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				$.extend($scope,{
					add : function( id ){ //保存
						pop.alert({
							 text:'你的ID为：'+id
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					},
					editUserChannel : function(obj) {
						require(['./channelPop'], function(pop) {
        				pop.init({
        					obj : obj,        					
        					$uibModal :$uibModal 
        				});
	  				});						
					},
					editUserPosition : function(obj) {
						require(['./positionPop'], function(pop) {
        				pop.init({
        					obj : obj,        					
        					$uibModal :$uibModal 
        				});
	  				});	
					},
					edit : function( obj ){
						editPop.init({
        					obj : obj,
        					list : list,
        					updateData : function(){

        					},
        					save : function(obj , _detail ){ //保存 新增 确认 等
        						
        					},
        					callback : function( list , callback ){ //返回获取的数据 用于操作  				
								
        					},
        					$uibModal :$uibModal 
        				});
					},
					del : function( obj ){ //删除
						
						pop.alert({
							 text:'你确定删除：'+ obj.realName
							,btn : ['确定','取消']
							,fn : function(index){//确定
								getData.user.delUser(obj);
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
						'id','userId','lastModifyUserId'
					],
					changeTypeName : [{name:'headImage',newName:'image'}]
				});

				function setList(_data){
					var th = [
								{name:'头像' ,  key: 'headImage', width : '200'},										
								{name:'真实名称', key: 'realName' },
								//{name:'用户名', key: 'realName' },
								{name: 'IDFA(MAC)', key: 'idfa'},
								{name: '用户ID', key: 'userId'},
								{name:'操作' , width : '300' , class:'center'}
					];				

					$.each(_data.data.list, function(i, a){						
						if (!a.idfa) {
							a.idfa = '';
						}
					})
					
					$scope.listdata = { //确认按钮
						title : $scope.title,
						table : {
							select : true,
							th : th,
							td : GenerateArrList.setArr(_data.data.list,th),
							edit : [
								{cls : 'edit' , name : '所属频道',evt:$scope.editUserChannel},
								{cls : 'edit' , name : '用户组',evt:$scope.editUserPosition},
								{cls : 'edit' , name : '编辑',evt:$scope.edit},
								{cls : 'del' , name : '删除',evt:$scope.del}
							]
						}
					}		
					
		        GenerateArrList.changeTypeName($scope.listdata.table.td,[{name:'headImage',newName:'image'}]);
		        
		        $.each($scope.listdata.table.td, function(i, obj){
		        	obj.list[0].image = obj.headImage;
		        	obj.list[0].name = false;
		        })
		        
        		GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
        		$scope.$apply();							
					
				}

				var page = 1;
				function getDataList(){
					getData.user.userlist({
						page : page,
						pageSize: 20,
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
					})
				}

					getDataList();

				//搜索
				function search(){
					var searchPage = 1;
					searchForm(function(data){
						$scope.searchform = {
							list : data,
							return : function(){ //返回列表
								getDataList();
								$scope.searchform.search = null;
								page = 1;
								searchPage = 1;
								$scope.$$childHead.current = 1;
							},
							submit : function( obj , data ){
								function getSearchList(){									
									getData.search.searchUser({
										"condition":obj.condition,
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
						if(!$scope.$$phase) { 
							$scope.$apply();
						}
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
