define(["require","app","jquery","../data/getData","./classForm","../common/editPop","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(t,e,a,i,l,n){e.directive("topicClassList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(t,e,a,c,s,o){t.title="专题分类列表",t.$parent.menu.push({name:t.title}),angular.extend(t,{edit:function(t){n.init({obj:t,list:l,updateData:function(e){s.changeTypeName([t],[{name:"classifyName",newName:"name"}]),e({data:t})},save:function(e,a){i.topic.updateTopicClassify({id:t.id,name:e.name,callback:function(t){layui.use(["layer"],function(){layui.layer.msg(t.message),setTimeout(function(){o.reload()},300)})}})},callback:function(t,e){e(t)},$uibModal:a})},del:function(t){t.callback=function(t){layui.use(["layer"],function(){layui.layer.msg(t.message),setTimeout(function(){o.reload()},300)})},e.alert({text:"您确定要删除吗",btn:["确定","取消"],fn:function(){i.topic.delTopicClassify(t)}})}}),i.topic.topicClassifyList({callback:function(e){var a=[{name:"专题分类名称",key:"classifyName"},{name:"操作",width:"120",class:"center"}];t.listdata={title:t.title,table:{select:!0,th:a,td:s.setArr(e.data,a),edit:[{cls:"edit",name:"编辑",evt:t.edit},{cls:"del",name:"删除",evt:t.del}]}},s.extendChild(t.listdata.table.td,t.listdata.table.edit,"edit"),t.$apply()}})},link:function(t,e){}}})});