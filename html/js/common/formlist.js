define(["app",'jquery','./moduls/directive'], function ( app , $ ) {
	app.directive('formList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/formlist.html',
			scope : {
	            data : '=data',	            
	            edit : '=edit',	            
	            filter : '=filter',	
	            searchform : '=searchform', //搜索  	            
	            page : '=page'
	        },
	        controller : function($scope , $state , $element , $rootScope){
	        	layui.link('js/plug/layui/css/layui.css');
				var icon = {
					add:'plus',//添加
					edit:'pencil',//编辑
					down:'download-alt',// 下载
					upload : 'upload-alt',//上传
					zoom_in : 'zoom-in',//上传
					del:'trash'//删除					
				};

				$scope.$watch(function(){
					return $scope.data;
				},function(){ 
					if($scope.data){
						$.each($scope.data.table.edit,function( i , obj ){
							obj.icon = icon[obj.cls];
						});
						if($scope.data.table.edit1){
							$.each($scope.data.table.edit1,function( i , obj ){
								obj.icon = icon[obj.cls];
							});
						}
						return;
					};
				},true);

			},
			link : function($scope , element , arrt , controller){
				var ele = $(element[0]) ,
					thSelect ,
					len,
					index = 0 , 
					selectIcon;
				$scope.isSelectAll = false;
				$scope.selectAllIcon = false;
				$scope.$watch('isSelectAll',function(){ //全选 或取消 全选
					if(!thSelect||!select) return;
					if($scope.isSelectAll==true){
						$scope.selectAllIcon = true;
						index = len;
					}else if($scope.isSelectAll==false){
						$scope.selectAllIcon = false;
						index = 0;
					}else{
						$scope.selectAllIcon = false;
					}
					select.children().each(function(){
						if($scope.isSelectAll===true){
							this.checked = true;
						}else if($scope.isSelectAll==false){
							this.checked = false;
						}
					});
				});
				$scope.$watch('selectAllIcon',function(){ //取消一个选则不属于全选
					if(!thSelect||!select) return;
					if($scope.selectAllIcon){
						thSelect.children()[0].checked = true;
						if(selectIcon){
							selectIcon.className='icon-ok-sign';
						}
					}else{
						thSelect.children()[0].checked = false;
						if(selectIcon){
							selectIcon.className='icon-ok';
						}
					}
				});
				function check(select,callback){
					select.each(function(){
						var input = $(this).find('input');
						input.click(function(e ){
							e.stopPropagation();
							callback(this.checked)
						})
						$(this).click(function(){
							input.click();
						})
					})
				}
				angular.extend($scope,{
					thFinish : function(){
						if($scope.data.table.select){
							thSelect = ele.find('th.select');
							check(thSelect,function(checked){
								$scope.selectEdit();
							})
						}
					},
					tdFinish : function(){
						if($scope.data.table.select){
							select = ele.find('td.select');
							len = select.length;
							check(select,function(checked){
								if(checked){
									index++
								}else{
									index--;
								}
								if(index>=len){
									$scope.isSelectAll = true;
								}else if(index<=0){
									$scope.isSelectAll = false;
								}else{
									$scope.isSelectAll = 2;
								}
								$scope.$apply();
							});
						}
					},
					editsFinish : function(){
						$.each($scope.data.table.edit,function( i , obj ){
							if(obj.cls == 'upload'){
								
							}
						});
					},
					submit : function( callback , obj ,$event){
						callback && callback(obj,$scope,$event);
					}
					
				})
				$scope.selectEdit = function( ){ //全选或取消全选
					$scope.isSelectAll = $scope.isSelectAll===true?false:true;
					if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
					    $scope.$apply();
					}
				}

				$scope.selectAll = function( evt ){
					selectIcon = $(evt.currentTarget).find('i')[0];
					$scope.selectEdit();
				}
				$scope.getSelect = $scope.delAll = function( callback ){ //删除所有选择的 select
					var arr = '';
					select.children().each(function(){
						if(this.checked==true){
							arr += ($(this).parent().parent().attr('data-id'))+',';
						}
					});
					arr = arr.substr(0,arr.length-1);
					if(arr.length<1){
						layui.use(['layer'], function(){
							var layer = layui.layer;
							layer.msg('请至少选择一项进行操作。', function(){});
						});
					}else{
						callback(arr);
					}
				}
				$scope.getOneSelect = function(callback){ //只选择一个
					$scope.getSelect(function(str){
						if(str.split(',').length>1){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg('暂时不支持多个选择。', function(){});
							});
						}else{
							callback(str);
						}
					})
				}

				//以下为分页
				$scope.current = 1;
				$scope.$watch(function(){
					return $scope.page;
				},function(){ 
					if($scope.page && $scope.page.pageCount){
						layui.use(['laypage', 'layer'], function(){
							var laypage = layui.laypage
							,layer = layui.layer;

							laypage({
								cont: 'pages'
								,pages: $scope.page.pageCount //总页数
								,groups: 5 //连续显示分页数
								,curr : $scope.page.page
								,jump : function( obj ){
									$scope.current = obj.curr;
									$scope.page.jump(obj);
								}
							});
						});
						return false;
					}
				},true);
			}
		}
	});
});