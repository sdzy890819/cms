define(["./URL","./loginAndOut","jquery","./getData"],function(URL,user,$,getData){if(!window.quanjing){var quanjing={user:null};window.quanjing=quanjing}var info={init:function(){info.getAllInfo()},login:function(obj){user.login({data:obj.data,callback:function(_data){$.ajax({url:URL.user.currentUser,type:"get",dataType:"json",success:function(_data){quanjing.user=_data,obj.callback(_data)}})}})},loginOut:function(){user.loginOut()},getUserInfo:function(obj){return obj.callback&&obj.callback()},getPublicData:function(callback){$.ajax({url:URL.data.all,type:"get",success:function(_data){quanjing.all=_data,callback&&callback(_data)},error:function(){}})},getAllInfo:function(callback){info.getUserInfo(function(){info.getPublicData(callback)})}};return info});