define(["../data/getData","../moduls/Tool"],function(e,t){function a(a){e.category.listCategory({//专题分类
callback:function(e){$.each(l,function(c,n){"select"==n.type&&"categoryId"==n.select[0][0].title&&(n.select[0]=[n.select[0][0]],n.select[0]=n.select[0].concat(t.changeObjectName(e.data,[{name:"categoryName",newName:"name"}])),a(l))})}})}var l=[//表单
{title:"channelName",name:"频道名称",type:"text",//text textarea radio checkbox edit
placeholder:"请输入频道名称",verify:"title"},{title:"channelUrl",name:"频道域名",placeholder:"例如：http://www.p5w.net/",type:"text",//text textarea radio checkbox edit
verify:"title"},{title:"channelPath",name:"频道绝对路径",type:"text",placeholder:"例如：/data/publish ",verify:"channelPath"},{title:"templatePath",name:"模板位置",placeholder:"例如/data/template",type:"text",//text textarea radio checkbox edit			
verify:"title"},{title:"channelDesc",name:"频道说明",placeholder:"请输入频道说明",type:"textarea",//text textarea radio checkbox edit			
verify:"title"},{title:"category",name:"部门分类",selectName:["categoryId"],type:"select",verify:"select",select:[[{name:"请选择部门分类",title:"categoryId"}]]}];return a});