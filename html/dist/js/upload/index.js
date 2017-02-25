define(["app","jquery","form"],function(a,e){return{init:function(a){a.$uibModal;a.$uibModal.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",
//windowTemplateUrl : '../../template/common/window.html',
//template : 'asdfsadf',
templateUrl:"../template/upload/pop.html",size:"normal",controller:function(e,n,l,t,i){e.dataList=a.data;var o=/\.(exe|rar|zip|tar|gz|dll)$/;angular.extend(e,{uploadPic:function(e){e&&e.name.search(o)<0?a.data.event(e,n):layui.use(["layer"],function(){var a=layui.layer;a.alert("请上传正确的文件格示。",{skin:"layui-layer-molv",title:"上传失败",anim:1,btn:["确定"],shadeClose:!0},function(e){//确定
a.close(e)})})},close:function(){n.dismiss("cancel")}})}})},close:function(){},updateData:function(){}}});