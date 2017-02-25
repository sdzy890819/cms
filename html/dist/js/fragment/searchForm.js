define(["../data/getData","../moduls/Tool"],function(e,a){function t(e){var t=e.self;"select"==t.type&&t.select[0][0].title==e.title&&(t.select[0]=[t.select[0][0]],t.select[0]=t.select[0].concat(a.changeObjectName(e.data.data,[{name:e.changeName,newName:"name"}])))}function n(a){e.fragment.listClassify({//系列专题是。topicColumn
callback:function(e){$.each(l,function(a,n){"array"==$.type(n)?$.each(n,function(){t({self:this,//对像本身
title:"fragmentClassifyId",//需要添加到arr的，title名称
data:e,//数据
changeName:"classifyName"})}):t({self:this,title:"fragmentClassifyId",data:e,changeName:"classifyName"})}),a(l)}}),e.channel.listChannel({//系列专题是。topicColumn
callback:function(e){$.each(l,function(a,n){"array"==$.type(n)?$.each(n,function(){t({self:this,//对像本身
title:"channelId",//需要添加到arr的，title名称
data:e,//数据
changeName:"channelName"})}):t({self:this,title:"channelId",data:e,changeName:"channelName"})}),a(l)}})}var l=[//表单
{title:"condition",name:"检索关键字",placeholder:"请输入关键字",type:"text"},{title:"fragmentClassifyId",selectName:["fragmentClassifyId"],name:"碎片分类",type:"select",select:[[{name:"请选择碎片分类",title:"fragmentClassifyId"}]]},{title:"channelId",selectName:["channelId"],name:"频道分类",type:"select",select:[[{name:"请选择频道分类",title:"channelId"}]]}];return n});