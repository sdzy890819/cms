!function(){function getTagType(el){return"img"===el.tagName.toLowerCase()?"image":"audio"===el.tagName.toLowerCase()?"audio":"video"===el.tagName.toLowerCase()?"video":/./}function linkFileDirective(Upload,$timeout,scope,elem,attr,directiveName,resizeParams,isBackground){function constructDataUrl(file){var disallowObjectUrl=Upload.attrGetter("ngfNoObjectUrl",attr,scope);Upload.dataUrl(file,disallowObjectUrl).finally(function(){$timeout(function(){var src=(disallowObjectUrl?file.$ngfDataUrl:file.$ngfBlobUrl)||file.$ngfDataUrl;isBackground?elem.css("background-image","url('"+(src||"")+"')"):elem.attr("src",src),src?elem.removeClass("ng-hide"):elem.addClass("ng-hide")})})}$timeout(function(){var unwatch=scope.$watch(attr[directiveName],function(file){var size=resizeParams;if("ngfThumbnail"===directiveName&&(size||(size={width:elem[0].naturalWidth||elem[0].clientWidth,height:elem[0].naturalHeight||elem[0].clientHeight}),0===size.width&&window.getComputedStyle)){var style=getComputedStyle(elem[0]);style.width&&style.width.indexOf("px")>-1&&style.height&&style.height.indexOf("px")>-1&&(size={width:parseInt(style.width.slice(0,-2)),height:parseInt(style.height.slice(0,-2))})}if(angular.isString(file))return elem.removeClass("ng-hide"),isBackground?elem.css("background-image","url('"+file+"')"):elem.attr("src",file);!file||!file.type||0!==file.type.search(getTagType(elem[0]))||isBackground&&0!==file.type.indexOf("image")?elem.addClass("ng-hide"):size&&Upload.isResizeSupported()?(size.resizeIf=function(width,height){return Upload.attrGetter("ngfResizeIf",attr,scope,{$width:width,$height:height,$file:file})},Upload.resize(file,size).then(function(f){constructDataUrl(f)},function(e){throw e})):constructDataUrl(file)});scope.$on("$destroy",function(){unwatch()})})}ngFileUpload.service("UploadDataUrl",["UploadBase","$timeout","$q",function(UploadBase,$timeout,$q){var upload=UploadBase;return upload.base64DataUrl=function(file){if(angular.isArray(file)){var d=$q.defer(),count=0;return angular.forEach(file,function(f){upload.dataUrl(f,!0).finally(function(){if(++count===file.length){var urls=[];angular.forEach(file,function(ff){urls.push(ff.$ngfDataUrl)}),d.resolve(urls,file)}})}),d.promise}return upload.dataUrl(file,!0)},upload.dataUrl=function(file,disallowObjectUrl){if(!file)return upload.emptyPromise(file,file);if(disallowObjectUrl&&null!=file.$ngfDataUrl||!disallowObjectUrl&&null!=file.$ngfBlobUrl)return upload.emptyPromise(disallowObjectUrl?file.$ngfDataUrl:file.$ngfBlobUrl,file);var p=disallowObjectUrl?file.$$ngfDataUrlPromise:file.$$ngfBlobUrlPromise;if(p)return p;var deferred=$q.defer();return $timeout(function(){if(window.FileReader&&file&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 8")||file.size<2e4)&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 9")||file.size<4e6)){var URL=window.URL||window.webkitURL;if(URL&&URL.createObjectURL&&!disallowObjectUrl){var url;try{url=URL.createObjectURL(file)}catch(e){return void $timeout(function(){file.$ngfBlobUrl="",deferred.reject()})}$timeout(function(){if(file.$ngfBlobUrl=url,url){deferred.resolve(url,file),upload.blobUrls=upload.blobUrls||[],upload.blobUrlsTotalSize=upload.blobUrlsTotalSize||0,upload.blobUrls.push({url:url,size:file.size}),upload.blobUrlsTotalSize+=file.size||0;for(var maxMemory=upload.defaults.blobUrlsMaxMemory||268435456,maxLength=upload.defaults.blobUrlsMaxQueueSize||200;(upload.blobUrlsTotalSize>maxMemory||upload.blobUrls.length>maxLength)&&upload.blobUrls.length>1;){var obj=upload.blobUrls.splice(0,1)[0];URL.revokeObjectURL(obj.url),upload.blobUrlsTotalSize-=obj.size}}})}else{var fileReader=new FileReader;fileReader.onload=function(e){$timeout(function(){file.$ngfDataUrl=e.target.result,deferred.resolve(e.target.result,file),$timeout(function(){delete file.$ngfDataUrl},1e3)})},fileReader.onerror=function(){$timeout(function(){file.$ngfDataUrl="",deferred.reject()})},fileReader.readAsDataURL(file)}}else $timeout(function(){file[disallowObjectUrl?"$ngfDataUrl":"$ngfBlobUrl"]="",deferred.reject()})}),p=disallowObjectUrl?file.$$ngfDataUrlPromise=deferred.promise:file.$$ngfBlobUrlPromise=deferred.promise,p.finally(function(){delete file[disallowObjectUrl?"$$ngfDataUrlPromise":"$$ngfBlobUrlPromise"]}),p},upload}]),ngFileUpload.directive("ngfSrc",["Upload","$timeout",function(Upload,$timeout){return{restrict:"AE",link:function(scope,elem,attr){linkFileDirective(Upload,$timeout,scope,elem,attr,"ngfSrc",Upload.attrGetter("ngfResize",attr,scope),!1)}}}]),ngFileUpload.directive("ngfBackground",["Upload","$timeout",function(Upload,$timeout){return{restrict:"AE",link:function(scope,elem,attr){linkFileDirective(Upload,$timeout,scope,elem,attr,"ngfBackground",Upload.attrGetter("ngfResize",attr,scope),!0)}}}]),ngFileUpload.directive("ngfThumbnail",["Upload","$timeout",function(Upload,$timeout){return{restrict:"AE",link:function(scope,elem,attr){var size=Upload.attrGetter("ngfSize",attr,scope);linkFileDirective(Upload,$timeout,scope,elem,attr,"ngfThumbnail",size,Upload.attrGetter("ngfAsBackground",attr,scope))}}}]),ngFileUpload.config(["$compileProvider",function($compileProvider){$compileProvider.imgSrcSanitizationWhitelist&&$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|webcal|local|file|data|blob):/),$compileProvider.aHrefSanitizationWhitelist&&$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|webcal|local|file|data|blob):/)}]),ngFileUpload.filter("ngfDataUrl",["UploadDataUrl","$sce",function(UploadDataUrl,$sce){return function(file,disallowObjectUrl,trustedUrl){if(angular.isString(file))return $sce.trustAsResourceUrl(file);var src=file&&((disallowObjectUrl?file.$ngfDataUrl:file.$ngfBlobUrl)||file.$ngfDataUrl);return file&&!src?(!file.$ngfDataUrlFilterInProgress&&angular.isObject(file)&&(file.$ngfDataUrlFilterInProgress=!0,UploadDataUrl.dataUrl(file,disallowObjectUrl)),""):(file&&delete file.$ngfDataUrlFilterInProgress,(file&&src?trustedUrl?$sce.trustAsResourceUrl(src):src:file)||"")}}])}();