define(["app","jquery","../data/getData","../moduls/factory","../moduls/directive"],function(t,a,e){return{init:function(t){var n=(t.$uibModal,t.list,t.obj.id);t.$uibModal.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"../template/template/relationPop.html",windowClass:"relationPopsuper",controller:function(l,i,o){l.initData=null,angular.extend(l,{titelement:{close:!0},save:function(a){//保存
t.save(a,l.data)},cancel:function(a){//取消
t.cancel(a,l.data)},close:function(){i.dismiss("cancel")},setTab:function(t,e,n){var l=(n.currentTarget,a(".relation-pop")),i=l.find(".title li"),o=l.find(".content .option");i.removeClass("current").eq(e).addClass("current"),o.hide().eq(e).show()},selectBox:function(t,a,l){var i=t.currentTarget,o=i.checked;1==o?e.template.createRelation({templateId:n,//模板ID
relationId:a.id,//当前选择的 栏目下的小栏目 的ID
relationType:l,//当前栏目ID
callback:function(){}}):e.template.delRelation({templateId:n,relationId:a.id,relationType:l,callback:function(){}})},recommendColumnlistDone:function(){//加载完
setTimeout(function(){var t=a(".relation-pop"),e=(t.find(".title li"),t.find(".content .option"));e.hide().eq(0).show()},200)}}),e.data.all({callback:function(t){l.tabs=t.data.relationType;var n=null;a.each(l.tabs,function(){n=this.type,1==n?e.news.relationColumnList({//新闻栏目
callback:function(t){l.relationColumnListData=t.data,l.$apply()}}):2==n?e.fragment.list({//所有碎片列表
callback:function(t){l.fragmentListData=t.data,l.$apply()}}):3==n?e.topic.topicClassifyList({//专题分类列表 接口
callback:function(t){l.topicClassifyListData=t.data,l.$apply()}}):4==n&&e.news.recommendColumnlist({//新闻推荐栏目列表 接口
alert:!1,callback:function(t){l.recommendColumnlistData=t.data,l.$apply()}})})}}),e.template.relation({templateId:n,relationType:0,//默认0 
callback:function(t){l.initData=t.data}})}})},updateData:function(){}}});