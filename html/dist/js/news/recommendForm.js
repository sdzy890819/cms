define(["../data/getData","../moduls/Tool"],function(getData,Tool){function getList(callback){getData.news.recommendColumnlist({callback:function(_data){$.each(list,function(i,obj){"select"==obj.type&&"recommendColumnId"==obj.select[0][0].title&&(obj.select[0]=[obj.select[0][0]],obj.select[0]=obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:"columnName",newName:"name"}])),callback(list))})}})}var list=[{title:"recommendColumnId",selectName:["recommendColumnId"],name:"选择推荐栏目",type:"select",verify:"select",select:[[{name:"请选择推荐栏目",title:"recommendColumnId"}]]},{title:"recommendTitle",name:"推荐标题",placeholder:"请输入推荐标题",type:"text",verify:"title"},{title:"recommendDescription",name:"描述",placeholder:"描述",type:"textarea",check:!1},{title:"recommendImages",name:"图片URL",placeholder:"图片URL",type:"text"}];return getList});