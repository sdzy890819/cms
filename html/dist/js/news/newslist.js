define(["require","app","jquery","search","./searchForm","./addForm","../common/editPop","../data/getData","../moduls/Tool","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(e,t,a,n,i,l,c,s,o){t.directive("newsList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(t,n,d,u,r,m){function h(e,t){return e.title.length>255?(layui.use("layer",function(){layui.layer.msg("标题不能超过255个字符!",{icon:2,anim:6})}),!1):e.subTitle.length>255?(layui.use("layer",function(){layui.layer.msg("附标题不能超过255个字符!",{icon:2,anim:6})}),!1):e.keyword.length>255?(layui.use("layer",function(){layui.layer.msg("关键字不能超过255个字符!",{icon:2,anim:6})}),!1):e.author.length>255?(layui.use("layer",function(){layui.layer.msg("来源不能超过255个字符!",{icon:2,anim:6})}),!1):e.stock.search(/[^\d]/)>-1||e.stock.length>6?(layui.use("layer",function(){layui.layer.msg("请输入正确的股票代码!",{icon:2,anim:6})}),!1):e.description.length>500?(layui.use("layer",function(){layui.layer.msg("描述不能超过500个字符!",{icon:2,anim:6})}),!1):e.html.length>65535?(layui.use("layer",function(){layui.layer.msg("内容不能超过65535个字符!",{icon:2,anim:6})}),!1):e.field1.length>255?(layui.use("layer",function(){layui.layer.msg("扩展字段不能小于255位数!",{icon:2,anim:6})}),!1):e.field2&&e.field2.length>255?(layui.use("layer",function(){layui.layer.msg("扩展字段不能小于255位数!",{icon:2,anim:6})}),!1):e.field3&&e.field3.length>255?(layui.use("layer",function(){layui.layer.msg("扩展字段不能小于255位数!",{icon:2,anim:6})}),!1):e.field4&&e.field4.length>255?(layui.use("layer",function(){layui.layer.msg("扩展字段不能小于255位数!",{icon:2,anim:6})}),!1):!(e.field5&&e.field5.length>255)||(layui.use("layer",function(){layui.layer.msg("扩展字段不能小于255位数!",{icon:2,anim:6})}),!1)}function f(e){var n=[{name:"文章ID",key:"id",width:"50"},{name:"所属栏目",key:"channelAndColumnName",width:"70"},{name:"标题",key:"title"},{name:"作者",key:"author",width:"40",class:"center"},{name:"发布人",key:"buildUserName",width:"55",class:"center"},{name:"修改人",key:"lastModifyUserName",width:"55",class:"center"},{name:"媒体来源",key:"source",width:"80",class:"center"},{name:"发布时间",key:"buildTimeStr",width:"80",class:"center"},{name:"修改时间",key:"updateTimeStr",width:"80",class:"center"},{name:"状态",key:"publishStr",width:"50",class:"center"},{name:"操作",width:"40",class:"center"},{name:"预览",width:"50",class:"center"},{name:"权限",width:"40",class:"center"}];a.each(e.data.list,function(e,t){t.channelAndColumnName=[t.channelName,t.columnName].join("-"),o.getByteLen(t.author)>6&&(t.author=o.getByteVal(t.author,6))}),t.listdata={title:t.title+"（共"+e.data.page.count+"条数据）",table:{select:!0,th:n,td:r.setArr(e.data.list,n),edit:[{cls:"",name:"编辑",evt:t.edit},{cls:"",name:" 推荐",evt:t.recommend}],edit1:[{cls:"",name:"发布",evt:t.publish},{cls:"zoom_in",name:"预览",href:"/webapi/news/preview/"}],permission:[{cls:"del",name:" 撤销",evt:t.rescind},{cls:"del",name:"删除",evt:t.del}]}},a.each(t.listdata.table.td,function(e,t){t.publish&&(t.list[2].href=t.url)}),r.extendType(t.listdata.table.td,n,["width","name","key"]),r.extendChild(t.listdata.table.td,t.listdata.table.edit,"edit"),r.extendChild(t.listdata.table.td,t.listdata.table.edit1,"edit1"),r.extendChild(t.listdata.table.td,t.listdata.table.permission,"permission"),t.$apply()}function y(){t.isSearch=!1,s.news.newslist({page:g,pageSize:20,callback:function(e){t.page=e.data.page,t.page.jump=function(e){g!=e.curr&&(g=e.curr,y())},f(e)}})}t.title="新闻列表",t.$parent.menu.push({name:t.title}),angular.extend(t,{isSearch:!1,getNewList:function(){t.isSearch?t.getSearchList():y()},edit:function(e){function n(n,i){s.news.newsdetail({id:e.id,callback:function(e){function l(t){if("selectSize"==t.type&&e.data.columnIds&&e.data.columnIds.length){t.toSelect=o.changeObjectName(e.data.columnIds,[{name:"val",newName:"id"},{name:"title",newName:"name"}]);var n=t.toSelect.slice(0),i=!0,l=[];n.length&&(a.each(t.fromSelect,function(e,t){i=!0;for(var a=0;a<n.length;a++)if(n[a].id==t.id){i=!1;break}1==i&&l.push(t)}),t.fromSelect=l)}}if(e.data.timer?e.data.writeTime=new Date(e.data.timer).format("yyyy-MM-dd h:m:s"):e.data.writeTime="",e.data.editPublishTime&&(e.data.editPublishTime=new Date(e.data.editPublishTime).format("yyyy-MM-dd h:m:s")),e.data.timer&&(e.data.timer=new Date(e.data.timer).format("yyyy-MM-dd h:m:s")),i){var c,d,u,r,m,h,f,y=2;for(a.each(i,function(n,y){"field1"==y.title?(d=y.title.replace(y.title.match(/\d+$/)[0],""),u=y.name.match(/\d+$/),u=u?y.name.replace(u[0],""):y.name,r=y.inputMaxNum,m=y.type,h=i.slice(0,n+1),f=i.slice(n+1),c=y.inputMaxNum+1):"select"==y.type&&(s.channel.currentChannelList({categoryId:e.data.categoryId,callback:function(e){var a=[y.select[1][0]];y.select[1]=a,y.select[1]=y.select[1].concat(o.changeObjectName(e.data,[{name:"channelName",newName:"name"}])),t.$apply()}}),s.news.newscolumnlist({channelId:e.data.channelId,callback:function(e){var a=[y.select[2][0]];y.select[2]=a,y.select[2]=y.select[2].concat(o.changeObjectName(e.data,[{name:"columnName",newName:"name"}])),t.$apply()}})),"array"==a.type(y)?a.each(y,function(e,t){l(t)}):l(y)});y<c;y++)e.data["field"+y]&&h.push({title:d+y,name:u+y,placeholder:"请输入扩展字段内容",num:y,inputMaxNum:r,type:m});n(h.concat(f))}else n(e)}})}e.size="news",c.init({obj:e,list:l,updateData:n,noclose:!0,save:function(e,n,i){if(h(e)){var l=n.channelId,c=n.columnId,d=n.categoryId,u="[";e.selectSizeChoose?(e.selectSizeChoose=o.changeObjectName(e.selectSizeChoose,[{name:"id",newName:"val"},{name:"name",newName:"title"}]),a.each(e.selectSizeChoose,function(e,t){u+='{"title":"'+t.title+'","val":"'+t.val+'"},'}),u=u.substr(0,u.length-1),u+="]"):n.columnIds?(a.each(n.columnIds,function(e,t){u+='{"title":"'+t.title+'","val":"'+t.val+'"},'}),u=u.substr(0,u.length-1),u+="]"):u=null,a.each(e.selects,function(){"channelId"==this.title&&(l=this.id),"columnId"==this.title&&(c=this.id),"categoryId"==this.title&&(d=this.id)});var r=(new Date).valueOf();new Date(e.timer).valueOf()<r?alert("发布时间必须大于当前时间"):s.news.updateNews({id:n.id,title:e.title,subTitle:e.subTitle,keyword:e.keyword,description:e.description,source:e.source,author:e.author,channelId:l,columnId:c,columnIds:u,categoryId:d,content:e.html,autoPublish:"yes"==e.show?1:0,timer:e.timer,editPublishTime:e.editPublishTime,field1:e.field1,field2:e.field2,field3:e.field3,field4:e.field4,field5:e.field5,stockCode:e.stock,callback:function(e){i.dismiss("cancel"),layui.use(["layer"],function(){layui.layer.msg(e.message),t.getNewList()})}})}},callback:function(e,i){a.each(e,function(e,a){"content"==a.title&&(a.width="1000px"),"select"==a.type&&(a.callback=function(e){e.obj.name.indexOf("请选择")>-1||("categoryId"==e.title?s.channel.currentChannelList({categoryId:e.obj.id,callback:function(n){var i=[a.select[1][0]];a.select[1]=i,a.select[1]=a.select[1].concat(o.changeObjectName(n.data,[{name:"channelName",newName:"name"}])),a.select[2]=[a.select[2][0]],t.$apply(),e.callback()}}):"channelId"==e.title&&s.news.newscolumnlist({channelId:e.obj.id,callback:function(n){var i=[a.select[2][0]];a.select[2]=i,a.select[2]=a.select[2].concat(o.changeObjectName(n.data,[{name:"columnName",newName:"name"}])),t.$apply(),e.callback()}}))})}),n(function(e){i(e)},e)},$uibModal:d})},rescind:function(e){e.callback=function(n){layui.use(["layer"],function(){layui.layer.msg(n.message),0==n.code&&(a("table").find("tr[data-id="+e.id+"]").hide(),t.getNewList())})},n.alert({text:'您确定要撤销"'+e.title+'"吗',btn:["确定","取消"],fn:function(){s.news.rescind(e)}})},recover:function(e){e.callback=function(t){layui.use(["layer"],function(){layui.layer.msg(t.message),0==t.code&&a("table").find("tr[data-id="+e.id+"]").hide()})},n.alert({text:'您确定要恢复"'+e.title+'"吗',btn:["确定","取消"],fn:function(){s.news.recover(e)}})},preview:function(e){s.news.preview(e)},recommend:function(t){var n=t.id;e(["./recommendForm"],function(e){c.init({obj:t,$uibModal:d,list:e,updateData:function(e){s.news.recommendNewsInfo({id:t.id,callback:function(t){e(t)}})},save:function(e,t){var i=t.recommendColumnId;a.each(e.selects,function(){"recommendColumnId"==this.title&&(i=this.id)}),void 0!=i?s.news.recommend({id:n,recommendTitle:e.recommendTitle,recommendDescription:e.recommendDescription,recommendImages:e.recommendImages,recommendColumnId:i,sort:e.sort,callback:function(e){layui.use(["layer"],function(){layui.layer.msg(e.message)})}}):alert("请选择推荐栏目")},callback:function(e,t){t(e)}})})},info:function(e){n.alert({text:"去相关页面，因为还没有页面所以这样提示：<br>ID为："+e.id,btn:["确定","取消"]})},del:function(e){e.callback=function(t){layui.use(["layer"],function(){layui.layer.msg(t.message),0==t.code&&a("table").find("tr[data-id="+e.id+"]").hide()})},n.alert({text:'您确定要删除"'+e.title+'"吗',btn:["确定","取消"],fn:function(){s.news.delNews(e)}})},publish:function(e){e.callback=function(e){layui.use(["layer"],function(){layui.layer.msg(e.message)})},n.alert({text:'您确定要发布"'+e.title+'"吗',btn:["确定","取消"],fn:function(){s.news.publish(e)}})}}),t.navEdit={list:[{name:"批量删除",event:function(e,a,i){a.delAll(function(e){n.alert({text:"您确定要批量删除选择的新闻吗",btn:["确定","取消"],fn:function(){s.news.deletes({ids:e,callback:function(e){layui.use(["layer"],function(){layui.layer.msg(e.message),0==e.code&&(t.isSearch?t.getSearchList():y())})}})}})})},cls:"red",icon_cls:"remove"},{name:"批量撤销",event:function(e,a,i){a.delAll(function(e){n.alert({text:"您确定要批量撤销选择的新闻吗",btn:["确定","取消"],fn:function(){s.news.rescinds({ids:e,callback:function(e){layui.use(["layer"],function(){layui.layer.msg(e.message),0==e.code&&(t.isSearch?t.getSearchList():y())})}})}})})},cls:"red",icon_cls:"remove"},{name:"批量发布",event:function(e,a,i){a.delAll(function(e){n.alert({text:"您确定要批量发布选择的新闻吗",btn:["确定","取消"],fn:function(){s.news.publishes({ids:e,callback:function(e){layui.use(["layer"],function(){layui.layer.msg(e.message),0==e.code&&(t.isSearch?t.getSearchList():y())})}})}})})},cls:"red",icon_cls:"remove"}]},i(function(e){a.each(e,function(e,a){"select"==a.type&&(a.callback=function(e){"categoryId"==e.title?s.channel.currentChannelList({categoryId:e.obj.id,callback:function(n){var i=[a.select[1][0]];a.select[1]=i,a.select[1]=a.select[1].concat(o.changeObjectName(n.data,[{name:"channelName",newName:"name"}])),t.$apply(),e.callback()}}):"channelId"==e.title&&s.news.newscolumnlist({channelId:e.obj.id,callback:function(n){var i=[a.select[2][0]];a.select[2]=i,a.select[2]=a.select[2].concat(o.changeObjectName(n.data,[{name:"columnName",newName:"name"}])),t.$apply(),e.callback()}})})}),t.searchform={list:e,return:function(){t.searchform.search=null,g=1,searchPage=1,t.$$childHead.current=1,y()},submit:function(e,n){function i(){s.search.searchNew({newsId:e.newsId,buildUserName:e.buildUserName,lastModifyUserName:e.lastModifyUserName,condition:e.condition,author:e.author,source:e.source,categoryId:o,channelId:l,columnId:c,platform:e.platform,startTime:e.startTime,endTime:e.endTime,publish:d,delTag:1,page:u,pageSize:20,callback:function(a){t.page=a.data.page,t.page.jump=function(e){u!=e.curr&&(u=e.curr,i())},t.searchform.search={count:a.data.page.count,name:e.condition},f(a)}})}t.isSearch=!0;var l,c,o,d,u=1;a.each(e.selects,function(){"channelId"==this.title&&(l=this.id),"columnId"==this.title&&(c=this.id),"categoryId"==this.title&&(o=this.id),"publish"==this.title&&(d=this.id)}),i(),t.getSearchList=i}},setTimeout(function(){var e=a('.layui-form input[name="condition"');a("<br>").insertBefore(e.parent().parent())},300)});var g=1;y()},link:function(e,t){}}})});