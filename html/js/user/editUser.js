define(["app",'jquery', '../upload/index', '../data/getData','form'],function (app,$, upload, getData) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal , 
				getList = obj.list;
			
			if($.type(getList)=='array'){
				getList = function(callback){
					callback(obj.list);
				}
			}
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '../template/common/addAndEdit.html',
				size: 'lg',
				controller: function($scope,$uibModalInstance,$css, Upload, $state) {
					$scope.data = null;					
					angular.extend($scope,{
						titelement : {
					  		close : true
					  	},
						save : function( newData ){ //保存
							var _obj = $scope.data;
							if (_obj.headImage){
								var	suffix = _obj.headImage.split('.')[1];	
							}
														
							function alert(content){
								layui.use(['layer'], function(){
									var layer = layui.layer;
									layer.msg(content, {icon: 5});
								})
							}

							if($scope.imageInfo == undefined){
								console.log(_obj.userId);
								getData.user.updateUser({
									userId : _obj.userId,
									headImage : _obj.headImage,
									realName : newData.realName,
									pwd : newData.pwd,						
								
									callback : function(_data){
										layui.use(['layer'], function(){
											var layer = layui.layer;
											layer.msg(_data.message);										
										});												
									}
								})								
							}else{ //图片有变动就继续走上传
								var suffix = $scope.imageInfo.name.match(/\w+$/)[0];
								Upload.base64DataUrl($scope.imageInfo).then(function(urls){
									if( urls ){
										getData.upload.uploadImage({
											"baseCode":urls.split(',')[1],
											"suffix":suffix,//"文件后缀png|jpg"											
											"width": 100, //需要压缩的长度 可不传											

											callback : function(_data) {
												var data = _data.data;
												getData.user.updateUser({													
													headImage : data.imageUrl,
													realName : newData.realName,
													pwd : newData.pwd,
													userId : _obj.userId,

													callback : function(_data){
														layui.use(['layer'], function(){
															var layer = layui.layer;
															layer.msg(_data.message);																											
														});												
													}
												})
											}
										})
									}else if(!urls){
										alert('请上传图片')
									}else if(isSize=='yes' && selectSize=='yes' && !width ){
										alert('请输入高度')
									}else if(isSize=='yes' && selectSize=='no' && !height ){
										alert('请输入高度')
									}
								});		
							}

						},
						cancel : function( arr ){ //取消
							obj.cancel(arr,$scope.data)
						},
					  	close : function () {
						   	$uibModalInstance.dismiss('cancel');
					  	}
					});

					getList(function(list){						
						obj.callback(list,function(_list){
							$scope.formdata = { //确认按钮
								title : '编辑',
								cls : 'popedit',
								list : _list,
								submit : [
									{
										name : '确定',
										evt : 'save',
										icon_cls : 'save'
									}
								]
							}
							obj.updateData(function(_data){
								$scope.data = _data.data;
								if(!$scope.$$phase) { 
									$scope.$apply();
								} 
							});
							if(!$scope.$$phase) { 
								$scope.$apply();
							} 
						})
					})

					$scope.$on('formRepeat',function(){
						$('.layui-upload-button').unbind().click(function(){
							upload.init({
	        					data : {
	        						obj : {},
		        					title : '上传图片',
		        					name : '请选择图片',
		        					type : 'image',
		        					event : function(file , $uibModalInstance){	        						
		        						$scope.imageInfo = file;
		        						console.log(file)     ;
												Upload.base64DataUrl($scope.imageInfo).then(function(urls){	        						   						
			        						var image = "<img src='" + file.$ngfDataUrl + "'width='100px' class='thumb'>";	        						
			        						$('.layui-upload-button').empty().append(image);												
												})
		        						
		        						$uibModalInstance.dismiss('cancel');
		        					}
	        					},
	        					$uibModal :$uibModal
	        				});
						});

						var form = $('form.layui-form'),
							size = form.find('input[name="isSize"]'),
							selectSize = form.find('input[name="selectSize"]'),
							selectSize_parent = selectSize.parent().parent(),
							width = form.find('input[name="imageWidth"]'),
							width_parent = width.parent().parent(),
							height = form.find('input[name="imageHeight"]'),
							height_parent = height.parent().parent() , 
							iswidth = true;

						height_parent.hide();
						layui.use(['form', 'layedit', 'laydate'], function(){
							var form = layui.form()
						 		,layer = layui.layer
						  		,layedit = layui.layedit
						  		,laydate = layui.laydate;
					  	
					  		function setWidthAndHeightInput(){
					  			if(iswidth == false){
					  				height_parent.show();
					  				width_parent.hide();
					  			}else{
					  				height_parent.hide();
					  				width_parent.show();
					  			}
					  		}
						  	form.on('radio',function( _obj ){ //
						  		var name = _obj.elem.name , 
						  			value = _obj.value;

						  		if(name == 'isSize'){
						  			if(value == 'no'){
						  				selectSize_parent.hide();
						  				width_parent.hide();
						  				height_parent.hide();
						  			}else{
						  				selectSize_parent.show();
						  				setWidthAndHeightInput();
						  			}
						  		}else if( name == 'selectSize' ){
						  			if(value == 'no'){
						  				iswidth = false;
						  			}else{
						  				iswidth = true;
						  			}
						  			setWidthAndHeightInput();
						  		}
						  	});
						})
					});


				}
			});
    	},
    	updateData : function(){

    	}
    }
});