define(["../data/getData","../moduls/Tool"],function(getData,Tool){function getList(callback){getData.category.listCategory({callback:function(_data){$.each(list,function(i,obj){"select"==obj.type&&"categoryId"==obj.select[0][0].title&&(obj.select[0]=[obj.select[0][0]],obj.select[0]=obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:"categoryName",newName:"name"}])),callback(list))})}})}var list=[{title:"channelName",name:"频道名称",type:"text",placeholder:"请输入频道名称",verify:"title"},{title:"channelUrl",name:"频道域名",placeholder:"例如：http://www.p5w.net/",type:"text",verify:"title"},{title:"channelPath",name:"频道绝对路径",type:"text",placeholder:"例如：/data/publish ",verify:"channelPath"},{title:"templatePath",name:"模板位置",placeholder:"例如/data/template",type:"text",verify:"title"},{title:"channelDesc",name:"频道说明",placeholder:"请输入频道说明",type:"textarea",verify:"title"},{title:"category",name:"部门分类",selectName:["categoryId"],type:"select",verify:"select",select:[[{name:"请选择部门分类",title:"categoryId"}]]}];return getList});