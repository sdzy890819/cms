define(["app","./addForm","../data/getData","../moduls/Tool","form","position","fixedNav"],function(app,getList,getData,Tool){app.directive("templateAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function($scope,$state){$scope.title="新增模版",$scope.$parent.menu.push({name:$scope.title}),$scope.rlease=function(obj){var templateClassify,channelId,selectID;if($.each(obj.selects,function(){"templateClassify"==this.title&&(templateClassify=this.type,selectID=this.id),"channelId"==this.title&&(channelId=this.id)}),3==selectID&&"定时生成"==obj.job)return void layui.use("layer",function(){layui.layer.msg("详情页模版只能使用触发生成!",{icon:2,anim:6})});getData.template.createTemplate({templateName:obj.templateName,templateDesc:obj.templateDesc,filename:obj.filename,path:obj.path,templateClassify:templateClassify,job:"定时生成"==obj.job?1:0,encoded:obj.encoded,channelId:channelId,sortNum:obj.sortNum,callback:function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),0==_data.code&&$state.go("template.list")})}})},getList(function(list){$scope.data={sortNum:1e3},$scope.formdata={title:$scope.title,list:list,submit:[{name:"确认发布",evt:"rlease",icon_cls:"ok"},{name:"清空",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]},$scope.$apply()})}}})});