define(["../data/getData","../moduls/Tool"],function(getData,Tool){function getList(callback){getData.channel.listChannel({callback:function(_data){getData.pretemplate.listTemplate2list({callback:function(_data1){getData.pretemplate.listTemplate2detail({callback:function(_data2){$.each(list,function(i,obj){"column"==obj.title&&(obj.select[0]=[obj.select[0][0]],obj.select[0]=obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}]))),"array"==$.type(obj)&&$.each(obj,function(j,_obj){"listTemplate2Id"==_obj.title?(_obj.select[0]=[_obj.select[0][0]],_obj.select[0]=_obj.select[0].concat(Tool.changeObjectName(_data1.data,[{name:"templateName",newName:"name"}]))):"detailTemplate2Id"==_obj.title&&(_obj.select[0]=[_obj.select[0][0]],_obj.select[0]=_obj.select[0].concat(Tool.changeObjectName(_data2.data,[{name:"templateName",newName:"name"}])))})}),callback(list)}})}})}})}var list=[{title:"columnName",name:"栏目名",placeholder:"请输入栏目名称",type:"text",verify:"title"},{title:"keywords",name:"关键字",placeholder:"请输入栏目名称",type:"text"},{title:"description",name:"描述",placeholder:"描述",type:"textarea"},{title:"column",selectName:["channelId"],name:"请选择频道分类",type:"select",verify:"select",select:[[{name:"请选择频道分类",title:"channelId"}]]},[{title:"listTemplate2Id",selectName:["listTemplate2Id"],name:"第二套模版list",type:"select",select:[[{name:"请选择第二套模版list",title:"listTemplate2Id"}]]},{title:"detailTemplate2Id",selectName:["detailTemplate2Id"],name:"第二套模版detail",type:"select",select:[[{name:"请选择第二套模版detail",title:"detailTemplate2Id"}]]}]];return getList});