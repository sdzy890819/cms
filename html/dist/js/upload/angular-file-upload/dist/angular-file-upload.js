/*
 angular-file-upload v2.4.0
 https://github.com/nervgh/angular-file-upload
*/
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["angular-file-upload"]=t():e["angular-file-upload"]=t()}(this,function(){/******/
return function(e){/******/
/******/
// The require function
/******/
function t(o){/******/
/******/
// Check if module is in cache
/******/
if(n[o])/******/
return n[o].exports;/******/
/******/
// Create a new module (and put it into the cache)
/******/
var r=n[o]={/******/
exports:{},/******/
id:o,/******/
loaded:!1};/******/
/******/
// Return the exports of the module
/******/
/******/
/******/
// Execute the module function
/******/
/******/
/******/
// Flag the module as loaded
/******/
return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}// webpackBootstrap
/******/
// The module cache
/******/
var n={};/******/
/******/
// Load entry module and return exports
/******/
/******/
/******/
/******/
// expose the modules object (__webpack_modules__)
/******/
/******/
/******/
// expose the module cache
/******/
/******/
/******/
// __webpack_public_path__
/******/
return t.m=e,t.c=n,t.p="",t(0)}([/* 0 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=n(1),i=o(r),s=n(2),a=o(s),u=n(3),l=o(u),p=n(4),c=o(p),f=n(5),d=o(f),h=n(6),y=o(h),v=n(7),m=o(v),_=n(8),g=o(_),b=n(9),F=o(b),O=n(10),C=o(O),w=n(11),A=o(w),I=n(12),T=o(I),U=n(13),x=o(U);angular.module(i.default.name,[]).value("fileUploaderOptions",a.default).factory("FileUploader",l.default).factory("FileLikeObject",c.default).factory("FileItem",d.default).factory("FileDirective",y.default).factory("FileSelect",m.default).factory("FileDrop",F.default).factory("FileOver",C.default).factory("Pipeline",g.default).directive("nvFileSelect",A.default).directive("nvFileDrop",T.default).directive("nvFileOver",x.default).run(["FileUploader","FileLikeObject","FileItem","FileDirective","FileSelect","FileDrop","FileOver","Pipeline",function(e,t,n,o,r,i,s,a){
// only for compatibility
e.FileLikeObject=t,e.FileItem=n,e.FileDirective=o,e.FileSelect=r,e.FileDrop=i,e.FileOver=s,e.Pipeline=a}])},/* 1 */
/***/
function(e,t){e.exports={name:"angularFileUpload"}},/* 2 */
/***/
function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={url:"/",alias:"file",headers:{},queue:[],progress:0,autoUpload:!1,removeAfterUpload:!1,method:"POST",filters:[],formData:[],queueLimit:Number.MAX_VALUE,withCredentials:!1,disableMultipart:!1}},/* 3 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t,n,o,i,a,u,g){var b=o.File,F=o.FormData,O=function(){/**********************
	         * PUBLIC
	         **********************/
/**
	         * Creates an instance of FileUploader
	         * @param {Object} [options]
	         * @constructor
	         */
function o(t){r(this,o);var n=p(e);c(this,n,t,{isUploading:!1,_nextIndex:0,_directives:{select:[],drop:[],over:[]}}),
// add default filters
this.filters.unshift({name:"queueLimit",fn:this._queueLimitFilter}),this.filters.unshift({name:"folder",fn:this._folderFilter})}/**
	         * Adds items to the queue
	         * @param {File|HTMLInputElement|Object|FileList|Array<Object>} files
	         * @param {Object} [options]
	         * @param {Array<Function>|String} filters
	         */
/**
	         * Remove items from the queue. Remove last: index = -1
	         * @param {FileItem|Number} value
	         */
/**
	         * Clears the queue
	         */
/**
	         * Uploads a item from the queue
	         * @param {FileItem|Number} value
	         */
/**
	         * Cancels uploading of item from the queue
	         * @param {FileItem|Number} value
	         */
/**
	         * Uploads all not uploaded items of queue
	         */
/**
	         * Cancels all uploads
	         */
/**
	         * Returns "true" if value an instance of File
	         * @param {*} value
	         * @returns {Boolean}
	         * @private
	         */
/**
	         * Returns "true" if value an instance of FileLikeObject
	         * @param {*} value
	         * @returns {Boolean}
	         * @private
	         */
/**
	         * Returns "true" if value is array like object
	         * @param {*} value
	         * @returns {Boolean}
	         */
/**
	         * Returns a index of item from the queue
	         * @param {Item|Number} value
	         * @returns {Number}
	         */
/**
	         * Returns not uploaded items
	         * @returns {Array}
	         */
/**
	         * Returns items ready for upload
	         * @returns {Array}
	         */
/**
	         * Destroys instance of FileUploader
	         */
/**
	         * Callback
	         * @param {Array} fileItems
	         */
/**
	         * Callback
	         * @param {FileItem} fileItem
	         */
/**
	         * Callback
	         * @param {File|Object} item
	         * @param {Object} filter
	         * @param {Object} options
	         */
/**
	         * Callback
	         * @param {FileItem} fileItem
	         */
/**
	         * Callback
	         * @param {FileItem} fileItem
	         * @param {Number} progress
	         */
/**
	         * Callback
	         * @param {Number} progress
	         */
/**
	         * Callback
	         * @param {FileItem} item
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         */
/**
	         * Callback
	         * @param {FileItem} item
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         */
/**
	         * Callback
	         * @param {FileItem} item
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         */
/**
	         * Callback
	         * @param {FileItem} item
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         */
/**
	         * Callback
	         */
/**********************
	         * PRIVATE
	         **********************/
/**
	         * Returns the total progress
	         * @param {Number} [value]
	         * @returns {Number}
	         * @private
	         */
/**
	         * Returns array of filters
	         * @param {Array<Function>|String} filters
	         * @returns {Array<Function>}
	         * @private
	         */
/**
	        * @param {Array<Function>} filters
	        * @returns {Array<Function>}
	        * @private
	        */
/**
	         * Updates html
	         * @private
	         */
/**
	         * Returns "true" if item is a file (not folder)
	         * @param {File|FileLikeObject} item
	         * @returns {Boolean}
	         * @private
	         */
/**
	         * Returns "true" if the limit has not been reached
	         * @returns {Boolean}
	         * @private
	         */
/**
	         * Checks whether upload successful
	         * @param {Number} status
	         * @returns {Boolean}
	         * @private
	         */
/**
	         * Transforms the server response
	         * @param {*} response
	         * @param {Object} headers
	         * @returns {*}
	         * @private
	         */
/**
	         * Parsed response headers
	         * @param headers
	         * @returns {Object}
	         * @see https://github.com/angular/angular.js/blob/master/src/ng/http.js
	         * @private
	         */
/**
	         * Returns function that returns headers
	         * @param {Object} parsedHeaders
	         * @returns {Function}
	         * @private
	         */
/**
	         * The XMLHttpRequest transport
	         * @param {FileItem} item
	         * @private
	         */
/**
	         * The IFrame transport
	         * @param {FileItem} item
	         * @private
	         */
/**
	         * Inner callback
	         * @param {File|Object} item
	         * @param {Object} filter
	         * @param {Object} options
	         * @private
	         */
/**
	         * Inner callback
	         * @param {FileItem} item
	         */
/**
	         * Inner callback
	         * @param {Array<FileItem>} items
	         */
/**
	         *  Inner callback
	         * @param {FileItem} item
	         * @private
	         */
/**
	         * Inner callback
	         * @param {FileItem} item
	         * @param {Number} progress
	         * @private
	         */
/**
	         * Inner callback
	         * @param {FileItem} item
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         * @private
	         */
/**
	         * Inner callback
	         * @param {FileItem} item
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         * @private
	         */
/**
	         * Inner callback
	         * @param {FileItem} item
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         * @private
	         */
/**
	         * Inner callback
	         * @param {FileItem} item
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         * @private
	         */
/**********************
	         * STATIC
	         **********************/
/**
	         * Returns "true" if value an instance of File
	         * @param {*} value
	         * @returns {Boolean}
	         * @private
	         */
/**
	         * Returns "true" if value an instance of FileLikeObject
	         * @param {*} value
	         * @returns {Boolean}
	         * @private
	         */
/**
	         * Returns "true" if value is array like object
	         * @param {*} value
	         * @returns {Boolean}
	         */
/**
	         * Inherits a target (Class_1) by a source (Class_2)
	         * @param {Function} target
	         * @param {Function} source
	         */
return o.prototype.addToQueue=function(e,t,n){var o=this,r=this.isArrayLikeObject(e)?Array.prototype.slice.call(e):[e],i=this._getFilters(n),l=this.queue.length,p=[],c=function e(){var n=r.shift();if(m(n))return f();var l=o.isFile(n)?n:new a(n),c=o._convertFiltersToPipes(i),d=new g(c),h=function(t){var n=t.pipe.originalFilter,r=s(t.args,2),i=r[0],a=r[1];o._onWhenAddingFileFailed(i,n,a),e()},y=function(t,n){var r=new u(o,t,n);p.push(r),o.queue.push(r),o._onAfterAddingFile(r),e()};d.onThrown=h,d.onSuccessful=y,d.exec(l,t)},f=function(){o.queue.length!==l&&(o._onAfterAddingAll(p),o.progress=o._getTotalProgress()),o._render(),o.autoUpload&&o.uploadAll()};c()},o.prototype.removeFromQueue=function(e){var t=this.getIndexOfItem(e),n=this.queue[t];n.isUploading&&n.cancel(),this.queue.splice(t,1),n._destroy(),this.progress=this._getTotalProgress()},o.prototype.clearQueue=function(){for(;this.queue.length;)this.queue[0].remove();this.progress=0},o.prototype.uploadItem=function(e){var t=this.getIndexOfItem(e),n=this.queue[t],o=this.isHTML5?"_xhrTransport":"_iframeTransport";n._prepareToUploading(),this.isUploading||(this._onBeforeUploadItem(n),n.isCancel||(n.isUploading=!0,this.isUploading=!0,this[o](n),this._render()))},o.prototype.cancelItem=function(e){var t=this,n=this.getIndexOfItem(e),o=this.queue[n],r=this.isHTML5?"_xhr":"_form";o&&(o.isCancel=!0,o.isUploading?
// It will call this._onCancelItem() & this._onCompleteItem() asynchronously
o[r].abort():!function(){var e=[void 0,0,{}],n=function(){t._onCancelItem.apply(t,[o].concat(e)),t._onCompleteItem.apply(t,[o].concat(e))};i(n)}())},o.prototype.uploadAll=function(){var e=this.getNotUploadedItems().filter(function(e){return!e.isUploading});e.length&&(f(e,function(e){return e._prepareToUploading()}),e[0].upload())},o.prototype.cancelAll=function(){var e=this.getNotUploadedItems();f(e,function(e){return e.cancel()})},o.prototype.isFile=function(e){return this.constructor.isFile(e)},o.prototype.isFileLikeObject=function(e){return this.constructor.isFileLikeObject(e)},o.prototype.isArrayLikeObject=function(e){return this.constructor.isArrayLikeObject(e)},o.prototype.getIndexOfItem=function(e){return h(e)?e:this.queue.indexOf(e)},o.prototype.getNotUploadedItems=function(){return this.queue.filter(function(e){return!e.isUploaded})},o.prototype.getReadyItems=function(){return this.queue.filter(function(e){return e.isReady&&!e.isUploading}).sort(function(e,t){return e.index-t.index})},o.prototype.destroy=function(){var e=this;f(this._directives,function(t){f(e._directives[t],function(e){e.destroy()})})},o.prototype.onAfterAddingAll=function(e){},o.prototype.onAfterAddingFile=function(e){},o.prototype.onWhenAddingFileFailed=function(e,t,n){},o.prototype.onBeforeUploadItem=function(e){},o.prototype.onProgressItem=function(e,t){},o.prototype.onProgressAll=function(e){},o.prototype.onSuccessItem=function(e,t,n,o){},o.prototype.onErrorItem=function(e,t,n,o){},o.prototype.onCancelItem=function(e,t,n,o){},o.prototype.onCompleteItem=function(e,t,n,o){},o.prototype.onCompleteAll=function(){},o.prototype._getTotalProgress=function(e){if(this.removeAfterUpload)return e||0;var t=this.getNotUploadedItems().length,n=t?this.queue.length-t:this.queue.length,o=100/this.queue.length,r=(e||0)*o/100;return Math.round(n*o+r)},o.prototype._getFilters=function(e){if(!e)return this.filters;if(v(e))return e;var t=e.match(/[^\s,]+/g);return this.filters.filter(function(e){return t.indexOf(e.name)!==-1})},o.prototype._convertFiltersToPipes=function(e){var t=this;return e.map(function(e){var n=l(t,e.fn);return n.isAsync=3===e.fn.length,n.originalFilter=e,n})},o.prototype._render=function(){t.$$phase||t.$apply()},o.prototype._folderFilter=function(e){return!(!e.size&&!e.type)},o.prototype._queueLimitFilter=function(){return this.queue.length<this.queueLimit},o.prototype._isSuccessCode=function(e){return e>=200&&e<300||304===e},o.prototype._transformResponse=function(e,t){var o=this._headersGetter(t);return f(n.defaults.transformResponse,function(t){e=t(e,o)}),e},o.prototype._parseHeaders=function(e){var t,n,o,r={};return e?(f(e.split("\n"),function(e){o=e.indexOf(":"),t=e.slice(0,o).trim().toLowerCase(),n=e.slice(o+1).trim(),t&&(r[t]=r[t]?r[t]+", "+n:n)}),r):r},o.prototype._headersGetter=function(e){return function(t){return t?e[t.toLowerCase()]||null:e}},o.prototype._xhrTransport=function(e){var t,n=this,o=e._xhr=new XMLHttpRequest;if(e.disableMultipart?t=e._file:(t=new F,f(e.formData,function(e){f(e,function(e,n){t.append(n,e)})}),t.append(e.alias,e._file,e.file.name)),"number"!=typeof e._file.size)throw new TypeError("The file specified is no longer valid");o.upload.onprogress=function(t){var o=Math.round(t.lengthComputable?100*t.loaded/t.total:0);n._onProgressItem(e,o)},o.onload=function(){var t=n._parseHeaders(o.getAllResponseHeaders()),r=n._transformResponse(o.response,t),i=n._isSuccessCode(o.status)?"Success":"Error",s="_on"+i+"Item";n[s](e,r,o.status,t),n._onCompleteItem(e,r,o.status,t)},o.onerror=function(){var t=n._parseHeaders(o.getAllResponseHeaders()),r=n._transformResponse(o.response,t);n._onErrorItem(e,r,o.status,t),n._onCompleteItem(e,r,o.status,t)},o.onabort=function(){var t=n._parseHeaders(o.getAllResponseHeaders()),r=n._transformResponse(o.response,t);n._onCancelItem(e,r,o.status,t),n._onCompleteItem(e,r,o.status,t)},o.open(e.method,e.url,!0),o.withCredentials=e.withCredentials,f(e.headers,function(e,t){o.setRequestHeader(t,e)}),o.send(t)},o.prototype._iframeTransport=function(e){var t=this,n=_('<form style="display: none;" />'),o=_('<iframe name="iframeTransport'+Date.now()+'">'),r=e._input;e._form&&e._form.replaceWith(r),// remove old form
e._form=n,// save link to new form
r.prop("name",e.alias),f(e.formData,function(e){f(e,function(e,t){var o=_('<input type="hidden" name="'+t+'" />');o.val(e),n.append(o)})}),n.prop({action:e.url,method:"POST",target:o.prop("name"),enctype:"multipart/form-data",encoding:"multipart/form-data"}),o.bind("load",function(){var n="",r=200;try{
// Fix for legacy IE browsers that loads internal error page
// when failed WS response received. In consequence iframe
// content access denied error is thrown becouse trying to
// access cross domain page. When such thing occurs notifying
// with empty response object. See more info at:
// http://stackoverflow.com/questions/151362/access-is-denied-error-on-accessing-iframe-document-object
// Note that if non standard 4xx or 5xx error code returned
// from WS then response content can be accessed without error
// but 'XHR' status becomes 200. In order to avoid confusion
// returning response via same 'success' event handler.
// fixed angular.contents() for iframes
n=o[0].contentDocument.body.innerHTML}catch(e){
// in case we run into the access-is-denied error or we have another error on the server side
// (intentional 500,40... errors), we at least say 'something went wrong' -> 500
r=500}var i={response:n,status:r,dummy:!0},s={},a=t._transformResponse(i.response,s);t._onSuccessItem(e,a,i.status,s),t._onCompleteItem(e,a,i.status,s)}),n.abort=function(){var i,s={status:0,dummy:!0},a={};o.unbind("load").prop("src","javascript:false;"),n.replaceWith(r),t._onCancelItem(e,i,s.status,a),t._onCompleteItem(e,i,s.status,a)},r.after(n),n.append(r).append(o),n[0].submit()},o.prototype._onWhenAddingFileFailed=function(e,t,n){this.onWhenAddingFileFailed(e,t,n)},o.prototype._onAfterAddingFile=function(e){this.onAfterAddingFile(e)},o.prototype._onAfterAddingAll=function(e){this.onAfterAddingAll(e)},o.prototype._onBeforeUploadItem=function(e){e._onBeforeUpload(),this.onBeforeUploadItem(e)},o.prototype._onProgressItem=function(e,t){var n=this._getTotalProgress(t);this.progress=n,e._onProgress(t),this.onProgressItem(e,t),this.onProgressAll(n),this._render()},o.prototype._onSuccessItem=function(e,t,n,o){e._onSuccess(t,n,o),this.onSuccessItem(e,t,n,o)},o.prototype._onErrorItem=function(e,t,n,o){e._onError(t,n,o),this.onErrorItem(e,t,n,o)},o.prototype._onCancelItem=function(e,t,n,o){e._onCancel(t,n,o),this.onCancelItem(e,t,n,o)},o.prototype._onCompleteItem=function(e,t,n,o){e._onComplete(t,n,o),this.onCompleteItem(e,t,n,o);var r=this.getReadyItems()[0];return this.isUploading=!1,y(r)?void r.upload():(this.onCompleteAll(),this.progress=this._getTotalProgress(),void this._render())},o.isFile=function(e){return b&&e instanceof b},o.isFileLikeObject=function(e){return e instanceof a},o.isArrayLikeObject=function(e){return d(e)&&"length"in e},o.inherit=function(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.super_=t},o}();/**********************
	     * PUBLIC
	     **********************/
/**
	     * Checks a support the html5 uploader
	     * @returns {Boolean}
	     * @readonly
	     */
/**********************
	     * STATIC
	     **********************/
/**
	     * @borrows FileUploader.prototype.isHTML5
	     */
return O.prototype.isHTML5=!(!b||!F),O.isHTML5=O.prototype.isHTML5,O}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var s,a=e[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{!o&&a.return&&a.return()}finally{if(r)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=i;var a=n(1),u=(o(a),angular),l=u.bind,p=u.copy,c=u.extend,f=u.forEach,d=u.isObject,h=u.isNumber,y=u.isDefined,v=u.isArray,m=u.isUndefined,_=u.element;i.$inject=["fileUploaderOptions","$rootScope","$http","$window","$timeout","FileLikeObject","FileItem","Pipeline"]},/* 4 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(){return function(){/**
	         * Creates an instance of FileLikeObject
	         * @param {File|HTMLInputElement|Object} fileOrInput
	         * @constructor
	         */
function e(t){r(this,e);var n=l(t),o=n?t.value:t,i=p(o)?"FakePath":"Object",s="_createFrom"+i;this[s](o)}/**
	         * Creates file like object from fake path string
	         * @param {String} path
	         * @private
	         */
/**
	         * Creates file like object from object
	         * @param {File|FileLikeObject} object
	         * @private
	         */
return e.prototype._createFromFakePath=function(e){this.lastModifiedDate=null,this.size=null,this.type="like/"+e.slice(e.lastIndexOf(".")+1).toLowerCase(),this.name=e.slice(e.lastIndexOf("/")+e.lastIndexOf("\\")+2)},e.prototype._createFromObject=function(e){this.lastModifiedDate=u(e.lastModifiedDate),this.size=e.size,this.type=e.type,this.name=e.name},e}()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var s=n(1),a=(o(s),angular),u=a.copy,l=a.isElement,p=a.isString},/* 5 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){return function(){/**
	         * Creates an instance of FileItem
	         * @param {FileUploader} uploader
	         * @param {File|HTMLInputElement|Object} some
	         * @param {Object} options
	         * @constructor
	         */
function n(e,o,i){r(this,n);var s=c(o),a=s?p(o):null,f=s?null:o;l(this,{url:e.url,alias:e.alias,headers:u(e.headers),formData:u(e.formData),removeAfterUpload:e.removeAfterUpload,withCredentials:e.withCredentials,disableMultipart:e.disableMultipart,method:e.method},i,{uploader:e,file:new t(o),isReady:!1,isUploading:!1,isUploaded:!1,isSuccess:!1,isCancel:!1,isError:!1,progress:0,index:null,_file:f,_input:a}),a&&this._replaceNode(a)}/**********************
	         * PUBLIC
	         **********************/
/**
	         * Uploads a FileItem
	         */
/**
	         * Cancels uploading of FileItem
	         */
/**
	         * Removes a FileItem
	         */
/**
	         * Callback
	         * @private
	         */
/**
	         * Callback
	         * @param {Number} progress
	         * @private
	         */
/**
	         * Callback
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         */
/**
	         * Callback
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         */
/**
	         * Callback
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         */
/**
	         * Callback
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         */
/**********************
	         * PRIVATE
	         **********************/
/**
	         * Inner callback
	         */
/**
	         * Inner callback
	         * @param {Number} progress
	         * @private
	         */
/**
	         * Inner callback
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         * @private
	         */
/**
	         * Inner callback
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         * @private
	         */
/**
	         * Inner callback
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         * @private
	         */
/**
	         * Inner callback
	         * @param {*} response
	         * @param {Number} status
	         * @param {Object} headers
	         * @private
	         */
/**
	         * Destroys a FileItem
	         */
/**
	         * Prepares to uploading
	         * @private
	         */
/**
	         * Replaces input element on his clone
	         * @param {JQLite|jQuery} input
	         * @private
	         */
return n.prototype.upload=function(){try{this.uploader.uploadItem(this)}catch(e){this.uploader._onCompleteItem(this,"",0,[]),this.uploader._onErrorItem(this,"",0,[])}},n.prototype.cancel=function(){this.uploader.cancelItem(this)},n.prototype.remove=function(){this.uploader.removeFromQueue(this)},n.prototype.onBeforeUpload=function(){},n.prototype.onProgress=function(e){},n.prototype.onSuccess=function(e,t,n){},n.prototype.onError=function(e,t,n){},n.prototype.onCancel=function(e,t,n){},n.prototype.onComplete=function(e,t,n){},n.prototype._onBeforeUpload=function(){this.isReady=!0,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!1,this.isError=!1,this.progress=0,this.onBeforeUpload()},n.prototype._onProgress=function(e){this.progress=e,this.onProgress(e)},n.prototype._onSuccess=function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!0,this.isCancel=!1,this.isError=!1,this.progress=100,this.index=null,this.onSuccess(e,t,n)},n.prototype._onError=function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!1,this.isCancel=!1,this.isError=!0,this.progress=0,this.index=null,this.onError(e,t,n)},n.prototype._onCancel=function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!0,this.isError=!1,this.progress=0,this.index=null,this.onCancel(e,t,n)},n.prototype._onComplete=function(e,t,n){this.onComplete(e,t,n),this.removeAfterUpload&&this.remove()},n.prototype._destroy=function(){this._input&&this._input.remove(),this._form&&this._form.remove(),delete this._form,delete this._input},n.prototype._prepareToUploading=function(){this.index=this.index||++this.uploader._nextIndex,this.isReady=!0},n.prototype._replaceNode=function(t){var n=e(t.clone())(t.scope());n.prop("value",null),// FF fix
t.css("display","none"),t.after(n)},n}()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var s=n(1),a=(o(s),angular),u=a.copy,l=a.extend,p=a.element,c=a.isElement;i.$inject=["$compile","FileLikeObject"]},/* 6 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(){var e=function(){/**
	         * Creates instance of {FileDirective} object
	         * @param {Object} options
	         * @param {Object} options.uploader
	         * @param {HTMLElement} options.element
	         * @param {Object} options.events
	         * @param {String} options.prop
	         * @constructor
	         */
function e(t){r(this,e),u(this,t),this.uploader._directives[this.prop].push(this),this._saveLinks(),this.bind()}/**
	         * Binds events handles
	         */
/**
	         * Unbinds events handles
	         */
/**
	         * Destroys directive
	         */
/**
	         * Saves links to functions
	         * @private
	         */
return e.prototype.bind=function(){for(var e in this.events){var t=this.events[e];this.element.bind(e,this[t])}},e.prototype.unbind=function(){for(var e in this.events)this.element.unbind(e,this.events[e])},e.prototype.destroy=function(){var e=this.uploader._directives[this.prop].indexOf(this);this.uploader._directives[this.prop].splice(e,1),this.unbind()},e.prototype._saveLinks=function(){for(var e in this.events){var t=this.events[e];this[t]=this[t].bind(this)}},e}();/**
	     * Map of events
	     * @type {Object}
	     */
return e.prototype.events={},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var s=n(1),a=(o(s),angular),u=a.extend},/* 7 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){return function(t){/**
	         * Creates instance of {FileSelect} object
	         * @param {Object} options
	         * @constructor
	         */
function n(e){r(this,n);var o=p(e,{
// Map of events
events:{$destroy:"destroy",change:"onChange"},
// Name of property inside uploader._directive object
prop:"select"}),s=i(this,t.call(this,o));// FF fix
return s.uploader.isHTML5||s.element.removeAttr("multiple"),s.element.prop("value",null),s}/**
	         * Returns options
	         * @return {Object|undefined}
	         */
/**
	         * Returns filters
	         * @return {Array<Function>|String|undefined}
	         */
/**
	         * If returns "true" then HTMLInputElement will be cleared
	         * @returns {Boolean}
	         */
/**
	         * Event handler
	         */
return s(n,t),n.prototype.getOptions=function(){},n.prototype.getFilters=function(){},n.prototype.isEmptyAfterSelection=function(){return!!this.element.attr("multiple")},n.prototype.onChange=function(){var t=this.uploader.isHTML5?this.element[0].files:this.element[0],n=this.getOptions(),o=this.getFilters();this.uploader.isHTML5||this.destroy(),this.uploader.addToQueue(t,n,o),this.isEmptyAfterSelection()&&(this.element.prop("value",null),this.element.replaceWith(e(this.element.clone())(this.scope)))},n}(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a;var u=n(1),l=(o(u),angular),p=l.extend;a.$inject=["$compile","FileDirective"]},/* 8 */
/***/
function(e,t){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e){return function(){/**
	     * @param {Array<Function>} pipes
	     */
function t(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];o(this,t),this.pipes=e}return t.prototype.next=function(t){var o=this.pipes.shift();if(a(o))return void this.onSuccessful.apply(this,n(t));var r=new Error("The filter has not passed");if(r.pipe=o,r.args=t,o.isAsync){var i=e.defer(),u=s(this,this.next,t),l=s(this,this.onThrown,r);i.promise.then(u,l),o.apply(void 0,n(t).concat([i]))}else{var p=Boolean(o.apply(void 0,n(t)));p?this.next(t):this.onThrown(r)}},t.prototype.exec=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];this.next(t)},t.prototype.onThrown=function(e){},t.prototype.onSuccessful=function(){},t}()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=angular,s=i.bind,a=i.isUndefined;r.$inject=["$q"]},/* 9 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){return function(e){/**
	         * Creates instance of {FileDrop} object
	         * @param {Object} options
	         * @constructor
	         */
function t(n){r(this,t);var o=p(n,{
// Map of events
events:{$destroy:"destroy",drop:"onDrop",dragover:"onDragOver",dragleave:"onDragLeave"},
// Name of property inside uploader._directive object
prop:"drop"});return i(this,e.call(this,o))}/**
	         * Returns options
	         * @return {Object|undefined}
	         */
/**
	         * Returns filters
	         * @return {Array<Function>|String|undefined}
	         */
/**
	         * Event handler
	         */
/**
	         * Event handler
	         */
/**
	         * Event handler
	         */
/**
	         * Helper
	         */
/**
	         * Helper
	         */
/**
	         * Returns "true" if types contains files
	         * @param {Object} types
	         */
/**
	         * Callback
	         */
/**
	         * Callback
	         */
return s(t,e),t.prototype.getOptions=function(){},t.prototype.getFilters=function(){},t.prototype.onDrop=function(e){var t=this._getTransfer(e);if(t){var n=this.getOptions(),o=this.getFilters();this._preventAndStop(e),c(this.uploader._directives.over,this._removeOverClass,this),this.uploader.addToQueue(t.files,n,o)}},t.prototype.onDragOver=function(e){var t=this._getTransfer(e);this._haveFiles(t.types)&&(t.dropEffect="copy",this._preventAndStop(e),c(this.uploader._directives.over,this._addOverClass,this))},t.prototype.onDragLeave=function(e){e.currentTarget!==this.element[0]&&(this._preventAndStop(e),c(this.uploader._directives.over,this._removeOverClass,this))},t.prototype._getTransfer=function(e){return e.dataTransfer?e.dataTransfer:e.originalEvent.dataTransfer},t.prototype._preventAndStop=function(e){e.preventDefault(),e.stopPropagation()},t.prototype._haveFiles=function(e){return!!e&&(e.indexOf?e.indexOf("Files")!==-1:!!e.contains&&e.contains("Files"))},t.prototype._addOverClass=function(e){e.addOverClass()},t.prototype._removeOverClass=function(e){e.removeOverClass()},t}(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a;var u=n(1),l=(o(u),angular),p=l.extend,c=l.forEach;a.$inject=["FileDirective"]},/* 10 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){return function(e){/**
	         * Creates instance of {FileDrop} object
	         * @param {Object} options
	         * @constructor
	         */
function t(n){r(this,t);var o=p(n,{
// Map of events
events:{$destroy:"destroy"},
// Name of property inside uploader._directive object
prop:"over",
// Over class
overClass:"nv-file-over"});return i(this,e.call(this,o))}/**
	         * Adds over class
	         */
/**
	         * Removes over class
	         */
/**
	         * Returns over class
	         * @returns {String}
	         */
return s(t,e),t.prototype.addOverClass=function(){this.element.addClass(this.getOverClass())},t.prototype.removeOverClass=function(){this.element.removeClass(this.getOverClass())},t.prototype.getOverClass=function(){return this.overClass},t}(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a;var u=n(1),l=(o(u),angular),p=l.extend;a.$inject=["FileDirective"]},/* 11 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n){return{link:function(o,r,i){var s=o.$eval(i.uploader);if(!(s instanceof t))throw new TypeError('"Uploader" must be an instance of FileUploader');var a=new n({uploader:s,element:r,scope:o});a.getOptions=e(i.options).bind(a,o),a.getFilters=function(){return i.filters}}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=n(1);o(i);r.$inject=["$parse","FileUploader","FileSelect"]},/* 12 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n){return{link:function(o,r,i){var s=o.$eval(i.uploader);if(!(s instanceof t))throw new TypeError('"Uploader" must be an instance of FileUploader');if(s.isHTML5){var a=new n({uploader:s,element:r});a.getOptions=e(i.options).bind(a,o),a.getFilters=function(){return i.filters}}}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=n(1);o(i);r.$inject=["$parse","FileUploader","FileDrop"]},/* 13 */
/***/
function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){return{link:function(n,o,r){var i=n.$eval(r.uploader);if(!(i instanceof e))throw new TypeError('"Uploader" must be an instance of FileUploader');var s=new t({uploader:i,element:o});s.getOverClass=function(){return r.overClass||s.overClass}}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=n(1);o(i);r.$inject=["FileUploader","FileOver"]}])});