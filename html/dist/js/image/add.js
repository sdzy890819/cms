define(["app","./addForm","../upload/index","../data/getData","form","position","fixedNav"],function(e,a,i,t){e.directive("imageAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e,n,l,o){e.title="新增图片",e.$parent.menu.push({name:e.title}),angular.extend(e,{save:function(a){function i(e){layui.use(["layer"],function(){var a=layui.layer;a.msg(e,{icon:5})})}//保存
var l="yes"==a.watermark?1:0,//水印
m=a.isSize,//是否等比缩放
r=a.selectSize,//选择宽还是高
s=a.imageWidth,c=a.imageHeight,d=a.title;e.imageInfo||i("请上传图片!");var u=e.imageInfo.name.match(/\w+$/)[0];n.base64DataUrl(e.imageInfo).then(function(e){e&&("no"==m||"yes"==m&&"yes"==r&&s||"yes"==m&&"no"==r&&c)?t.upload.uploadImage({baseCode:e.split(",")[1],suffix:u,//"文件后缀png|jpg"
watermark:l,//是否水印
width:s,//需要压缩的长度 可不传
height:c,//需要压缩的高度  可不传
callback:function(e){var a=e.data;t.image.createImages({imageUrl:a.imageUrl,imageWidthPixel:a.imageWidthPixel,imageHeightPixel:a.imageHeightPixel,// 图片宽像素  图片上传接口返回
orgWidthPixel:a.orgWidthPixel,//原始长像素  图片上传接口返回
orgHeightPixel:a.orgHeightPixel,//原始宽像素  图片上传接口返回
imageTitle:d,imagePath:a.imagePath,watermark:a.watermark,//是否水印 1、0
compress:a.compress,//是否压缩
fid:a.fid,//图片上传接口返回
size:a.size,//图片上传接口返回
callback:function(e){layui.use(["layer"],function(){var a=layui.layer;a.msg(e.message),0==e.code&&o.go("image.list")})}})}}):e?"yes"!=m||"yes"!=r||s?"yes"!=m||"no"!=r||c||i("请输入高度"):i("请输入宽度"):i("请上传图片")})}}),e.$on("formRepeat",function(){$(".layui-upload-button").unbind().click(function(){i.init({data:{obj:{},title:"上传图片",name:"请选择图片",type:"image",event:function(a,i){e.imageInfo=a,n.base64DataUrl(e.imageInfo).then(function(e){var i="<img src='"+a.$ngfDataUrl+"'width='100px' class='thumb'>";
// $('.layui-upload-button').empty().append(image);												
$(".imagePre").empty().append(i)}),i.dismiss("cancel")}},$uibModal:l})});var a=$("form.layui-form"),t=(a.find('input[name="isSize"]'),a.find('input[name="selectSize"]')),o=t.parent().parent(),m=a.find('input[name="imageWidth"]'),r=m.parent().parent(),s=a.find('input[name="imageHeight"]'),c=s.parent().parent(),d=!0;c.hide(),layui.use(["form","layedit","laydate"],function(){function e(){0==d?(c.show(),r.hide()):(c.hide(),r.show())}var a=layui.form();layui.layer,layui.layedit,layui.laydate;a.on("radio",function(a){//
var i=a.elem.name,t=a.value;"isSize"==i?"no"==t?(o.hide(),r.hide(),c.hide()):(o.show(),e()):"selectSize"==i&&(d="no"!=t,e())})})}),e.formdata={//确认按钮
title:e.title,list:a,submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"取消",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]}}}})});