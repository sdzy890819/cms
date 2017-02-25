define(["app","./addForm","../upload/index","../data/getData","../upload/angular-file-upload/index","../data/URL","form","position","fixedNav","uploadify"],function(e,a,t,i,n,l){e.directive("videoAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e,t,l,o){e.title="上传视频",e.$parent.menu.push({name:e.title}),angular.extend(e,{save:function(e){//保存
var a=$(".layui-box.layui-upload-button"),t=a.attr("video-url"),n=a.attr("filename");i.video.createVideo({videoTitle:e.videoTitle,videoDesc:e.videoDesc,videoUrl:t,fileName:n,callback:function(e){layui.use(["layer"],function(){var a=layui.layer;a.msg(e.message),0==e.code&&o.go("video.list")})}})}}),e.formdata={//确认按钮
title:e.title,list:a,submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"清空",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]},/*$.each($scope.formdata.list,function( i , obj ){
					if(this.type=='upload'){
						this.callback = function(layui){
							layui.upload({
								elem : '.'+this.cls,
								url : URL.video.uploadVideo2,
								title: "视频上传",
								type : 'video',
								data : {
									fileName : 'asfsf'
								},
								method : 'POST',
								before : function(e){
								},
								success : function(){

								}
							});
						}
					}	
				});*/
e.$on("formRepeat",function(){$(".layui-upload-button").unbind().click(function(){n.init({data:{obj:{},title:"上传视频",name:"请选择视频",type:"video",event:function(a,t){e.imageInfo=a,t.dismiss("cancel")}},$uibModal:l})})})}}})});