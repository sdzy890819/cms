define(["app","require","../data/getInitInfo"],function(e,t,i){return["$state",function(e){layui.use(["form","layedit","laydate"],function(){var t=layui.form(),a=layui.layer;layui.layedit,layui.laydate;t.verify({title:function(e){if(e.length<1)return"请输入用户名"}}),t.on("submit(demo2)",function(t){return i.login({data:t.field,callback:function(t){0==t.code?e.go("home.welcome"):a.msg("登录失败，请检查用户名密码")}}),!1})})}]});