define(["app","../data/getData","./form","form","position","fixedNav"],function(e,n,a){e.directive("channelAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e,t){e.title="新增专题",e.$parent.menu.push({name:e.title}),e.save=function(e){var a;$.each(e.selects,function(){"categoryId"==this.title&&(a=this.id)}),n.channel.createChannel({categoryId:a,channelName:e.channelName,channelPath:e.channelPath,channelUrl:e.channelUrl,templatePath:e.templatePath,channelDesc:e.channelDesc,callback:function(e){layui.use(["layer"],function(){var n=layui.layer;n.msg(e.message),console.log(e),0==e.code&&t.go("channel.list")})}})},a(function(n){e.formdata={//确认按钮
title:"新增频道",list:n,submit:[/*{
										name : '保存',
										evt : 'save',
										icon_cls : 'save'
									},
									{
										name:'预览',
										evt : 'view',
										icon_cls : 'view'
									},*/
{name:"提交",evt:"save",icon_cls:"ok"},{name:"取消",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]},e.$apply()})}}})});