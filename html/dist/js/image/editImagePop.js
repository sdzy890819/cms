define(["app","jquery","../upload/index","../data/getData","form"],function(app,$,upload,getData){return{init:function(obj){var $uibModal=obj.$uibModal,getList=obj.list;"array"==$.type(getList)&&(getList=function(callback){callback(obj.list)}),obj.$uibModal.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"../template/common/addAndEdit.html",size:"lg",controller:function($scope,$uibModalInstance,$css,Upload,$state){$scope.data=null,angular.extend($scope,{titelement:{close:!0},save:function(newData){function alert(content){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(content,{icon:5})})}var _obj=obj.obj,watermark="yes"==_obj.watermark?1:0,isSize=newData.isSize,selectSize=newData.selectSize,width=newData.imageWidth,height=newData.imageHeight,title=newData.title,suffix=_obj.imageUrl.split(".")[1];if(void 0==$scope.imageInfo)getData.image.updateImages({id:_obj.id,imageUrl:_obj.imageUrl,imageTitle:newData.title,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),$state.reload(),$uibModalInstance.dismiss("cancel")})}});else{var suffix=$scope.imageInfo.name.match(/\w+$/)[0];Upload.base64DataUrl($scope.imageInfo).then(function(urls){urls&&("no"==isSize||"yes"==isSize&&"yes"==selectSize&&width||"yes"==isSize&&"no"==selectSize&&height)?getData.upload.uploadImage({baseCode:urls.split(",")[1],suffix:suffix,watermark:watermark,width:width,height:height,callback:function(_data){var data=_data.data;getData.image.updateImages({id:_obj.id,imageUrl:data.imageUrl,imageWidthPixel:data.imageWidthPixel,imageHeightPixel:data.imageHeightPixel,orgWidthPixel:data.orgWidthPixel,orgHeightPixel:data.orgHeightPixel,imageTitle:title,imagePath:data.imagePath,watermark:data.watermark,compress:data.compress,fid:data.fid,size:data.size,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),$state.reload(),$uibModalInstance.dismiss("cancel")})}})}}):urls?"yes"!=isSize||"yes"!=selectSize||width?"yes"!=isSize||"no"!=selectSize||height||alert("请输入高度"):alert("请输入高度"):alert("请上传图片")})}},cancel:function(arr){obj.cancel(arr,$scope.data)},close:function(){$uibModalInstance.dismiss("cancel")}}),getList(function(list){obj.callback(list,function(_list){$scope.formdata={title:"编辑",cls:"popedit",list:_list,submit:[{name:"确定",evt:"save",icon_cls:"save"}]},obj.updateData(function(_data){$scope.data=_data.data,$scope.$$phase||$scope.$apply()}),$scope.$$phase||$scope.$apply()})}),$scope.$on("formRepeat",function(){$(".layui-upload-button").unbind().click(function(){upload.init({data:{obj:{},title:"上传图片",name:"请选择图片",type:"image",event:function(file,$uibModalInstance){$scope.imageInfo=file,console.log(file),Upload.base64DataUrl($scope.imageInfo).then(function(urls){var image="<img src='"+file.$ngfDataUrl+"'width='100px' class='thumb'>";$(".imagePre").empty().append(image)}),$uibModalInstance.dismiss("cancel")}},$uibModal:$uibModal})});var form=$("form.layui-form"),selectSize=(form.find('input[name="isSize"]'),form.find('input[name="selectSize"]')),selectSize_parent=selectSize.parent().parent(),width=form.find('input[name="imageWidth"]'),width_parent=width.parent().parent(),height=form.find('input[name="imageHeight"]'),height_parent=height.parent().parent(),iswidth=!0;height_parent.hide(),layui.use(["form","layedit","laydate"],function(){function setWidthAndHeightInput(){0==iswidth?(height_parent.show(),width_parent.hide()):(height_parent.hide(),width_parent.show())}var form=layui.form();layui.layer,layui.layedit,layui.laydate;form.on("radio",function(_obj){var name=_obj.elem.name,value=_obj.value;"isSize"==name?"no"==value?(selectSize_parent.hide(),width_parent.hide(),height_parent.hide()):(selectSize_parent.show(),setWidthAndHeightInput()):"selectSize"==name&&(iswidth="no"!=value,setWidthAndHeightInput())})})})}})},updateData:function(){}}});