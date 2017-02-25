define(["app","jquery","../../data/URL"],function(o,i,e){return{init:function(o){o.$uibModal,o.$uibModal.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",
//windowTemplateUrl : '../../template/common/window.html',
//template : 'asdfsadf',
templateUrl:"../template/upload/videoPop.html",size:"lg",controller:function(o,n,t,s,r){o.isUpload=!0,angular.extend(o,{close:function(){n.dismiss("cancel")},uploadSubmit:function(){},submit:function(o){}});var l=o.uploader=new r({url:e.video.uploadVideo2,method:"post"});
// FILTERS
l.filters.push({name:"customFilter",fn:function(o,i){return this.queue.length<10}}),l.onAfterAddingFile=function(i){o.$apply()},l.onProgressItem=function(o,e){//进行中
i(".videoPop .progress1").css({width:e+"%"})},l.onProgressAll=function(o){//成功
i(".videoPop .progress1").css({width:o+"%"}),i(".videoPop .progress2").css({width:"90%",transitionDuration:"600s"})},l.onErrorItem=function(o,i,e,n){layui.use(["layer"],function(){var o=layui.layer;o.msg("上传失败！")})},l.onCompleteAll=function(){i(".videoPop .progress2").css({width:"100%",transitionDuration:"10s"}),layui.use(["layer"],function(){var i=layui.layer;i.msg("上传成功！"),isSubmit=!0,setTimeout(function(){o.close()},300)})}}})}}});