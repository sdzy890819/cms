define(["../data/getData","../moduls/Tool"],function(t,e){function a(e){t.category.listCategory({//部门
callback:function(t){$.each(c,function(t,a){e(c)})}})}var c=[//表单
{title:"categoryName",name:"分类名",placeholder:"请输入分类名称",type:"text",//text textarea radio checkbox edit
verify:"title"},{title:"categoryDesc",name:"分类说明",type:"textarea",verify:"title"}];return a});