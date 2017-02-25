define(["require","app","jquery","/js/moduls/Tool.js"],function(e,t,n,i){t.directive("search",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{list:"=list"},templateUrl:"../template/common/search.html",controller:function(e,t,n,i,l,c){},link:function(e,t){e.selects=[],layui.use(["form","layedit","laydate"],function(){var t=layui.form();layui.layer,layui.layedit,layui.laydate;angular.extend(e,{selectDate:function(e){layui.laydate({elem:e.target,istime:!0,format:"YYYY-MM-DD hh:mm:ss",festival:!0})},return:function(){e.list.return()},formRepeat:function(){function i(i){//获取选择匡的option
var l=this;n.each(l.select,function(c,a){if(a[0].title==i.elem.name){//请选择部门
var r=a[i.elem.selectedIndex];if(
//obj.elem = _obj;
r.title=i.elem.name,e.selects.length){var s=!1;n.each(e.selects,function(t,n){i.elem.name;n.title==i.elem.name&&(s=!0,e.selects[t]=r)}),s||e.selects.push(r)}else e.selects.push(r);if(r.name.indexOf("请选择")>-1)return;l.callback&&l.callback({obj:r,index:i.elem.selectedIndex,title:i.elem.name,name:i.name,callback:function(){t.render()}})}})}//全局更新
t.render(),//更新全部
//自定义验证规则
t.verify({title:function(e){if(e.length<1)return"内容至少得1个字符啊"},http:function(e){var t=/^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;if(e.search(t)<0)return"请输入正确的域名（例：http://www.xy.com）"},path:function(e){
//var reg = /^\/+([A-Za-z]{1}\/[\w\/]*)?\w+\/{1}[a-zA-Z]+$/;
var t=/^[\/|\w|\d]+\/{1}[\w|\d]{1}[\/|\w|\d]+$/;if(e.search(t)<0)return"请输入正确的路经（例：xy/xy）"},select:function(e,t){if(e.indexOf("请选择")>-1&&0==t.parentNode.selectedIndex)return e},html:function(e){var t=/^\w+\.html/;if(e.search(t)<0)return"请输入正确文件名（例：index.html）"}}),t.on("submit(searchForm)",function(t){var i=!1;return n.each(t.field,function(e,t){t.length&&t.indexOf("请选择")<0&&(i=!0)}),i?(t.field.selects=e.selects,e.list.submit(t.field,t),!1):(layui.use("layer",function(){var e=layui.layer;e.msg("请至少填写一项",{icon:2,anim:6})}),!1)}),t.on("select",function(t){//select点击时，需单独处理，可能会存在多个select
n.each(e.list.list,function(e,n){"select"==this.type&&i.call(this,t)})})},selectRpeatDone:function(){//更新 select
setTimeout(function(){t.render("select")},100)},checkboxRpeatDone:function(){//更新 checkbox
setTimeout(function(){t.render("checkbox")},100)},radioRpeatDone:function(){//更新 radio
setTimeout(function(){t.render("radio")},100)}})})}}})});