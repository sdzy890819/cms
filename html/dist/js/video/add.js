define(["app","./addForm","../upload/index","../data/getData","../upload/angular-file-upload/index","../data/URL","form","position","fixedNav","uploadify"],function(app,list,upload,getData,uploadify,URL){app.directive("videoAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function($scope,Upload,$uibModal,$state){$scope.title="上传视频",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{save:function(obj){var $dom=$(".layui-box.layui-upload-button"),videoUrl=$dom.attr("video-url"),fileName=$dom.attr("filename");getData.video.createVideo({videoTitle:obj.videoTitle,videoDesc:obj.videoDesc,videoUrl:videoUrl,fileName:fileName,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$state.go("video.list")})}})}}),$scope.formdata={title:$scope.title,list:list,submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"清空",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]},$scope.$on("formRepeat",function(){$(".layui-upload-button").unbind().click(function(){uploadify.init({data:{obj:{},title:"上传视频",name:"请选择视频",type:"video",event:function(file,$uibModalInstance){$scope.imageInfo=file,$uibModalInstance.dismiss("cancel")}},$uibModal:$uibModal})})})}}})});