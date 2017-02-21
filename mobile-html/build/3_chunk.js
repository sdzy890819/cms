webpackJsonp([3],{

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _global = __webpack_require__(41);

var _global2 = _interopRequireDefault(_global);

var _URL = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

Date.prototype.Format = function (fmt) {
	//author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	}return fmt;
};
//import '../plug/vue-html5-editor/src/style.less';
//import vue2Html5Editor from '../plug/vue2-html5-editor/src/editor.vue';

//import { VueEditor } from '../plug/vue2-editor/dist/index.js'

exports.default = {
	name: 'add',
	components: {},
	props: {},
	data: function data() {
		return {
			title: '', //标题
			subTitle: '', //子标题
			keyword: '', //关键字 多个关键字按照空格分割
			description: '', //SEO描述
			source: '', //来源
			author: '', //"作者"
			channelId: -1, //频道ID
			columnId: -1, //栏目ID
			categoryId: -1, //部门分类ID
			content: '', //详细内容"
			field1: '', //扩展字段，界面上需要的时候点击添加" //可不传
			field2: '', //扩展字段，界面上需要的时候点击添加" //可不传
			field3: '', //扩展字段，界面上需要的时候点击添加" //可不传
			field4: '', //扩展字段，界面上需要的时候点击添加" //可不传
			field5: '', //扩展字段，界面上需要的时候点击添加" //可不传
			field2Show: false,
			field3Show: false,
			field4Show: false,
			field5Show: false,
			autoPublish: 0, ////1 是自动发布。0是不自动发布.默认不自动发布
			timer: new Date().Format("yyyy-MM-dd"), //yyyy-MM-dd HH:mm" //定时发布。//可不传
			publish: 0, //0|2 //默认为0 ，正常保存。保存草稿使用2

			data: {
				listCategory: [],
				currentChannelList: [],
				newscolumnlist: []
			}
		};
	},
	beforeCreate: function beforeCreate() {
		var self = this;
		_global2.default.ajax({
			url: _URL.category.listCategory,
			success: function success(_data) {
				self.data.listCategory = _data.data;
			}
		});
		__webpack_require__.e/* require.ensure */(9).then((function (require) {/* WEBPACK VAR INJECTION */(function(Vue) {
			/*require('../plug/vue2-html5-editor/src/style.less');
   var options = {
   	name: "vue-html5-editor",
       //custom icon class of built-in modules,default using font-awesome 
       icons: {
           text: "fa fa-pencil",
           color: "fa fa-paint-brush",
           font: "fa fa-font",
           align: "fa fa-align-justify",
           list: "fa fa-list",
           link: "fa fa-chain",
           unlink: "fa fa-chain-broken",
           tabulation: "fa fa-table",
           image: "fa fa-file-image-o",
           hr: "fa fa-minus",
           eraser: "fa fa-eraser",
           undo: "fa-undo fa",
           "full-screen": "fa fa-arrows-alt",
           info: "fa fa-info",
       },
       //config image module 
       image: {
           //Url of the server-side,default null and convert image to base64 
           server: null,
           //the name for file field in multipart request 
           fieldName: "image",
           //max file size 
           sizeLimit: 512 * 1024,
           // default true,if set to true,the image will resize by localResizeIMG (https://github.com/think2011/localResizeIMG) 
           compress: true,
           //follows are options of localResizeIMG 
           width: 1600,
           height: 1600,
           quality: 80,
           //handle response data，return image url 
           uploadHandler(responseText){
               //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"} 
               var json = JSON.parse(responseText)
               if (!json.ok) {
                   alert(json.msg)
               } else {
                   return json.data
               }
           }
       },
       //default en-us, en-us and zh-cn are built-in 
       language: "zh-cn",
       i18n: {
           //specify your language here 
           "zh-cn": {
               "align": "对齐方式",
               "image": "图片",
               "list": "列表",
               "link": "链接",
               "unlink": "去除链接",
               "table": "表格",
               "font": "文字",
               "full screen": "全屏",
               "text": "排版",
               "eraser": "格式清除",
               "info": "关于",
               "color": "颜色",
               "please enter a url": "请输入地址",
               "create link": "创建链接",
               "bold": "加粗",
               "italic": "倾斜",
               "underline": "下划线",
               "strike through": "删除线",
               "subscript": "上标",
               "superscript": "下标",
               "heading": "标题",
               "font name": "字体",
               "font size": "文字大小",
               "left justify": "左对齐",
               "center justify": "居中",
               "right justify": "右对齐",
               "ordered list": "有序列表",
               "unordered list": "无序列表",
               "fore color": "前景色",
               "background color": "背景色",
               "row count": "行数",
               "column count": "列数",
               "save": "确定",
               "upload": "上传",
               "progress": "进度",
               "unknown": "未知",
               "please wait": "请稍等",
               "error": "错误",
               "abort": "中断",
               "reset": "重置"
           }
       },
       //the modules you don't want 
       hiddenModules: [],
       //keep only the modules you want and customize the order. 
       //can be used with hiddenModules together 
       visibleModules: [
           "text",
           "color",
           "font",
           "align",
           "list",
           "link",
           "unlink",
           "tabulation",
           "image",
           "hr",
           "eraser",
           "undo",
           "full-screen",
           "info",
       ],
       //extended modules 
       modules: {
           //omit,reference to source code of build-in modules 
       }
   }
   var Vue2Html5Editor = require("../plug/vue2-html5-editor/dist/vue2-html5-editor.js");
   //Vue.use(editor,options);
   Vue.use(Vue2Html5Editor,options)*/

			var editor = __webpack_require__(182);
			Vue.use(editor, {
				name: 'vue2-html5-editor'
			});
		
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)))}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
	},
	mounted: function mounted() {},

	methods: {
		addField: function addField() {
			var self = this,
			    showList = [self.field2Show, self.field3Show, self.field4Show, self.field5Show];

			for (var i = 0; i < showList.length; i++) {
				if (!showList[i]) {
					this.$set(self, 'field' + (i + 2) + 'Show', true);
					break;
				}
			}
		},
		delField: function delField() {
			var self = this,
			    showList = [self.field2Show, self.field3Show, self.field4Show, self.field5Show];

			for (var i = showList.length; i >= 0; i--) {
				if (showList[i]) {
					this.$set(self, 'field' + (i + 2) + 'Show', false);
					break;
				}
			}
		},
		categoryEvent: function categoryEvent() {
			var self = this;
			_global2.default.ajax({
				url: _URL.channel.currentChannelList,
				data: {
					categoryId: self.categoryId
				},
				success: function success(_data) {
					self.$set(self.data, 'currentChannelList', _data.data);
				}
			});
		},
		listChannelEvent: function listChannelEvent() {
			var self = this;
			_global2.default.ajax({
				url: _URL.news.newscolumnlist,
				data: {
					channelId: self.channelId
				},
				success: function success(_data) {
					self.$set(self.data, 'newscolumnlist', _data.data);
				}
			});
		},
		submit: function submit() {
			var self = this;
			debugger;
		}
	}
};

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, "\nbody, div, p, h1, h2, h3, h4, h5, h6, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, table, th, td {\n  margin: 0;\n  padding: 0;\n}\naddress, cite, em, i {\n  font-style: normal;\n}\nhtml, body, root {\n  height: 100%;\n  overflow: hidden;\n}\nbody {\n  margin: 0 auto;\n  color: #fff;\n  -webkit-appearance: none;\n  background: #fff;\n  font-family: 'PingFang SC','STHeiti','Microsoft YaHei',Helvetica,Arial,sans-serif;\n  color: #878C92;\n}\nli {\n  list-style: none;\n}\nhtml, body {\n  max-width: 750px;\n  margin: 0 auto;\n}\na {\n  color: #535862;\n  text-decoration: none;\n}\na:hover {\n  color: #c40000;\n  text-decoration: underline;\n}\nimg {\n  border: 0;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\n  cursor: pointer;\n  -webkit-appearance: none;\n}\n.clearfix:after, .wrapper:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.clearfix {\n  display: inline-block;\n}\n\n/* close commented backslash hack */\n::-webkit-input-placeholder {\n  font-size: .75rem;\n}\n\n/* height */\n/* public */\n.form .select:before {\n  font-family: \"icons\";\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.icon--down:before, .form .select:before {\n  content: \"\\E600\";\n}\n@font-face {\n  font-family: 'icons';\n  src: url(data:application/font-woff;charset=utf-8;base64,d09GRk9UVE8AAARgAAoAAAAABBgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANgAAADYZbVvCE9TLzIAAAHMAAAAYAAAAGAIIvy2Y21hcAAAAiwAAABMAAAATBpVzFdnYXNwAAACeAAAAAgAAAAIAAAAEGhlYWQAAAKAAAAANgAAADYAl8viaGhlYQAAArgAAAAkAAAAJANuAeZobXR4AAAC3AAAABQAAAAUAwAAdG1heHAAAALwAAAABgAAAAYABVAAbmFtZQAAAvgAAAFFAAABRVcZpu5wb3N0AAAEQAAAACAAAAAgAAMAAAEABAQAAQEBCGljb21vb24AAQIAAQA6+BwC+BsD+BgEHgoAGVP/i4seCgAZU/+LiwwHi2v4lPh0BR0AAAB2Dx0AAAB7ER0AAAAJHQAAAM8SAAYBAQgPERMWG2ljb21vb25pY29tb29udTB1MXUyMHVFNjAwAAACAYkAAwAFAQEEBwoNTPyUDvyUDvyUDvuUDvgg958VgYD7AiOLi4aFg4iEi4SLg46GkYuL+wLzgZaAloqel5eWlpqMmX8I7yvv6wWZl5qKloCXf4p4gIAIDviUFPiUFYsMCgADAgABkAAFAAABTAFmAAAARwFMAWYAAAD1ABkAhAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOYAAeD/4P/gAeAAIAAAAAEAAAAAAAAAAAAAACAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQAOAAAAAoACAACAAIAAQAg5gD//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAQAAss1nQF8PPPUACwIAAAAAAM/2xdgAAAAAz/bF2AAAAAABjAE1AAAACAACAAAAAAAAAAEAAAHg/+AAAAIAAAAAAAGMAAEAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAQAAAAIAAHQAAFAAAAUAAAAAAA4ArgABAAAAAAABAA4AAAABAAAAAAACAA4ARwABAAAAAAADAA4AJAABAAAAAAAEAA4AVQABAAAAAAAFABYADgABAAAAAAAGAAcAMgABAAAAAAAKADQAYwADAAEECQABAA4AAAADAAEECQACAA4ARwADAAEECQADAA4AJAADAAEECQAEAA4AVQADAAEECQAFABYADgADAAEECQAGAA4AOQADAAEECQAKADQAYwBpAGMAbwBtAG8AbwBuAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuAFIAZQBnAHUAbABhAHIAaQBjAG8AbQBvAG8AbgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format(\"woff\");\n  font-weight: normal;\n  font-style: normal;\n}\n.form {\n  font-size: 0.875rem;\n}\n.form ul {\n    margin-bottom: 0.625rem;\n    padding: 0 0.625rem;\n    border-top: 0.0625rem solid #ddd;\n    border-bottom: 0.0625rem solid #ddd;\n    background: #fff;\n}\n.form li {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.3125rem 0;\n}\n.form li > input[type='text'], .form li > input[type='password'], .form li > input[type='tel'], .form li > input[type='date'], .form li > label, .form li > textarea {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      height: 1.5625rem;\n      line-height: 1.5625rem;\n      border: 0.0625rem solid #ddd;\n      padding: 0.25rem;\n}\n.form li > textarea {\n      display: block;\n      width: 100%;\n      height: 3.75rem;\n      padding: 0.3125rem;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      -webkit-appearance: none;\n}\n.form li > label {\n      border: none;\n}\n.form li > input:not(:first-child) {\n      margin-left: 0.625rem;\n}\n.form li input:not([type='radio']) {\n      background: #fff;\n      -webkit-appearance: none;\n}\n.form li input:not([type='radio'])[type='radio'] {\n        margin-right: 0.3125rem;\n}\n.form li select {\n      display: block;\n}\n.form .select {\n    display: block;\n    /* 1 */\n    width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    position: relative;\n    /* 2 */\n    vertical-align: middle;\n    /* 3 */\n    padding: 0;\n    /* 4 */\n    overflow: hidden;\n    /* 5 */\n    background: #fff;\n    color: #555;\n    border: 0.0625rem solid #ddd;\n    text-shadow: none;\n    border-radius: 0.25rem;\n    /* 6 */\n    /* 6 */\n}\n.form .select:hover {\n      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n}\n.form .select:before {\n      position: absolute;\n      /* 7 */\n      top: 0.5em;\n      /* 7 */\n      right: 0.5em;\n      /* 7 */\n      pointer-events: none;\n      /* 8 */\n}\n.form .select select {\n      width: 100%;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      padding: 0.5em;\n      /* 10 */\n      padding-right: 2em;\n      /* 11 */\n      border: none;\n      /* 13 */\n      background: transparent;\n      /* 13 */\n      background-image: none;\n      /* 13 */\n      -webkit-appearance: none;\n      /* 13 */\n      -moz-appearance: none;\n      /* 13 */\n      appearance: none;\n      /* 13 */\n      text-indent: 0.01px;\n      /* 14 */\n      text-overflow: '';\n      /* 14 */\n}\n.form .select select:focus {\n        outline: none;\n        /* 16 */\n}\n.form .submit {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.625rem;\n}\n.form .submit .btn {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      text-align: center;\n      height: 2.1875rem;\n      line-height: 2.1875rem;\n      background: #f85200;\n      border-radius: 0.1875rem;\n      color: #fff;\n      font-size: 0.875rem;\n}\n.form .submit .btn:not(:first-child) {\n        margin-left: 0.625rem;\n}\n.form .submit .btn:hover {\n        background: #ff4e00;\n}\n.form .error {\n    transition-duration: 0.5s;\n    -webkit-transition-duration: 0.5s;\n    height: 0;\n    margin: 0 1.25rem;\n    border: 0;\n    text-align: center;\n    overflow: hidden;\n}\n.form .error.cur {\n      height: 2.0625rem;\n      line-height: 2.0625rem;\n      background: #feffd1;\n      border: 0.0625rem solid #ddd;\n      color: red;\n}\n.form .error.right {\n      height: 2.0625rem;\n      line-height: 2.0625rem;\n      background: green;\n      border: 0.0625rem solid #ddd;\n      color: #fff;\n}\n.load-mask {\n  position: fixed;\n  z-index: 999;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.3);\n  display: -webkit-box;\n  display: -webkit-flexbox;\n  display: flexbox;\n  box-pack: center;\n  justify-content: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  box-align: center;\n  align-content: center;\n  -webkit-box-align: center;\n  -webkit-align-content: center;\n}\n.load-mask .loadding {\n    width: 3.125rem;\n    height: 3.125rem;\n    background: url(\"data:image/gif;base64,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\") no-repeat;\n    background-size: contain;\n    -webkit-animation: rotation 33s linear infinite;\n}\n.pop-tip {\n  position: fixed;\n  z-index: 999;\n  left: 6%;\n  top: 0;\n  font-size: 0.75rem;\n  width: 88%;\n  height: 1.875rem;\n  line-height: 1.875rem;\n  border: 0.0625rem solid #ddd;\n  background: #fffdc0;\n  color: #333;\n  text-align: center;\n  opacity: 0;\n  transition-duration: 0.3s;\n  -webkit-transition-duration: 0.3s;\n  transform: translateY(-6.25rem);\n  -webkit-transform: translateY(-6.25rem);\n}\n.pop-tip.error {\n    border: 0.0625rem solid #e20000;\n    color: red;\n}\n@-webkit-keyframes rotation {\nfrom {\n    -webkit-transform: rotate(0deg);\n}\nto {\n    -webkit-transform: rotate(360deg);\n}\n}\n\n/* link color */\n.red {\n  color: #f42b13;\n}\n.green {\n  color: #16c154;\n}\n.black {\n  color: black;\n}\n.gray {\n  color: #666;\n}\n.blue {\n  color: #2899f2;\n}\n.orange {\n  color: #cb420c;\n}\n\n/* public */\n.flex {\n  flex-shrink: 0;\n  -webkit-flex-shrink: 0;\n}\ninput {\n  outline: none;\n}\n.container {\n  background: #f8f8f8;\n}\ni {\n  width: 2rem;\n  height: 2rem;\n  margin-left: 0.3125rem;\n}\ni.add {\n    width: 2rem;\n    height: 2rem;\n}\ni.add:after {\n      width: 0.2rem;\n      height: 1.2rem;\n      top: 0.5rem;\n      left: .95rem;\n}\ni.add:before {\n      content: '';\n      height: 0.2rem;\n      width: 1.3rem;\n      display: block;\n      background: #fff;\n      border-radius: 0.625rem;\n      position: absolute;\n      top: .95rem;\n      left: 0.375rem;\n}\ni.del {\n    background: #288f00;\n}\ni.del:hover {\n      background: #31af00;\n}\ni.del:before {\n      width: 1rem;\n      left: 0.5rem;\n}\ni.del:after {\n      display: none;\n      visibility: hidden;\n}\n.fieldEdit {\n  width: 6.25rem;\n  display: -webkit-box;\n  display: -webkit-flexbox;\n  display: flexbox;\n  padding-left: 0.625rem;\n}\n.form li .label {\n  width: 5.625rem;\n  padding-right: 0.3125rem;\n  text-align: center;\n}\n.form li .text {\n  box-flex: 1;\n  -webkit-box-flex: 1;\n}\n.form li .text label:not(:first-child) {\n    margin-right: 0.625rem;\n}\n", "", {"version":3,"sources":["/./js/new/add.vue"],"names":[],"mappings":";AAAA;EACE,UAAU;EACV,WAAW;CAAE;AAEf;EACE,mBAAmB;CAAE;AAEvB;EACE,aAAa;EACb,iBAAiB;CAAE;AAErB;EACE,eAAe;EACf,YAAY;EACZ,yBAAyB;EACzB,iBAAiB;EACjB,kFAAkF;EAClF,eAAe;CAAE;AAEnB;EACE,iBAAiB;CAAE;AAErB;EACE,iBAAiB;EACjB,eAAe;CAAE;AAEnB;EACE,eAAe;EACf,sBAAsB;CAAE;AAE1B;EACE,eAAe;EACf,2BAA2B;CAAE;AAE/B;EACE,UAAU;CAAE;AAEd;EACE,0BAA0B;EAC1B,kBAAkB;CAAE;AAEtB;EACE,gBAAgB;EAChB,yBAAyB;CAAE;AAE7B;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CAAE;AAEd;EACE,sBAAsB;CAAE;;AAE1B,oCAAoC;AACpC;EACE,kBAAkB;CAAE;;AAEtB,YAAY;AACZ,YAAY;AACZ;EACE,qBAAqB;EACrB,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;EACpB,qBAAqB;EACrB,qBAAqB;EACrB,uCAAuC;EACvC,oCAAoC;EACpC,mCAAmC;CAAE;AAEvC;EACE,iBAAiB;CAAE;AAErB;EACE,qBAAqB;EACrB,kiDAAkiD;EACliD,oBAAoB;EACpB,mBAAmB;CAAE;AAEvB;EACE,oBAAoB;CAAE;AACtB;IACE,wBAAwB;IACxB,oBAAoB;IACpB,iCAAiC;IACjC,oCAAoC;IACpC,iBAAiB;CAAE;AACrB;IACE,qBAAqB;IACrB,yBAAyB;IACzB,iBAAiB;IACjB,qBAAqB;CAAE;AACvB;MACE,eAAe;MACf,YAAY;MACZ,oBAAoB;MACpB,kBAAkB;MAClB,uBAAuB;MACvB,6BAA6B;MAC7B,iBAAiB;CAAE;AACrB;MACE,eAAe;MACf,YAAY;MACZ,gBAAgB;MAChB,mBAAmB;MACnB,+BAA+B;MAC/B,uBAAuB;MACvB,yBAAyB;CAAE;AAC7B;MACE,aAAa;CAAE;AACjB;MACE,sBAAsB;CAAE;AAC1B;MACE,iBAAiB;MACjB,yBAAyB;CAAE;AAC3B;QACE,wBAAwB;CAAE;AAC9B;MACE,eAAe;CAAE;AACrB;IACE,eAAe;IACf,OAAO;IACP,YAAY;IACZ,+BAA+B;IAC/B,uBAAuB;IACvB,mBAAmB;IACnB,OAAO;IACP,uBAAuB;IACvB,OAAO;IACP,WAAW;IACX,OAAO;IACP,iBAAiB;IACjB,OAAO;IACP,iBAAiB;IACjB,YAAY;IACZ,6BAA6B;IAC7B,kBAAkB;IAClB,uBAAuB;IACvB,OAAO;IACP,OAAO;CAAE;AACT;MACE,0CAA0C;CAAE;AAC9C;MACE,mBAAmB;MACnB,OAAO;MACP,WAAW;MACX,OAAO;MACP,aAAa;MACb,OAAO;MACP,qBAAqB;MACrB,OAAO;CAAE;AACX;MACE,YAAY;MACZ,+BAA+B;MAC/B,uBAAuB;MACvB,eAAe;MACf,QAAQ;MACR,mBAAmB;MACnB,QAAQ;MACR,aAAa;MACb,QAAQ;MACR,wBAAwB;MACxB,QAAQ;MACR,uBAAuB;MACvB,QAAQ;MACR,yBAAyB;MACzB,QAAQ;MACR,sBAAsB;MACtB,QAAQ;MACR,iBAAiB;MACjB,QAAQ;MACR,oBAAoB;MACpB,QAAQ;MACR,kBAAkB;MAClB,QAAQ;CAAE;AACV;QACE,cAAc;QACd,QAAQ;CAAE;AAChB;IACE,qBAAqB;IACrB,yBAAyB;IACzB,iBAAiB;IACjB,kBAAkB;CAAE;AACpB;MACE,eAAe;MACf,YAAY;MACZ,oBAAoB;MACpB,mBAAmB;MACnB,kBAAkB;MAClB,uBAAuB;MACvB,oBAAoB;MACpB,yBAAyB;MACzB,YAAY;MACZ,oBAAoB;CAAE;AACtB;QACE,sBAAsB;CAAE;AAC1B;QACE,oBAAoB;CAAE;AAC5B;IACE,0BAA0B;IAC1B,kCAAkC;IAClC,UAAU;IACV,kBAAkB;IAClB,UAAU;IACV,mBAAmB;IACnB,iBAAiB;CAAE;AACnB;MACE,kBAAkB;MAClB,uBAAuB;MACvB,oBAAoB;MACpB,6BAA6B;MAC7B,WAAW;CAAE;AACf;MACE,kBAAkB;MAClB,uBAAuB;MACvB,kBAAkB;MAClB,6BAA6B;MAC7B,YAAY;CAAE;AAEpB;EACE,gBAAgB;EAChB,aAAa;EACb,QAAQ;EACR,OAAO;EACP,YAAY;EACZ,aAAa;EACb,+BAA+B;EAC/B,qBAAqB;EACrB,yBAAyB;EACzB,iBAAiB;EACjB,iBAAiB;EACjB,wBAAwB;EACxB,yBAAyB;EACzB,gCAAgC;EAChC,kBAAkB;EAClB,sBAAsB;EACtB,0BAA0B;EAC1B,8BAA8B;CAAE;AAChC;IACE,gBAAgB;IAChB,iBAAiB;IACjB,gg6DAAgg6D;IAChg6D,yBAAyB;IACzB,gDAAgD;CAAE;AAEtD;EACE,gBAAgB;EAChB,aAAa;EACb,SAAS;EACT,OAAO;EACP,mBAAmB;EACnB,WAAW;EACX,iBAAiB;EACjB,sBAAsB;EACtB,6BAA6B;EAC7B,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,WAAW;EACX,0BAA0B;EAC1B,kCAAkC;EAClC,gCAAgC;EAChC,wCAAwC;CAAE;AAC1C;IACE,gCAAgC;IAChC,WAAW;CAAE;AAEjB;AACE;IACE,gCAAgC;CAAE;AACpC;IACE,kCAAkC;CAAE;CAAE;;AAE1C,gBAAgB;AAChB;EACE,eAAe;CAAE;AAEnB;EACE,eAAe;CAAE;AAEnB;EACE,aAAa;CAAE;AAEjB;EACE,YAAY;CAAE;AAEhB;EACE,eAAe;CAAE;AAEnB;EACE,eAAe;CAAE;;AAEnB,YAAY;AACZ;EACE,eAAe;EACf,uBAAuB;CAAE;AAE3B;EACE,cAAc;CAAE;AAElB;EACE,oBAAoB;CAAE;AAExB;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;CAAE;AACzB;IACE,YAAY;IACZ,aAAa;CAAE;AACf;MACE,cAAc;MACd,eAAe;MACf,YAAY;MACZ,aAAa;CAAE;AACjB;MACE,YAAY;MACZ,eAAe;MACf,cAAc;MACd,eAAe;MACf,iBAAiB;MACjB,wBAAwB;MACxB,mBAAmB;MACnB,YAAY;MACZ,eAAe;CAAE;AACrB;IACE,oBAAoB;CAAE;AACtB;MACE,oBAAoB;CAAE;AACxB;MACE,YAAY;MACZ,aAAa;CAAE;AACjB;MACE,cAAc;MACd,mBAAmB;CAAE;AAE3B;EACE,eAAe;EACf,qBAAqB;EACrB,yBAAyB;EACzB,iBAAiB;EACjB,uBAAuB;CAAE;AAE3B;EACE,gBAAgB;EAChB,yBAAyB;EACzB,mBAAmB;CAAE;AAEvB;EACE,YAAY;EACZ,oBAAoB;CAAE;AACtB;IACE,uBAAuB;CAAE","file":"add.vue","sourcesContent":["body, div, p, h1, h2, h3, h4, h5, h6, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, table, th, td {\n  margin: 0;\n  padding: 0; }\n\naddress, cite, em, i {\n  font-style: normal; }\n\nhtml, body, root {\n  height: 100%;\n  overflow: hidden; }\n\nbody {\n  margin: 0 auto;\n  color: #fff;\n  -webkit-appearance: none;\n  background: #fff;\n  font-family: 'PingFang SC','STHeiti','Microsoft YaHei',Helvetica,Arial,sans-serif;\n  color: #878C92; }\n\nli {\n  list-style: none; }\n\nhtml, body {\n  max-width: 750px;\n  margin: 0 auto; }\n\na {\n  color: #535862;\n  text-decoration: none; }\n\na:hover {\n  color: #c40000;\n  text-decoration: underline; }\n\nimg {\n  border: 0; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\n  cursor: pointer;\n  -webkit-appearance: none; }\n\n.clearfix:after, .wrapper:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0; }\n\n.clearfix {\n  display: inline-block; }\n\n/* close commented backslash hack */\n::-webkit-input-placeholder {\n  font-size: .75rem; }\n\n/* height */\n/* public */\n.form .select:before {\n  font-family: \"icons\";\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.icon--down:before, .form .select:before {\n  content: \"\\e600\"; }\n\n@font-face {\n  font-family: 'icons';\n  src: url(data:application/font-woff;charset=utf-8;base64,d09GRk9UVE8AAARgAAoAAAAABBgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANgAAADYZbVvCE9TLzIAAAHMAAAAYAAAAGAIIvy2Y21hcAAAAiwAAABMAAAATBpVzFdnYXNwAAACeAAAAAgAAAAIAAAAEGhlYWQAAAKAAAAANgAAADYAl8viaGhlYQAAArgAAAAkAAAAJANuAeZobXR4AAAC3AAAABQAAAAUAwAAdG1heHAAAALwAAAABgAAAAYABVAAbmFtZQAAAvgAAAFFAAABRVcZpu5wb3N0AAAEQAAAACAAAAAgAAMAAAEABAQAAQEBCGljb21vb24AAQIAAQA6+BwC+BsD+BgEHgoAGVP/i4seCgAZU/+LiwwHi2v4lPh0BR0AAAB2Dx0AAAB7ER0AAAAJHQAAAM8SAAYBAQgPERMWG2ljb21vb25pY29tb29udTB1MXUyMHVFNjAwAAACAYkAAwAFAQEEBwoNTPyUDvyUDvyUDvuUDvgg958VgYD7AiOLi4aFg4iEi4SLg46GkYuL+wLzgZaAloqel5eWlpqMmX8I7yvv6wWZl5qKloCXf4p4gIAIDviUFPiUFYsMCgADAgABkAAFAAABTAFmAAAARwFMAWYAAAD1ABkAhAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOYAAeD/4P/gAeAAIAAAAAEAAAAAAAAAAAAAACAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQAOAAAAAoACAACAAIAAQAg5gD//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAQAAss1nQF8PPPUACwIAAAAAAM/2xdgAAAAAz/bF2AAAAAABjAE1AAAACAACAAAAAAAAAAEAAAHg/+AAAAIAAAAAAAGMAAEAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAQAAAAIAAHQAAFAAAAUAAAAAAA4ArgABAAAAAAABAA4AAAABAAAAAAACAA4ARwABAAAAAAADAA4AJAABAAAAAAAEAA4AVQABAAAAAAAFABYADgABAAAAAAAGAAcAMgABAAAAAAAKADQAYwADAAEECQABAA4AAAADAAEECQACAA4ARwADAAEECQADAA4AJAADAAEECQAEAA4AVQADAAEECQAFABYADgADAAEECQAGAA4AOQADAAEECQAKADQAYwBpAGMAbwBtAG8AbwBuAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuAFIAZQBnAHUAbABhAHIAaQBjAG8AbQBvAG8AbgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format(\"woff\");\n  font-weight: normal;\n  font-style: normal; }\n\n.form {\n  font-size: 0.875rem; }\n  .form ul {\n    margin-bottom: 0.625rem;\n    padding: 0 0.625rem;\n    border-top: 0.0625rem solid #ddd;\n    border-bottom: 0.0625rem solid #ddd;\n    background: #fff; }\n  .form li {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.3125rem 0; }\n    .form li > input[type='text'], .form li > input[type='password'], .form li > input[type='tel'], .form li > input[type='date'], .form li > label, .form li > textarea {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      height: 1.5625rem;\n      line-height: 1.5625rem;\n      border: 0.0625rem solid #ddd;\n      padding: 0.25rem; }\n    .form li > textarea {\n      display: block;\n      width: 100%;\n      height: 3.75rem;\n      padding: 0.3125rem;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      -webkit-appearance: none; }\n    .form li > label {\n      border: none; }\n    .form li > input:not(:first-child) {\n      margin-left: 0.625rem; }\n    .form li input:not([type='radio']) {\n      background: #fff;\n      -webkit-appearance: none; }\n      .form li input:not([type='radio'])[type='radio'] {\n        margin-right: 0.3125rem; }\n    .form li select {\n      display: block; }\n  .form .select {\n    display: block;\n    /* 1 */\n    width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    position: relative;\n    /* 2 */\n    vertical-align: middle;\n    /* 3 */\n    padding: 0;\n    /* 4 */\n    overflow: hidden;\n    /* 5 */\n    background: #fff;\n    color: #555;\n    border: 0.0625rem solid #ddd;\n    text-shadow: none;\n    border-radius: 0.25rem;\n    /* 6 */\n    /* 6 */ }\n    .form .select:hover {\n      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15); }\n    .form .select:before {\n      position: absolute;\n      /* 7 */\n      top: 0.5em;\n      /* 7 */\n      right: 0.5em;\n      /* 7 */\n      pointer-events: none;\n      /* 8 */ }\n    .form .select select {\n      width: 100%;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      padding: 0.5em;\n      /* 10 */\n      padding-right: 2em;\n      /* 11 */\n      border: none;\n      /* 13 */\n      background: transparent;\n      /* 13 */\n      background-image: none;\n      /* 13 */\n      -webkit-appearance: none;\n      /* 13 */\n      -moz-appearance: none;\n      /* 13 */\n      appearance: none;\n      /* 13 */\n      text-indent: 0.01px;\n      /* 14 */\n      text-overflow: '';\n      /* 14 */ }\n      .form .select select:focus {\n        outline: none;\n        /* 16 */ }\n  .form .submit {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.625rem; }\n    .form .submit .btn {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      text-align: center;\n      height: 2.1875rem;\n      line-height: 2.1875rem;\n      background: #f85200;\n      border-radius: 0.1875rem;\n      color: #fff;\n      font-size: 0.875rem; }\n      .form .submit .btn:not(:first-child) {\n        margin-left: 0.625rem; }\n      .form .submit .btn:hover {\n        background: #ff4e00; }\n  .form .error {\n    transition-duration: 0.5s;\n    -webkit-transition-duration: 0.5s;\n    height: 0;\n    margin: 0 1.25rem;\n    border: 0;\n    text-align: center;\n    overflow: hidden; }\n    .form .error.cur {\n      height: 2.0625rem;\n      line-height: 2.0625rem;\n      background: #feffd1;\n      border: 0.0625rem solid #ddd;\n      color: red; }\n    .form .error.right {\n      height: 2.0625rem;\n      line-height: 2.0625rem;\n      background: green;\n      border: 0.0625rem solid #ddd;\n      color: #fff; }\n\n.load-mask {\n  position: fixed;\n  z-index: 999;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.3);\n  display: -webkit-box;\n  display: -webkit-flexbox;\n  display: flexbox;\n  box-pack: center;\n  justify-content: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  box-align: center;\n  align-content: center;\n  -webkit-box-align: center;\n  -webkit-align-content: center; }\n  .load-mask .loadding {\n    width: 3.125rem;\n    height: 3.125rem;\n    background: url(\"data:image/gif;base64,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\") no-repeat;\n    background-size: contain;\n    -webkit-animation: rotation 33s linear infinite; }\n\n.pop-tip {\n  position: fixed;\n  z-index: 999;\n  left: 6%;\n  top: 0;\n  font-size: 0.75rem;\n  width: 88%;\n  height: 1.875rem;\n  line-height: 1.875rem;\n  border: 0.0625rem solid #ddd;\n  background: #fffdc0;\n  color: #333;\n  text-align: center;\n  opacity: 0;\n  transition-duration: 0.3s;\n  -webkit-transition-duration: 0.3s;\n  transform: translateY(-6.25rem);\n  -webkit-transform: translateY(-6.25rem); }\n  .pop-tip.error {\n    border: 0.0625rem solid #e20000;\n    color: red; }\n\n@-webkit-keyframes rotation {\n  from {\n    -webkit-transform: rotate(0deg); }\n  to {\n    -webkit-transform: rotate(360deg); } }\n\n/* link color */\n.red {\n  color: #f42b13; }\n\n.green {\n  color: #16c154; }\n\n.black {\n  color: black; }\n\n.gray {\n  color: #666; }\n\n.blue {\n  color: #2899f2; }\n\n.orange {\n  color: #cb420c; }\n\n/* public */\n.flex {\n  flex-shrink: 0;\n  -webkit-flex-shrink: 0; }\n\ninput {\n  outline: none; }\n\n.container {\n  background: #f8f8f8; }\n\ni {\n  width: 2rem;\n  height: 2rem;\n  margin-left: 0.3125rem; }\n  i.add {\n    width: 2rem;\n    height: 2rem; }\n    i.add:after {\n      width: 0.2rem;\n      height: 1.2rem;\n      top: 0.5rem;\n      left: .95rem; }\n    i.add:before {\n      content: '';\n      height: 0.2rem;\n      width: 1.3rem;\n      display: block;\n      background: #fff;\n      border-radius: 0.625rem;\n      position: absolute;\n      top: .95rem;\n      left: 0.375rem; }\n  i.del {\n    background: #288f00; }\n    i.del:hover {\n      background: #31af00; }\n    i.del:before {\n      width: 1rem;\n      left: 0.5rem; }\n    i.del:after {\n      display: none;\n      visibility: hidden; }\n\n.fieldEdit {\n  width: 6.25rem;\n  display: -webkit-box;\n  display: -webkit-flexbox;\n  display: flexbox;\n  padding-left: 0.625rem; }\n\n.form li .label {\n  width: 5.625rem;\n  padding-right: 0.3125rem;\n  text-align: center; }\n\n.form li .text {\n  box-flex: 1;\n  -webkit-box-flex: 1; }\n  .form li .text label:not(:first-child) {\n    margin-right: 0.625rem; }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "new",
    staticStyle: {
      "overflow-y": "scroll"
    }
  }, [_c('div', {
    staticClass: "form"
  }, [_c('ul', [_c('li', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.title),
      expression: "title"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "标题"
    },
    domProps: {
      "value": _vm._s(_vm.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.title = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('li', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.subTitle),
      expression: "subTitle"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "副标题"
    },
    domProps: {
      "value": _vm._s(_vm.subTitle)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.subTitle = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('li', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.keyword),
      expression: "keyword"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "多个关键字按照空格分割"
    },
    domProps: {
      "value": _vm._s(_vm.keyword)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keyword = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('li', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.author),
      expression: "author"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "作者"
    },
    domProps: {
      "value": _vm._s(_vm.author)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.author = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.source),
      expression: "source"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "来源"
    },
    domProps: {
      "value": _vm._s(_vm.source)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.source = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('li', [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.description),
      expression: "description"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "描述"
    },
    domProps: {
      "value": _vm._s(_vm.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.description = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.categoryId),
      expression: "categoryId"
    }],
    on: {
      "change": [function($event) {
        _vm.categoryId = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }, _vm.categoryEvent]
    }
  }, [_c('option', {
    attrs: {
      "value": "-1"
    }
  }, [_vm._v("请选择部门")]), _vm._v(" "), _vm._l((_vm.data.listCategory), function(option) {
    return _c('option', {
      domProps: {
        "value": option.id
      }
    }, [_vm._v("\r\n\t\t\t\t\t\t\t" + _vm._s(option.categoryName) + "\r\n\t\t\t\t\t\t")])
  })], 2)])]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.channelId),
      expression: "channelId"
    }],
    on: {
      "change": [function($event) {
        _vm.channelId = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }, _vm.listChannelEvent]
    }
  }, [_c('option', {
    attrs: {
      "value": "-1"
    }
  }, [_vm._v("请选择频道分类")]), _vm._v(" "), _vm._l((_vm.data.currentChannelList), function(option) {
    return _c('option', {
      domProps: {
        "value": option.id
      }
    }, [_vm._v("\r\n\t\t\t\t\t\t\t" + _vm._s(option.channelName) + "\r\n\t\t\t\t\t\t")])
  })], 2)])]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.columnId),
      expression: "columnId"
    }],
    on: {
      "change": function($event) {
        _vm.columnId = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "-1"
    }
  }, [_vm._v("请选择栏目分类")]), _vm._v(" "), _vm._l((_vm.data.newscolumnlist), function(option) {
    return _c('option', {
      domProps: {
        "value": option.id
      }
    }, [_vm._v("\r\n\t\t\t\t\t\t\t" + _vm._s(option.columnName) + "\r\n\t\t\t\t\t\t")])
  })], 2)])]), _vm._v(" "), _c('li'), _vm._v(" "), _c('li', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.field1),
      expression: "field1"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "扩展字段1"
    },
    domProps: {
      "value": _vm._s(_vm.field1)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.field1 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "fieldEdit"
  }, [_c('i', {
    staticClass: "add",
    on: {
      "click": _vm.addField
    }
  })])]), _vm._v(" "), _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field2Show),
      expression: "field2Show"
    }]
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.field2),
      expression: "field2"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "扩展字段2"
    },
    domProps: {
      "value": _vm._s(_vm.field2)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.field2 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "fieldEdit"
  }, [_c('i', {
    staticClass: "add",
    on: {
      "click": _vm.addField
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "add del",
    on: {
      "click": _vm.delField
    }
  })])]), _vm._v(" "), _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field3Show),
      expression: "field3Show"
    }]
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.field3),
      expression: "field3"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "扩展字段3"
    },
    domProps: {
      "value": _vm._s(_vm.field3)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.field3 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "fieldEdit"
  }, [_c('i', {
    staticClass: "add",
    on: {
      "click": _vm.addField
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "add del",
    on: {
      "click": _vm.delField
    }
  })])]), _vm._v(" "), _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field4Show),
      expression: "field4Show"
    }]
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.field4),
      expression: "field4"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "扩展字段4"
    },
    domProps: {
      "value": _vm._s(_vm.field4)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.field4 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "fieldEdit"
  }, [_c('i', {
    staticClass: "add",
    on: {
      "click": _vm.addField
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "add del",
    on: {
      "click": _vm.delField
    }
  })])]), _vm._v(" "), _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field5Show),
      expression: "field5Show"
    }]
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.field5),
      expression: "field5"
    }],
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "扩展字段5"
    },
    domProps: {
      "value": _vm._s(_vm.field5)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.field5 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "fieldEdit"
  }, [_c('i', {
    staticClass: "add",
    on: {
      "click": _vm.addField
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "add del",
    on: {
      "click": _vm.delField
    }
  })])]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "text"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.autoPublish),
      expression: "autoPublish"
    }],
    attrs: {
      "type": "radio",
      "id": "one",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.autoPublish, "1")
    },
    on: {
      "click": function($event) {
        _vm.autoPublish = "1"
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "one"
    }
  }, [_vm._v("发布")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.autoPublish),
      expression: "autoPublish"
    }],
    attrs: {
      "type": "radio",
      "id": "two",
      "value": "0"
    },
    domProps: {
      "checked": _vm._q(_vm.autoPublish, "0")
    },
    on: {
      "click": function($event) {
        _vm.autoPublish = "0"
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "two"
    }
  }, [_vm._v("不发布")])])]), _vm._v(" "), _c('li', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.timer),
      expression: "timer"
    }],
    attrs: {
      "type": "date"
    },
    domProps: {
      "value": _vm._s(_vm.timer)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.timer = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('li', [_c('vue2-html5-editor', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.content),
      expression: "content"
    }],
    attrs: {
      "height": 500
    },
    domProps: {
      "value": (_vm.content)
    },
    on: {
      "input": function($event) {
        _vm.content = $event
      }
    }
  })], 1)]), _vm._v(" "), _vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "submit"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("提交")]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_vm._v("保存草稿箱")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2b6a4b33", module.exports)
  }
}

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(184);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("6497d93c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2b6a4b33!./../../../../../node_modules/sass-loader/lib/loader.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./add.vue", function() {
     var newContent = require("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2b6a4b33!./../../../../../node_modules/sass-loader/lib/loader.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./add.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(201)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(106),
  /* template */
  __webpack_require__(194),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\myProjuct\\yang.z\\mobile-html\\js\\new\\add.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] add.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2b6a4b33", Component.options)
  } else {
    hotAPI.reload("data-v-2b6a4b33", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var url = '/app';
module.exports = {
	upload: {
		uploadVideo: url + '/upload/uploadVideo',
		uploadVideo2: url + '/upload/uploadVideo2',
		uploadImage: url + '/upload/uploadImage',
		createImages: url + '/upload/createImages'
	},
	images: {
		images: url + '/images/imageslist'
	},
	login: {
		login: url + '/login',
		init: url + '/login/init'
	},
	video: {
		videolist: url + '/video/videolist'
	},
	news: {
		newslist: url + '/news/newslist',
		newscolumnlist: url + '/newscolumn/newscolumnlist', //栏目列表
		delNews: url + '/news/delNews' },
	category: { //部门分类
		listCategory: url + '/category/listCategory' },
	channel: { //获取频道分类列表
		currentChannelList: url + '/channel/currentChannelList'
	}
};

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var T = {
	loadding: function loadding(b) {
		if (!T.load) {
			T.load = $('<div class="load-mask"><div class="loadding"></div></div>');
		}
		if (b) {
			T.load.appendTo($('body'));
		} else {
			T.load.remove();
		}
	},
	pop: function pop(val, cls, time) {
		cls = cls || '';
		time = time || 3;
		if (!T.popHtml) {
			T.popHtml = $("<div class='pop-tip'></div>").appendTo($('body'));
		}
		T.popHtml.removeClass('error');
		T.popHtml.addClass(cls);
		setTimeout(function () {
			var height = parseInt($(window).height() / 2);
			T.popHtml.html(val);
			T.popHtml.css({ opacity: 1 });
			T.popHtml.css({ 'transform': 'translateY(' + height + 'px)' });
			T.popHtml.css({ '-webkit-transform': 'translateY(' + height + 'px)' });
			setTimeout(function () {
				T.popHtml.css({ opacity: 0 });
				T.popHtml.css({ 'transform': 'translateY(0)' });
				T.popHtml.css({ '-webkit-transform': 'translateY(0)' });
			}, time * 1000);
		}, 50);
	},
	ajax: function ajax(obj) {
		obj.type = obj.type || 'get';
		obj.dataType = obj.dataType || 'json';
		T.loadding(true);
		$.ajax({
			url: obj.url,
			type: obj.type,
			dataType: obj.dataType,
			data: obj.data,
			success: function success(_data) {
				T.loadding();
				if (_data.code == 0) {
					obj.success(_data);
				} else {
					if (obj.alert == false) {
						obj.success(_data);
						return;
					};
					if (_data.code == -110 || _data.code == -1) {
						//未登录
						router.push('/login');
						return;
					} else if (_data.code == -111) {//无权限								
					}
				}
			},
			error: function error() {}
		});
	}
};
module.exports = T;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ })

});
//# sourceMappingURL=3_chunk.js.map?name=5e91745ebd508ccc06b7