define(["app","jquery","../upload/index","../data/getData","form"],function(e,a,i,t){return{init:function(e){var n=e.$uibModal,l=e.list;"array"==a.type(l)&&(l=function(a){a(e.list)}),e.$uibModal.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"../template/common/addAndEdit.html",size:"lg",controller:function(o,m,s,d,r){o.data=null,angular.extend(o,{titelement:{close:!0},save:function(a){function i(e){layui.use(["layer"],function(){var a=layui.layer;a.msg(e,{icon:5})})}//保存
var n=e.obj,l="yes"==n.watermark?1:0,//水印
s=a.isSize,//是否等比缩放
u=a.selectSize,//选择宽还是高
c=a.imageWidth,g=a.imageHeight,f=a.title,p=n.imageUrl.split(".")[1];if(void 0==o.imageInfo)t.image.updateImages({id:n.id,imageUrl:n.imageUrl,imageTitle:a.title,callback:function(e){layui.use(["layer"],function(){var a=layui.layer;a.msg(e.message),r.reload(),m.dismiss("cancel")})}});else{//图片有变动就继续走上传
var p=o.imageInfo.name.match(/\w+$/)[0];d.base64DataUrl(o.imageInfo).then(function(e){e&&("no"==s||"yes"==s&&"yes"==u&&c||"yes"==s&&"no"==u&&g)?t.upload.uploadImage({baseCode:e.split(",")[1],suffix:p,//"文件后缀png|jpg"
watermark:l,//是否水印
width:c,//需要压缩的长度 可不传
height:g,//需要压缩的高度  可不传
callback:function(e){var a=e.data;t.image.updateImages({id:n.id,imageUrl:a.imageUrl,imageWidthPixel:a.imageWidthPixel,imageHeightPixel:a.imageHeightPixel,// 图片宽像素  图片上传接口返回
orgWidthPixel:a.orgWidthPixel,//原始长像素  图片上传接口返回
orgHeightPixel:a.orgHeightPixel,//原始宽像素  图片上传接口返回
imageTitle:f,imagePath:a.imagePath,watermark:a.watermark,//是否水印 1、0
compress:a.compress,//是否压缩
fid:a.fid,//图片上传接口返回
size:a.size,//图片上传接口返回
callback:function(e){layui.use(["layer"],function(){var a=layui.layer;a.msg(e.message),r.reload(),m.dismiss("cancel")})}})}}):e?"yes"!=s||"yes"!=u||c?"yes"!=s||"no"!=u||g||i("请输入高度"):i("请输入高度"):i("请上传图片")})}},cancel:function(a){//取消
e.cancel(a,o.data)},close:function(){m.dismiss("cancel")}}),l(function(a){e.callback(a,function(a){o.formdata={//确认按钮
title:"编辑",cls:"popedit",list:a,submit:[{name:"确定",evt:"save",icon_cls:"save"}]},e.updateData(function(e){o.data=e.data,o.$$phase||o.$apply()}),o.$$phase||o.$apply()})}),o.$on("formRepeat",function(){a(".layui-upload-button").unbind().click(function(){i.init({data:{obj:{},title:"上传图片",name:"请选择图片",type:"image",event:function(e,i){o.imageInfo=e,console.log(e),d.base64DataUrl(o.imageInfo).then(function(i){var t="<img src='"+e.$ngfDataUrl+"'width='100px' class='thumb'>";
// $('.layui-upload-button').empty().append(image);											
a(".imagePre").empty().append(t)}),i.dismiss("cancel")}},$uibModal:n})});var e=a("form.layui-form"),t=(e.find('input[name="isSize"]'),e.find('input[name="selectSize"]')),l=t.parent().parent(),m=e.find('input[name="imageWidth"]'),s=m.parent().parent(),r=e.find('input[name="imageHeight"]'),u=r.parent().parent(),c=!0;u.hide(),layui.use(["form","layedit","laydate"],function(){function e(){0==c?(u.show(),s.hide()):(u.hide(),s.show())}var a=layui.form();layui.layer,layui.layedit,layui.laydate;a.on("radio",function(a){//
var i=a.elem.name,t=a.value;"isSize"==i?"no"==t?(l.hide(),s.hide(),u.hide()):(l.show(),e()):"selectSize"==i&&(c="no"!=t,e())})})})}})},updateData:function(){}}});