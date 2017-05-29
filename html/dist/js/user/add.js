define(["app","./addForm","../upload/index","../data/getData","form","position","fixedNav"],function(app,getList,upload,getData){app.directive("userAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function($scope,$uibModal,Upload,$state){$scope.$parent.menu.push({name:"新增用户"}),angular.extend($scope,{save:function(obj){function alert(content,icon){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(content,{icon:icon||5})})}function create(obj,data){var ids=[];$.each(obj.checkboxs,function(){ids.push(this.id)}),data=data||{imageUrl:""},getData.user.createUser({headImage:data.imageUrl,positionIds:ids,userName:obj.userName,realName:obj.realName,idfa:obj.idfa,pwd:obj.pwd,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$state.go("user.list")})}})}if($scope.imageInfo){var suffix=$scope.imageInfo.name.match(/\w+$/)[0];Upload.base64DataUrl($scope.imageInfo).then(function(urls){urls?getData.upload.uploadImage({baseCode:urls.split(",")[1],suffix:suffix,width:100,callback:function(_data){create(obj,_data.data)}}):urls?"yes"!=isSize||"yes"!=selectSize||width?"yes"!=isSize||"no"!=selectSize||height||alert("请输入高度"):alert("请输入高度"):alert("请上传图片")})}else create(obj)},cancel:function(arr){}}),getList(function(list){$scope.formdata={title:"新增用户",list:list,submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"取消",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]}}),$scope.$on("formRepeat",function(){$(".layui-upload-button").unbind().click(function(){upload.init({data:{obj:{},title:"上传图片",name:"请选择图片",type:"image",event:function(file,$uibModalInstance){$scope.imageInfo=file,Upload.base64DataUrl($scope.imageInfo).then(function(urls){var image="<img src='"+file.$ngfDataUrl+"'width='100px' class='thumb'>";$(".imagePre").empty().append(image)}),$uibModalInstance.dismiss("cancel")}},$uibModal:$uibModal})});var form=$("form.layui-form"),selectSize=(form.find('input[name="isSize"]'),form.find('input[name="selectSize"]')),selectSize_parent=selectSize.parent().parent(),width=form.find('input[name="imageWidth"]'),width_parent=width.parent().parent(),height=form.find('input[name="imageHeight"]'),height_parent=height.parent().parent(),iswidth=!0;height_parent.hide(),layui.use(["form","layedit","laydate"],function(){function setWidthAndHeightInput(){0==iswidth?(height_parent.show(),width_parent.hide()):(height_parent.hide(),width_parent.show())}var form=layui.form();layui.layer,layui.layedit,layui.laydate;form.on("radio",function(_obj){var name=_obj.elem.name,value=_obj.value;"isSize"==name?"no"==value?(selectSize_parent.hide(),width_parent.hide(),height_parent.hide()):(selectSize_parent.show(),setWidthAndHeightInput()):"selectSize"==name&&(iswidth="no"!=value,setWidthAndHeightInput())})})})}}})});