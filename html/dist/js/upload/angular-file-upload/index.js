define(["app","jquery","../../data/URL","../../data/getData"],function(app,$,URL,getData){return{init:function(obj){obj.$uibModal,obj.$uibModal.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"../template/upload/videoPop.html",size:"normal",controller:function($scope,$uibModalInstance,$css,$timeout,FileUploader){var isUpload=!0,fileName=null,size=0;angular.extend($scope,{close:function(){$uibModalInstance.dismiss("cancel")},submit:function(obj){1==isUpload&&(isUpload=!1,obj.upload())},cancel:function(){$(".fileUpload").val(""),isUpload||getData.upload.cancelVideo({fileName:fileName,callback:function(_data){$(".videoPop .progress1").css({width:"0.01%"}),$(".videoPop .progress2").css({width:"0.01%",transitionDuration:".3s"})}})}});var uploader=$scope.uploader=new FileUploader({url:URL.video.uploadVideo2,method:"post"});uploader.filters.push({name:"customFilter",fn:function(item,options){return fileName=item.name,size=item.size,uploader.queue.shift(),this.queue.length<10}}),uploader.onAfterAddingFile=function(fileItem){$(".filename").empty().append(fileItem._file.name)},uploader.onProgressItem=function(fileItem,progress){$(".videoPop .progress1").css({width:progress+"%"})},uploader.onProgressAll=function(progress){$(".videoPop .progress1").css({width:progress+"%"}),$(".videoPop .progress2").css({width:"90%",transitionDuration:"100s"})},uploader.onErrorItem=function(fileItem,response,status,headers){layui.use(["layer"],function(){var layer=layui.layer;layer.msg("上传失败！"),setTimeout(function(){$scope.close()},300)})},uploader.onCompleteItem=function(fileItem,response,status,headers){obj.obj&&obj.obj.success&&obj.obj.success(fileItem,response,status,headers);var $dom=$(".layui-box.layui-upload-button"),videoMsg="<span class='layui-upload-icon ng-binding ng-scope'>"+response.data.fileName+"</span>";$dom.attr("video-url",response.data.location),$dom.attr("filename",response.data.fileName),$dom.empty().append(videoMsg)},uploader.onCompleteAll=function(){$(".videoPop .progress2").css({width:"500px",transitionDuration:"10s"}),layui.use(["layer"],function(){var layer=layui.layer;layer.msg("上传成功！"),isUpload=!0,setTimeout(function(){$scope.close()},300)})}}})}}});