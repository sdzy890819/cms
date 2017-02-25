define(["app","./addForm","form","position","fixedNav"],function(e,t){e.directive("userchannelAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e){e.title="新增专题",e.$parent.menu.push({name:e.title}),t(function(t){
//debugger;
e.formdata={//确认按钮
title:"新增新闻",list:t,submit:[/*{
								name : '保存',
								evt : 'save',
								icon_cls : 'save'
							},
							{
								name:'预览',
								evt : 'view',
								icon_cls : 'view'
							},*/
{name:"确认发布",evt:"rlease",icon_cls:"ok"},{name:"取消",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]},e.$apply()})}}})});