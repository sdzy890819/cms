define(["app","jquery","./common/textEdit","./moduls/directive"],function(app,$,textEdit){layui.link("js/plug/layui/css/layui.css"),app.directive("formHorizontal",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/form.html",scope:{formdata:"=formdata",edit:"=edit",titelement:"=titelement",data:"=data"},controller:function($scope,$state,$element,$rootScope,$uibModal,$css,$timeout){var icon={add:"plus",save:"save",view:"eye-open",del:"trash",upload:"upload-alt",magnet:"magnet",ok:"ok",cancel:"minus-sign"};$scope.$css=$css,$scope.$uibModal=$uibModal,angular.extend($scope,{isArray:function(value){return angular.isArray(value)},selectDate:function($event){layui.laydate({elem:$event.target,istime:!0,format:"YYYY-MM-DD hh:mm:ss",festival:!0})},close:function(){$scope.$parent.close()},submit:function(evt,obj,$event){evt(obj,$event.target)},inputNum:1,addInput:function(obj,index){var firstArr,lastArr,num=$scope.inputNum+1;return name=obj.name.match(/\d+$/),title=obj.title.replace(obj.title.match(/\d+$/)[0],""),$.each($scope.formdata.list,function(i,_obj){_obj.num==$scope.inputNum&&(firstArr=$scope.formdata.list.slice(0,i+1),lastArr=$scope.formdata.list.slice(i+1))}),$scope.inputNum<obj.inputMaxNum?(name?name=obj.name.replace(name[0],""):name=obj.name,obj.name=name+obj.num,firstArr.push({title:title+num,name:name+num,placeholder:"请输入扩展字段内容",num:num,inputMaxNum:obj.inputMaxNum,type:obj.type}),$scope.formdata.list=firstArr.concat(lastArr),void("$apply"!=$scope.$root.$$phase&&"$digest"!=$scope.$root.$$phase&&$scope.$apply())):void layui.use("layer",function(){layui.layer.msg("扩展字段只能添加"+(num-1)+"条",{icon:2,anim:6})})},delInput:function(obj,index){var firstArr=$scope.formdata.list.slice(0,index+1),lastArr=$scope.formdata.list.slice(index+1),name=obj.name.match(/\d+$/),title=obj.title.replace(obj.title.match(/\d+$/)[0],"");obj.num;name=name?obj.name.replace(name[0],""):obj.name,firstArr.pop(),$.each(lastArr,function(i,_obj){this.inputMaxNum&&(this.num--,this.title=title+this.num,this.name=name+this.num)}),$scope.formdata.list=firstArr.concat(lastArr),"$apply"!=$scope.$root.$$phase&&"$digest"!=$scope.$root.$$phase&&$scope.$apply()}}),$scope.$watch(function(){return $scope.formdata},function(){if($scope.formdata){$.each($scope.formdata.submit,function(){this.icon_cls=icon[this.icon_cls]});var inputNum=0;return $.each($scope.formdata.list,function(){"edit"==this.type?($scope.editorContent="",$css.add("../../wangEditor/dist/css/wangEditor.css"),textEdit.init($scope,{callback:function(editor){}})):this.inputMaxNum&&inputNum++}),void($scope.inputNum=inputNum)}},!0)},link:function($scope,element,arrt,controller){$(element[0]);$scope.selects=[],layui.use(["form","layedit","laydate"],function(){var form=layui.form();layui.layer,layui.layedit,layui.laydate;angular.extend($scope,{formRepeat:function(){function setType(){var self=this;if("date"==this.type)layui.use("laydate",function(){});else if("file"==this.type);else if("upload"==this.type)layui.use("upload",function(){self.callback&&self.callback(layui)});else if("edit"==this.type){var html=$(".wangEditor").attr("data-html");!function setHtml(){window.Editor?window.Editor.$txt.html(html):setTimeout(setHtml,100)}()}}function getSelect(_obj){var self=this;$.each(self.select,function(j,arr){if(arr[0].title==_obj.elem.name){var obj=arr[_obj.elem.selectedIndex];if(obj.title=_obj.elem.name,$scope.selects.length){var b=!1;$.each($scope.selects,function(k,select){_obj.elem.name;select.title==_obj.elem.name&&(b=!0,$scope.selects[k]=obj)}),b||$scope.selects.push(obj)}else $scope.selects.push(obj);if(obj.name.indexOf("请选择")>-1)return;self.callback&&self.callback({obj:obj,index:_obj.elem.selectedIndex,title:_obj.elem.name,name:_obj.name,callback:function(){form.render()}})}})}$.each($scope.formdata.list,function(i,obj){"array"==$.type(obj)?$.each(obj,function(){setType.call(this)}):setType.call(this)}),form.render(),form.verify({useless:function(value){},title:function(value){if(value.length<1)return"请填写所有必填项!"},userName:function(value){if(value.length<5)return"用户名至少为5个字符串"},password:function(value){if(value.length<6)return"密码至少为6个字符串"},image:function(value){if(value.length<1)return"请上传图片"},imageTitle:function(value){if(value.length<1)return"请填写图片标题"},http:function(value){var reg=/^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;if(value.search(reg)<0)return"请输入正确的域名（例：http://www.xy.com）"},path:function(value){},select:function(value,ele){if(value.indexOf("请选择")>-1&&0==ele.parentNode.selectedIndex)return value},html:function(value){var reg=/^\w+\.html/;if(value.search(reg)<0)return"请输入正确文件名（例：index.html）"},channelPath:function(value){if(value.length<1)return"请输入绝对路径"}}),form.on("submit(demo1)",function(data){var event=$(data.elem).attr("data-event");if(window.Editor){var html=Editor.$txt.html(),text=Editor.$txt.text(),formatText=Editor.$txt.formatText();data.field.html=html,data.field.text=text,data.field.formatText=formatText}return data.field.selects=$scope.selects,$scope.$parent[event](data.field),!1}),form.on("select",function(_obj){$.each($scope.formdata.list,function(i,obj){"array"==$.type(obj)?$.each(obj,function(){"select"==this.type&&getSelect.call(this,_obj)}):"select"==this.type&&getSelect.call(this,_obj)})})},selectRpeatDone:function(){setTimeout(function(){form.render("select")},100)},checkboxRpeatDone:function(){setTimeout(function(){form.render("checkbox")},100)},radioRpeatDone:function(){setTimeout(function(){form.render("radio")},100)}})})}}})});