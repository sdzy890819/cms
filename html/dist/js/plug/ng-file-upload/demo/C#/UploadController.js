!function(){"use strict";function UploadCtrl($location,$upload){var vm=this;vm.title="UploadCtrl",vm.onFileSelect=function($files,user){for(var i=0;i<$files.length;i++){var file=$files[i];vm.upload=$upload.upload({url:"Uploads/UploadHandler.ashx",data:{name:user.Name},file:file}).progress(function(evt){}).success(function(data,status,headers,config){alert("Uploaded successfully "+file.name)}).error(function(err){alert("Error occured during upload")})}}}angular.module("app").controller("UploadCtrl",UploadCtrl),UploadCtrl.$inject=["$location","$upload"]}();