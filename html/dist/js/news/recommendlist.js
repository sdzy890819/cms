define(["require","app","jquery","search","./recommendlistForm","./recommendForm","../common/editPop","../data/getData","../moduls/Tool","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(e,t,n,a,i,c,o,l,r){t.directive("newsRecommendList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(e,t,a,r,m,d){function s(t){var a=[{name:"推荐名",key:"title"},{name:"推荐人",key:"recommendUserName"},{name:"推荐栏目",key:"recommendColumnName"},{name:"操作",width:"220",class:"center"}];e.listdata={title:e.title+"（共"+t.data.page.count+"条数据）",table:{select:!0,th:a,td:m.setArr(t.data.list,a),edit:[{cls:"edit",name:"修改推荐",evt:e.edit},{cls:"del",name:"取消推荐",evt:e.del}]}},n.each(e.listdata.table.td,function(e,t){t.url&&(t.list[0].href=t.url)}),m.extendType(e.listdata.table.td,a,["width","name","key"]),m.extendChild(e.listdata.table.td,e.listdata.table.edit,"edit"),e.$apply()}function u(){e.isSearch=!1,l.news.recommendList({page:f,pageSize:20,callback:function(t){e.page=t.data.page,e.page.jump=function(e){f!=e.curr&&(f=e.curr,u())},s(t)}})}e.title="推荐新闻列表",e.$parent.menu.push({name:e.title}),angular.extend(e,{isSearch:!1,getNewList:function(){e.isSearch?e.getSearchList():u()},edit:function(t){var i=t.id;o.init({obj:t,$uibModal:a,list:c,updateData:function(e){l.news.recommendNewsInfo({id:t.id,callback:function(t){e(t)}})},save:function(t,a){var c=a.recommendColumnId;n.each(t.selects,function(){"recommendColumnId"==this.title&&(c=this.id)}),void 0!=c?l.news.recommend({id:i,recommendTitle:t.recommendTitle,recommendDescription:t.recommendDescription,recommendImages:t.recommendImages,recommendColumnId:c,sort:t.sort,callback:function(t){layui.use(["layer"],function(){layui.layer.msg(t.message),0==t.code&&e.getNewList()})}}):alert("请选择推荐栏目")},callback:function(e,t){t(e)}})},del:function(n){n.callback=function(t){layui.use(["layer"],function(){layui.layer.msg(t.message),0==t.code&&e.getNewList()})},t.alert({text:'您确定要取消推荐吗"'+n.title+'"吗',btn:["确定","取消"],fn:function(){l.news.deleteRecommend(n)}})}}),i(function(t){e.searchform={list:t,return:function(){e.searchform.search=null,f=1,searchPage=1,e.$$childHead.current=1,u()},submit:function(t,a){function i(){l.news.recommendList({recommendColumnId:c,page:o,pageSize:20,callback:function(n){n.data.list=n.data.list||[],e.page=n.data.page,e.page.jump=function(e){o!=e.curr&&(o=e.curr,i())},e.searchform.search={count:n.data.page.count,name:t.condition},s(n)}})}e.isSearch=!0;var c,o=1;n.each(t.selects,function(){"recommendColumnId"==this.title&&(c=this.id)}),i(),e.getSearchList=i}}});var f=1;u()},link:function(e,t){}}})});