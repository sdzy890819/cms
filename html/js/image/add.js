define(["app",'./addForm','../upload/index','../data/getData','form','position','fixedNav'], function ( app , list , upload , getData ) {
	app.directive('imageAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope,Upload,$uibModal){
	        	$scope.title = '新增图片';
	        	$scope.$parent.menu.push({name:$scope.title});
	        	angular.extend($scope,{
					save : function( obj ){ //保存
						var watermark = (obj.watermark=='yes'?1:0), //水印
							isSize = obj.isSize , //是否等比缩放
							selectSize = obj.selectSize , //选择宽还是高
							width = obj.width , 
							height = obj.heigh,
							title = obj.title;
						

						function alert(content){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(content, {icon: 5});
							})
						}
						var suffix = $scope.imageInfo.name.match(/\w+$/)[0];
						Upload.base64DataUrl($scope.imageInfo).then(function(urls){
							if( urls && ( isSize=='no' || (isSize=='yes' && selectSize=='yes' && width ) ||  (isSize=='yes' && selectSize=='no' && height)) ){
								getData.upload.uploadImage({
									"baseCode":urls.split(',')[1],
									"suffix":suffix,//"文件后缀png|jpg"
									"watermark":watermark, //是否水印
									"width":width, //需要压缩的长度 可不传
									"height":height, //需要压缩的高度  可不传

									callback : function(_data) {
										var data = _data.data;
										getData.image.createImages({
											imageUrl : data.imageUrl,
											imageWidthPixel : data.imageWidthPixel, 
											imageHeightPixel : data.imageHeightPixel, // 图片宽像素  图片上传接口返回
											orgWidthPixel : data.orgWidthPixel, //原始长像素  图片上传接口返回
											orgHeightPixel : data.orgHeightPixel, //原始宽像素  图片上传接口返回
											imageTitle : title,
											imagePath : data.imagePath,
											watermark : data.watermark, //是否水印 1、0
											compress : data.compress, //是否压缩
											fid : data.fid, //图片上传接口返回
											size : data.size, //图片上传接口返回

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
				});
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
	        						var image = "<img src='" + file.$ngfDataUrl + "' width='100'>";	        						
	        						$('.layui-upload-icon').empty().append(image);
	        						
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
						width = form.find('input[name="width"]'),
						width_parent = width.parent().parent(),
						height = form.find('input[name="height"]'),
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
				$scope.formdata = { //确认按钮
					title : $scope.title,
					list : list,
					submit : [
						{
							name : '保存',
							evt : 'save',
							icon_cls : 'save'
						},
						{
							name:'取消',
							evt : 'cancel',
							icon_cls : 'cancel',
							cls : 'cancel'
						}
					]
				}
        	}
	    };
	});
});