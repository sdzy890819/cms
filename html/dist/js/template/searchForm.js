define(["../data/getData","../moduls/Tool"],function(getData,Tool){function setData(obj){var self=obj.self;"select"==self.type&&self.select[0][0].title==obj.title&&(self.select[0]=[self.select[0][0]],self.select[0]=self.select[0].concat(Tool.changeObjectName(obj.data.data,[{name:obj.changeName,newName:"name"}])))}function getList(callback){getData.channel.listChannel({callback:function(_data){$.each(list,function(i,obj){"array"==$.type(obj)?$.each(obj,function(){setData({self:this,title:"channelId",data:_data,changeName:"channelName"})}):setData({self:this,title:"channelId",data:_data,changeName:"channelName"})}),callback(list)}})}var list=[{title:"condition",name:"检索关键字",placeholder:"请输入关键字",type:"text"},{title:"channelId",selectName:["channelId"],name:"频道分类",type:"select",select:[[{name:"请选择频道分类",title:"channelId"}]]}];return getList});