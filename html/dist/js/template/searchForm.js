define(["../data/getData","../moduls/Tool"],function(e,t){function a(e){var a=e.self;"select"==a.type&&a.select[0][0].title==e.title&&(a.select[0]=[a.select[0][0]],a.select[0]=a.select[0].concat(t.changeObjectName(e.data.data,[{name:e.changeName,newName:"name"}])))}function n(t){e.channel.listChannel({//系列专题是。topicColumn
callback:function(e){$.each(c,function(t,n){"array"==$.type(n)?$.each(n,function(){a({self:this,//对像本身
title:"channelId",//需要添加到arr的，title名称
data:e,//数据
changeName:"channelName"})}):a({self:this,title:"channelId",data:e,changeName:"channelName"})}),t(c)}})}var c=[//表单
{title:"condition",name:"检索关键字",placeholder:"请输入关键字",type:"text"},{title:"channelId",selectName:["channelId"],name:"频道分类",type:"select",select:[[{name:"请选择频道分类",title:"channelId"}]]}];return n});