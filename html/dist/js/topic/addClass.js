define(["app","./classForm","../data/getData","form","position","fixedNav"],function(e,t,a){e.directive("topicAddClass",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e,c){e.title="新增分类",e.$parent.menu.push({name:e.title}),e.save=function(e){console.log(11),a.topic.createTopicClassify({name:e.name,callback:function(e){layui.use(["layer"],function(){layui.layer.msg(e.message),0==e.code&&c.go("topic.classList")})}})},e.formdata={title:e.title,list:t,submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"清空",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]}}}})});