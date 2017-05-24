define(["app",'./addForm', '../upload/index', '../data/getData','form','position','fixedNav'], function ( app , getList, upload, getData ) {
	app.directive('userAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope, $uibModal, Upload, $state){
	        	$scope.$parent.menu.push({name:"新增用户"});
	        	angular.extend($scope,{
					save : function( obj ){ //保存
					 
						function alert(content , icon){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(content, {icon: icon||5});
							})
						}
						function create( obj , data){
							var ids = [];
							$.each(obj.checkboxs,function(){
								ids.push(this.id);
							});
							data = data || {imageUrl:''}
							getData.user.createUser({
								headImage : data.imageUrl,
								positionIds : ids,
								userName: obj.userName,
								realName: obj.realName,
								idfa : obj.idfa,
								pwd:  obj.pwd,

								callback : function(_data){
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);												
										if(_data.code == 0){
											$state.go('user.list');	
										}

									});												
								}
							})
						}
						if(!$scope.imageInfo){
							create(obj);
							//return alert("请上传头像")
						}else{
							var suffix = $scope.imageInfo.name.match(/\w+$/)[0];
							Upload.base64DataUrl($scope.imageInfo).then(function(urls){
								if( urls ){
									getData.upload.uploadImage({
										"baseCode":urls.split(',')[1],
										"suffix":suffix,//"文件后缀png|jpg"
										"width" : 100,
										callback : function(_data) {
											create(obj , _data.data);
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
					},
					/*edit : { //导航操作按钮
						list : [
							{
								name:'保存',
								evt : $scope.save,
								cls : 'add'
							}
						]
					},*/
							
				});

				getList(function( list ){
					$scope.formdata = { //确认按钮
						title : '新增用户',
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
											Upload.base64DataUrl($scope.imageInfo).then(function(urls){	        						   						
		        						var image = "<img src='" + file.$ngfDataUrl + "'width='100px' class='thumb'>";	        						
		        						// $('.layui-upload-button').empty().append(image);												
		        						$('.imagePre').empty().append(image);
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
	    };
	});
});