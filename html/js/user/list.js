define(['require',"app",'jquery',
	'../data/getData' , './addForm',
	'formlist','position','fixedNav',
	'../moduls/service','../moduls/factory'
], function ( require , app , $ , data , list ) {
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
					edit : function( obj ){ //保存
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

					del : function( id ){ //删除
						pop.alert({
							 text:'你的ID为：'+id
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					},
					filter : [ //过滤不需要展示的
						'id','userId','lastModifyUserId'
					],
					changeTypeName : [{name:'headImage',newName:'image'}]
				});

				var page = 1;
				function getDataList(){
					data.user.userlist({
						page : page,
						pageSize: 5,

						callback : function(_data){
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
										{name:'头像' ,  key: 'headImage', width : '200'},										
										{name:'真实名称', key: 'realName' },
										{name: '用户ID', key: 'userId'},
										{name:'操作' , width : '300' , class:'center'}
							];					

							$scope.listdata = { //确认按钮
								title : $scope.title,
								table : {
									select : true,
									th : th,
									td : GenerateArrList.setArr(_data.data.list,th),
									edit : [
										{cls : 'edit' , name : '所属频道',evt:$scope.editUserChannel},
										{cls : 'edit' , name : '用户组',evt:$scope.editUserPosition},
										{cls : 'del' , name : '删除',evt:$scope.del}
									]
								}
							}


							// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td							
			        GenerateArrList.changeTypeName($scope.listdata.table.td,[{name:'headImage',newName:'image'}]);
			        
			        $.each($scope.listdata.table.td, function(i, obj){
			        	obj.list[0].image = obj.headImage;
			        	obj.list[0].name = false;
			        })							
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
