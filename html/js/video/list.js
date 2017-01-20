define(['require',"app",'jquery'
	,'../data/getData' , './addForm',
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , data , list ) {
	app.directive('videoList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$scope.title = "视频管理";
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
								require(['./editVideoPop'], function(pop) {
									function getAddForm(callback){
										var _data = {
											data : obj
										}										
										callback(_data);
									}

	        				pop.init({
	        					obj : obj,
	        					list : list,
	        					$uibModal :$uibModal,
	        					updateData : getAddForm,
	        					callback : function(list, callback){
	        						callback(list);
	        					}
	        				});
			  				});
							},
							del : function( obj ){ //删除
								pop.alert({
									 text:'你确定删除：'+ obj.videoTitle
									,btn : ['确定','取消']
									,fn : function(index){//确定
										data.video.delVideo(obj);
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
								'id','uploadUserId'
							]
						});
						
						var page = 1
						function getDataList(){
							data.video.videolist({
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
												{name:'ID' , key: 'id', width : '50'},
												{name:'视频标题' , key: 'videoTitle', width : '200'},												
												{name:'视频链接URL', key: 'videoUrl' },
												{name:'操作' , width : '120', class:'center'}
											];

									$scope.listdata = { //确认按钮
										title : $scope.title,
										table : {
											select : true,
											th : th,
											td : GenerateArrList.setArr(_data.data.list, th) ,
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
						getDataList();
				
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
