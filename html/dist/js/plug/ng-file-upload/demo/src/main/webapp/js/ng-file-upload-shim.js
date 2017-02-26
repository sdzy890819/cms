/**!
 * AngularJS file upload directives and services. Supports: file upload/drop/paste, resume, cancel/abort,
 * progress, resize, thumbnail, preview, validation and CORS
 * FileAPI Flash shim for old browsers not supporting FormData
 * @author  Danial  <danial.farid@gmail.com>
 * @version 12.2.13
 */
!function(){function patchXHR(fnName,newFn){window.XMLHttpRequest.prototype[fnName]=newFn(window.XMLHttpRequest.prototype[fnName])}function redefineProp(xhr,prop,fn){try{Object.defineProperty(xhr,prop,{get:fn})}catch(e){}}if(window.FileAPI||(window.FileAPI={}),!window.XMLHttpRequest)throw"AJAX is not supported. XMLHttpRequest is not defined.";if(FileAPI.shouldLoad=!window.FormData||FileAPI.forceLoad,FileAPI.shouldLoad){var initializeUploadListener=function(xhr){if(!xhr.__listeners){xhr.upload||(xhr.upload={}),xhr.__listeners=[];var origAddEventListener=xhr.upload.addEventListener;xhr.upload.addEventListener=function(t,fn){xhr.__listeners[t]=fn,origAddEventListener&&origAddEventListener.apply(this,arguments)}}};patchXHR("open",function(orig){return function(m,url,b){initializeUploadListener(this),this.__url=url;try{orig.apply(this,[m,url,b])}catch(e){e.message.indexOf("Access is denied")>-1&&(this.__origError=e,orig.apply(this,[m,"_fix_for_ie_crossdomain__",b]))}}}),patchXHR("getResponseHeader",function(orig){return function(h){return this.__fileApiXHR&&this.__fileApiXHR.getResponseHeader?this.__fileApiXHR.getResponseHeader(h):null==orig?null:orig.apply(this,[h])}}),patchXHR("getAllResponseHeaders",function(orig){return function(){return this.__fileApiXHR&&this.__fileApiXHR.getAllResponseHeaders?this.__fileApiXHR.getAllResponseHeaders():null==orig?null:orig.apply(this)}}),patchXHR("abort",function(orig){return function(){return this.__fileApiXHR&&this.__fileApiXHR.abort?this.__fileApiXHR.abort():null==orig?null:orig.apply(this)}}),patchXHR("setRequestHeader",function(orig){return function(header,value){if("__setXHR_"===header){initializeUploadListener(this);var val=value(this);val instanceof Function&&val(this)}else this.__requestHeaders=this.__requestHeaders||{},this.__requestHeaders[header]=value,orig.apply(this,arguments)}}),patchXHR("send",function(orig){return function(){var xhr=this;if(arguments[0]&&arguments[0].__isFileAPIShim){var formData=arguments[0],config={url:xhr.__url,jsonp:!1,cache:!0,complete:function(err,fileApiXHR){err&&angular.isString(err)&&err.indexOf("#2174")!==-1&&(err=null),xhr.__completed=!0,!err&&xhr.__listeners.load&&xhr.__listeners.load({type:"load",loaded:xhr.__loaded,total:xhr.__total,target:xhr,lengthComputable:!0}),!err&&xhr.__listeners.loadend&&xhr.__listeners.loadend({type:"loadend",loaded:xhr.__loaded,total:xhr.__total,target:xhr,lengthComputable:!0}),"abort"===err&&xhr.__listeners.abort&&xhr.__listeners.abort({type:"abort",loaded:xhr.__loaded,total:xhr.__total,target:xhr,lengthComputable:!0}),void 0!==fileApiXHR.status&&redefineProp(xhr,"status",function(){return 0===fileApiXHR.status&&err&&"abort"!==err?500:fileApiXHR.status}),void 0!==fileApiXHR.statusText&&redefineProp(xhr,"statusText",function(){return fileApiXHR.statusText}),redefineProp(xhr,"readyState",function(){return 4}),void 0!==fileApiXHR.response&&redefineProp(xhr,"response",function(){return fileApiXHR.response});var resp=fileApiXHR.responseText||(err&&0===fileApiXHR.status&&"abort"!==err?err:void 0);redefineProp(xhr,"responseText",function(){return resp}),redefineProp(xhr,"response",function(){return resp}),err&&redefineProp(xhr,"err",function(){return err}),xhr.__fileApiXHR=fileApiXHR,xhr.onreadystatechange&&xhr.onreadystatechange(),xhr.onload&&xhr.onload()},progress:function(e){if(e.target=xhr,xhr.__listeners.progress&&xhr.__listeners.progress(e),xhr.__total=e.total,xhr.__loaded=e.loaded,e.total===e.loaded){var _this=this;setTimeout(function(){xhr.__completed||(xhr.getAllResponseHeaders=function(){},_this.complete(null,{status:204,statusText:"No Content"}))},FileAPI.noContentTimeout||1e4)}},headers:xhr.__requestHeaders};config.data={},config.files={};for(var i=0;i<formData.data.length;i++){var item=formData.data[i];null!=item.val&&null!=item.val.name&&null!=item.val.size&&null!=item.val.type?config.files[item.key]=item.val:config.data[item.key]=item.val}setTimeout(function(){if(!FileAPI.hasFlash)throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';xhr.__fileApiXHR=FileAPI.upload(config)},1)}else{if(this.__origError)throw this.__origError;orig.apply(xhr,arguments)}}}),window.XMLHttpRequest.__isFileAPIShim=!0,window.FormData=FormData=function(){return{append:function(key,val,name){val.__isFileAPIBlobShim&&(val=val.data[0]),this.data.push({key:key,val:val,name:name})},data:[],__isFileAPIShim:!0}},window.Blob=Blob=function(b){return{data:b,__isFileAPIBlobShim:!0}}}}(),function(){function isInputTypeFile(elem){return"input"===elem[0].tagName.toLowerCase()&&elem.attr("type")&&"file"===elem.attr("type").toLowerCase()}function hasFlash(){try{var fo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(fo)return!0}catch(e){if(void 0!==navigator.mimeTypes["application/x-shockwave-flash"])return!0}return!1}function getOffset(obj){var left=0,top=0;if(window.jQuery)return jQuery(obj).offset();if(obj.offsetParent)do left+=obj.offsetLeft-obj.scrollLeft,top+=obj.offsetTop-obj.scrollTop,obj=obj.offsetParent;while(obj);return{left:left,top:top}}if(FileAPI.shouldLoad){if(FileAPI.hasFlash=hasFlash(),FileAPI.forceLoad&&(FileAPI.html5=!1),!FileAPI.upload){var jsUrl,basePath,i,index,src,script=document.createElement("script"),allScripts=document.getElementsByTagName("script");if(window.FileAPI.jsUrl)jsUrl=window.FileAPI.jsUrl;else if(window.FileAPI.jsPath)basePath=window.FileAPI.jsPath;else for(i=0;i<allScripts.length;i++)if(src=allScripts[i].src,index=src.search(/\/ng\-file\-upload[\-a-zA-z0-9\.]*\.js/),index>-1){basePath=src.substring(0,index+1);break}null==FileAPI.staticPath&&(FileAPI.staticPath=basePath),script.setAttribute("src",jsUrl||basePath+"FileAPI.min.js"),document.getElementsByTagName("head")[0].appendChild(script)}FileAPI.ngfFixIE=function(elem,fileElem,changeFn){if(!hasFlash())throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';var fixInputStyle=function(){var label=fileElem.parent();elem.attr("disabled")?label&&label.removeClass("js-fileapi-wrapper"):(fileElem.attr("__ngf_flash_")||(fileElem.unbind("change"),fileElem.unbind("click"),fileElem.bind("change",function(evt){fileApiChangeFn.apply(this,[evt]),changeFn.apply(this,[evt])}),fileElem.attr("__ngf_flash_","true")),label.addClass("js-fileapi-wrapper"),isInputTypeFile(elem)||(label.css("position","absolute").css("top",getOffset(elem[0]).top+"px").css("left",getOffset(elem[0]).left+"px").css("width",elem[0].offsetWidth+"px").css("height",elem[0].offsetHeight+"px").css("filter","alpha(opacity=0)").css("display",elem.css("display")).css("overflow","hidden").css("z-index","900000").css("visibility","visible"),fileElem.css("width",elem[0].offsetWidth+"px").css("height",elem[0].offsetHeight+"px").css("position","absolute").css("top","0px").css("left","0px")))};elem.bind("mouseenter",fixInputStyle);var fileApiChangeFn=function(evt){for(var files=FileAPI.getFiles(evt),i=0;i<files.length;i++)void 0===files[i].size&&(files[i].size=0),void 0===files[i].name&&(files[i].name="file"),void 0===files[i].type&&(files[i].type="undefined");evt.target||(evt.target={}),evt.target.files=files,evt.target.files!==files&&(evt.__files_=files),(evt.__files_||evt.target.files).item=function(i){return(evt.__files_||evt.target.files)[i]||null}}},FileAPI.disableFileInput=function(elem,disable){disable?elem.removeClass("js-fileapi-wrapper"):elem.addClass("js-fileapi-wrapper")}}}(),window.FileReader||(window.FileReader=function(){var _this=this,loadStarted=!1;this.listeners={},this.addEventListener=function(type,fn){_this.listeners[type]=_this.listeners[type]||[],_this.listeners[type].push(fn)},this.removeEventListener=function(type,fn){_this.listeners[type]&&_this.listeners[type].splice(_this.listeners[type].indexOf(fn),1)},this.dispatchEvent=function(evt){var list=_this.listeners[evt.type];if(list)for(var i=0;i<list.length;i++)list[i].call(_this,evt)},this.onabort=this.onerror=this.onload=this.onloadstart=this.onloadend=this.onprogress=null;var constructEvent=function(type,evt){var e={type:type,target:_this,loaded:evt.loaded,total:evt.total,error:evt.error};return null!=evt.result&&(e.target.result=evt.result),e},listener=function(evt){loadStarted||(loadStarted=!0,_this.onloadstart&&_this.onloadstart(constructEvent("loadstart",evt)));var e;"load"===evt.type?(_this.onloadend&&_this.onloadend(constructEvent("loadend",evt)),e=constructEvent("load",evt),_this.onload&&_this.onload(e),_this.dispatchEvent(e)):"progress"===evt.type?(e=constructEvent("progress",evt),_this.onprogress&&_this.onprogress(e),_this.dispatchEvent(e)):(e=constructEvent("error",evt),_this.onerror&&_this.onerror(e),_this.dispatchEvent(e))};this.readAsDataURL=function(file){FileAPI.readAsDataURL(file,listener)},this.readAsText=function(file){FileAPI.readAsText(file,listener)}});