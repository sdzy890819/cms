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
	            filter : '=filter'
	        },
	        controller : function($scope , $state , $element , $rootScope){
				var icon = {
					add:'plus',//添加
					edit:'pencil',//编辑
					upload:'upload-alt',// 上传
					del:'trash',//删除
				};

				$.each($scope.data.table.edit.list,function( i , obj ){
					obj.icon = icon[obj.cls];
				});

				$scope.filterTd = function( val ){
					var b = true;
					for(var i=0,len=$scope.filter.length;i<len;i++){
						if($scope.filter[i]==val){
							b = false;
							break;
						}
					}
					return b;
				}
			},
			link : function($scope , element , arrt , controller){
				var ele = $(element[0]) ,
					thSelect ,
					select ,
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
				$scope.thFinish = function(){
					if($scope.data.table.select){
						thSelect = ele.find('th.select');
						check(thSelect,function(checked){
							$scope.selectEdit();
						})
					}
				}
				$scope.tdFinish = function(){
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
				}
				$scope.selectEdit = function( ){ //全选或取消全选
					$scope.isSelectAll = $scope.isSelectAll===true?false:true;
					if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
					    $scope.$apply();
					}
				}
				$scope.submit = function( callback , obj ,$event){
					callback(obj,$scope,$event);
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
				 
			}
		}
	});
});