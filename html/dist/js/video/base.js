define(["app","./baseForm","../data/getData","form","position","fixedNav"],function(a,e,t){a.directive("videoBase",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(a,i){a.title="视频基础信息",a.$parent.menu.push({name:a.title}),a.save=function(e,i){void 0!=a.data.id?t.video.updateVideoBase({id:a.data.id,baseUrl:e.baseUrl,basePath:e.basePath,callback:function(a){layui.use(["layer"],function(){layui.layer.msg(a.message)})}}):t.video.createVideoBase({baseUrl:e.baseUrl,basePath:e.basePath,callback:function(a){layui.use(["layer"],function(){layui.layer.msg(a.message)})}})},t.video.videoBase({callback:function(t){a.formdata={title:a.title,list:e,submit:[{name:"保存",evt:"save",icon_cls:"save"}]},a.data=t.data}})}}})});