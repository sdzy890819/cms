define(["app","./addForm","../upload/index","../data/getData","form","position","fixedNav"],function(e,a,i,n){e.directive("userAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e,t,l,o){e.$parent.menu.push({name:"新增用户"}),angular.extend(e,{save:function(a){//保存
function i(e){layui.use(["layer"],function(){var a=layui.layer;a.msg(e,{icon:5})})}var t=e.imageInfo.name.match(/\w+$/)[0];l.base64DataUrl(e.imageInfo).then(function(e){e?n.upload.uploadImage({baseCode:e.split(",")[1],suffix:t,//"文件后缀png|jpg"
width:100,callback:function(e){var i=e.data;n.user.createUser({headImage:i.imageUrl,userName:a.userName,realName:a.realName,idfa:a.idfa,pwd:a.pwd,callback:function(e){layui.use(["layer"],function(){var a=layui.layer;a.msg(e.message),0==e.code&&o.go("user.list")})}})}}):e?"yes"!=isSize||"yes"!=selectSize||width?"yes"!=isSize||"no"!=selectSize||height||i("请输入高度"):i("请输入高度"):i("请上传图片")})},cancel:function(e){},/*edit : { //导航操作按钮
								list : [
									{
										name:'保存',
										evt : $scope.save,
										cls : 'add'
									}
								]
							},*/
formdata:{//确认按钮
title:"新增用户",list:a,submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"取消",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]}}),e.$on("formRepeat",function(){$(".layui-upload-button").unbind().click(function(){i.init({data:{obj:{},title:"上传图片",name:"请选择图片",type:"image",event:function(a,i){e.imageInfo=a,l.base64DataUrl(e.imageInfo).then(function(e){var i="<img src='"+a.$ngfDataUrl+"'width='100px' class='thumb'>";
// $('.layui-upload-button').empty().append(image);												
$(".imagePre").empty().append(i)}),i.dismiss("cancel")}},$uibModal:t})});var a=$("form.layui-form"),n=(a.find('input[name="isSize"]'),a.find('input[name="selectSize"]')),o=n.parent().parent(),u=a.find('input[name="imageWidth"]'),c=u.parent().parent(),r=a.find('input[name="imageHeight"]'),d=r.parent().parent(),s=!0;d.hide(),layui.use(["form","layedit","laydate"],function(){function e(){0==s?(d.show(),c.hide()):(d.hide(),c.show())}var a=layui.form();layui.layer,layui.layedit,layui.laydate;a.on("radio",function(a){//
var i=a.elem.name,n=a.value;"isSize"==i?"no"==n?(o.hide(),c.hide(),d.hide()):(o.show(),e()):"selectSize"==i&&(s="no"!=n,e())})})})}}})});