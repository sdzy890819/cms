define(["../data/getData","../moduls/Tool"],function(e,t){function l(l){e.channel.listChannel({//部门
callback:function(c){e.pretemplate.listTemplate2list({//第二套模版list
callback:function(n){e.pretemplate.listTemplate2detail({//第二套模版detail
callback:function(e){$.each(a,function(l,a){"column"==a.title&&(//填充select
a.select[0]=[a.select[0][0]],a.select[0]=a.select[0].concat(t.changeObjectName(c.data,[{name:"channelName",newName:"name"}]))),"array"==$.type(a)&&$.each(a,function(l,a){//填充select
"listTemplate2Id"==a.title?(a.select[0]=[a.select[0][0]],a.select[0]=a.select[0].concat(t.changeObjectName(n.data,[{name:"templateName",newName:"name"}]))):"detailTemplate2Id"==a.title&&(//填充select
a.select[0]=[a.select[0][0]],a.select[0]=a.select[0].concat(t.changeObjectName(e.data,[{name:"templateName",newName:"name"}])))})}),l(a)}})}})}})}var a=[//表单
{title:"columnName",name:"栏目名",placeholder:"请输入栏目名称",type:"text",//text textarea radio checkbox edit
verify:"title"},{title:"keywords",name:"关键字",placeholder:"请输入栏目名称",type:"text"},{title:"description",name:"描述",placeholder:"描述",type:"textarea"},{title:"column",selectName:["channelId"],name:"请选择频道分类",type:"select",verify:"select",select:[[{name:"请选择频道分类",title:"channelId"}]]},/*[
			{
				title : 'listId',
				selectName : ['listId'],
				name : '预模版list',
				type : 'select',
				select : [
					[
						{name:'请选择预模版list',title:'listId'}
					]
				]
			},
			{
				title : 'detailId',
				selectName : ['detailId'],
				name : '预模版detail',
				type : 'select',
				select : [
					[
						{name:'请选择预模版detail',title:'detailId'}
					]
				]
			}
		],*/
[{title:"listTemplate2Id",selectName:["listTemplate2Id"],name:"第二套模版list",type:"select",select:[[{name:"请选择第二套模版list",title:"listTemplate2Id"}]]},{title:"detailTemplate2Id",selectName:["detailTemplate2Id"],name:"第二套模版detail",type:"select",select:[[{name:"请选择第二套模版detail",title:"detailTemplate2Id"}]]}]];return l});