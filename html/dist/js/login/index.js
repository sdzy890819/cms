define(["app","require","../data/getInitInfo"],function(i,t,a){return["$state",function(i){layui.use(["form","layedit","laydate"],function(){var t=layui.form(),e=layui.layer;layui.layedit,layui.laydate;
//自定义验证规则
t.verify({title:function(i){if(i.length<1)return"请输入用户名"}}),
//监听提交
t.on("submit(demo2)",function(t){return a.login({data:t.field,callback:function(t){0==t.code?i.go("home.main"):e.msg("登录失败，请检查用户名密码")}}),!1})})}]});