/**!
 * AngularJS file upload directives and services. Supports: file upload/drop/paste, resume, cancel/abort,
 * progress, resize, thumbnail, preview, validation and CORS
 * FileAPI Flash shim for old browsers not supporting FormData
 * @author  Danial  <danial.farid@gmail.com>
 * @version <%= pkg.version %>
 */
!function(){function patchXHR(fnName,newFn){window.XMLHttpRequest.prototype[fnName]=newFn(window.XMLHttpRequest.prototype[fnName])}function redefineProp(xhr,prop,fn){try{Object.defineProperty(xhr,prop,{get:fn})}catch(e){}}if(window.FileAPI||(window.FileAPI={}),!window.XMLHttpRequest)throw"AJAX is not supported. XMLHttpRequest is not defined.";if(FileAPI.shouldLoad=!window.FormData||FileAPI.forceLoad,FileAPI.shouldLoad){var initializeUploadListener=function(xhr){if(!xhr.__listeners){xhr.upload||(xhr.upload={}),xhr.__listeners=[];var origAddEventListener=xhr.upload.addEventListener;xhr.upload.addEventListener=function(t,fn){xhr.__listeners[t]=fn,origAddEventListener&&origAddEventListener.apply(this,arguments)}}};patchXHR("open",function(orig){return function(m,url,b){initializeUploadListener(this),this.__url=url;try{orig.apply(this,[m,url,b])}catch(e){e.message.indexOf("Access is denied")>-1&&(this.__origError=e,orig.apply(this,[m,"_fix_for_ie_crossdomain__",b]))}}}),patchXHR("getResponseHeader",function(orig){return function(h){return this.__fileApiXHR&&this.__fileApiXHR.getResponseHeader?this.__fileApiXHR.getResponseHeader(h):null==orig?null:orig.apply(this,[h])}}),patchXHR("getAllResponseHeaders",function(orig){return function(){return this.__fileApiXHR&&this.__fileApiXHR.getAllResponseHeaders?this.__fileApiXHR.getAllResponseHeaders():null==orig?null:orig.apply(this)}}),patchXHR("abort",function(orig){return function(){return this.__fileApiXHR&&this.__fileApiXHR.abort?this.__fileApiXHR.abort():null==orig?null:orig.apply(this)}}),patchXHR("setRequestHeader",function(orig){return function(header,value){if("__setXHR_"===header){initializeUploadListener(this);var val=value(this);val instanceof Function&&val(this)}else this.__requestHeaders=this.__requestHeaders||{},this.__requestHeaders[header]=value,orig.apply(this,arguments)}}),patchXHR("send",function(orig){return function(){var xhr=this;if(arguments[0]&&arguments[0].__isFileAPIShim){var formData=arguments[0],config={url:xhr.__url,jsonp:!1,cache:!0,complete:function(err,fileApiXHR){err&&angular.isString(err)&&-1!==err.indexOf("#2174")&&(err=null),xhr.__completed=!0,!err&&xhr.__listeners.load&&xhr.__listeners.load({type:"load",loaded:xhr.__loaded,total:xhr.__total,target:xhr,lengthComputable:!0}),!err&&xhr.__listeners.loadend&&xhr.__listeners.loadend({type:"loadend",loaded:xhr.__loaded,total:xhr.__total,target:xhr,lengthComputable:!0}),"abort"===err&&xhr.__listeners.abort&&xhr.__listeners.abort({type:"abort",loaded:xhr.__loaded,total:xhr.__total,target:xhr,lengthComputable:!0}),void 0!==fileApiXHR.status&&redefineProp(xhr,"status",function(){return 0===fileApiXHR.status&&err&&"abort"!==err?500:fileApiXHR.status}),void 0!==fileApiXHR.statusText&&redefineProp(xhr,"statusText",function(){return fileApiXHR.statusText}),redefineProp(xhr,"readyState",function(){return 4}),void 0!==fileApiXHR.response&&redefineProp(xhr,"response",function(){return fileApiXHR.response});var resp=fileApiXHR.responseText||(err&&0===fileApiXHR.status&&"abort"!==err?err:void 0);redefineProp(xhr,"responseText",function(){return resp}),redefineProp(xhr,"response",function(){return resp}),err&&redefineProp(xhr,"err",function(){return err}),xhr.__fileApiXHR=fileApiXHR,xhr.onreadystatechange&&xhr.onreadystatechange(),xhr.onload&&xhr.onload()},progress:function(e){if(e.target=xhr,xhr.__listeners.progress&&xhr.__listeners.progress(e),xhr.__total=e.total,xhr.__loaded=e.loaded,e.total===e.loaded){var _this=this;setTimeout(function(){xhr.__completed||(xhr.getAllResponseHeaders=function(){},_this.complete(null,{status:204,statusText:"No Content"}))},FileAPI.noContentTimeout||1e4)}},headers:xhr.__requestHeaders};config.data={},config.files={};for(var i=0;i<formData.data.length;i++){var item=formData.data[i];null!=item.val&&null!=item.val.name&&null!=item.val.size&&null!=item.val.type?config.files[item.key]=item.val:config.data[item.key]=item.val}setTimeout(function(){if(!FileAPI.hasFlash)throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';xhr.__fileApiXHR=FileAPI.upload(config)},1)}else{if(this.__origError)throw this.__origError;orig.apply(xhr,arguments)}}}),window.XMLHttpRequest.__isFileAPIShim=!0,window.FormData=FormData=function(){return{append:function(key,val,name){val.__isFileAPIBlobShim&&(val=val.data[0]),this.data.push({key:key,val:val,name:name})},data:[],__isFileAPIShim:!0}},window.Blob=Blob=function(b){return{data:b,__isFileAPIBlobShim:!0}}}}();