define(["../data/getData","../moduls/Tool"],function(getData,Tool){function setData(obj){var self=obj.self,template2Classify=[];$.each(obj.data.templateClassify,function(i,o){"列表页"!=o.name&&"详情页"!=o.name||template2Classify.push(o)}),"select"==self.type?(self.select[0]=[self.select[0][0]],self.select[0]=self.select[0].concat(Tool.changeObjectName(template2Classify,[{name:"type",newName:"id"}]))):"radio"==self.type&&(self.radio=Tool.changeObjectName(obj.data.encoded,[{name:"name",newName:"title"}]),self.radio[0].checked=!0)}var list=[{title:"templateName",name:"模版名称",type:"text",placeholder:"请输模版名称",verify:"title"},[{title:"filename",name:"发布文件名",type:"text",placeholder:"例如:index.html",verify:"required"},{title:"path",name:"发布目录",placeholder:"例如：/list/",type:"text"}],{title:"templateClassify",selectName:["templateClassify"],name:"模版分类",type:"select",verify:"select",select:[[{name:"模版分类",title:"templateClassify"}]]},{title:"encoded",name:"编码",type:"radio",radio:[]}];return function(callback){getData.data.all({callback:function(_data){$.each(list,function(i,obj){"array"==$.type(obj)?$.each(obj,function(){setData({self:this,data:_data.data})}):setData({self:this,data:_data.data})}),callback(list)}})}});