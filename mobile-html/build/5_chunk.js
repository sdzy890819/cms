webpackJsonp([5],{

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(59)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(53),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Myindex\\myproject\\yang\\mobile-html\\js\\image\\add.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] add.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8196eca4", Component.options)
  } else {
    hotAPI.reload("data-v-8196eca4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

exports.default = {
	data: function data() {
		return {
			filed: true,
			shuo: 'false',
			size: 'false'
		};
	},

	methods: {
		file: function file(evet) {
			var self = this,
			    tag = $(event.currentTarget),
			    file = $('#file');
			file.bind('change', function () {
				self.filed = true;
				tag.removeClass('gray');
				var file = this.files[0];
				//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
				if (!/image\/\w+/.test(file.type)) {
					alert("请确保文件为图像类型");
					return false;
				}
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function (e) {
					$('#img').attr('src', this.result).parent().show();
				};
			});
			if (self.filed == true) {
				self.filed = false;
				tag.addClass('gray');
				file.click();
			}
		}
	}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "\nbody, div, p, h1, h2, h3, h4, h5, h6, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, table, th, td {\n  margin: 0;\n  padding: 0;\n}\naddress, cite, em, i {\n  font-style: normal;\n}\nhtml, body, root {\n  height: 100%;\n  overflow: hidden;\n}\nbody {\n  margin: 0 auto;\n  color: #fff;\n  -webkit-appearance: none;\n  background: #fff;\n  font-family: 'PingFang SC','STHeiti','Microsoft YaHei',Helvetica,Arial,sans-serif;\n  color: #878C92;\n}\nli {\n  list-style: none;\n}\nhtml, body {\n  max-width: 750px;\n  margin: 0 auto;\n}\na {\n  color: #535862;\n  text-decoration: none;\n}\na:hover {\n  color: #c40000;\n  text-decoration: underline;\n}\nimg {\n  border: 0;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\n  cursor: pointer;\n  -webkit-appearance: none;\n}\n.clearfix:after, .wrapper:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.clearfix {\n  display: inline-block;\n}\n\n/* close commented backslash hack */\n::-webkit-input-placeholder {\n  font-size: .75rem;\n}\n\n/* height */\n/* public */\n.form .select:before {\n  font-family: \"icons\";\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.icon--down:before, .form .select:before {\n  content: \"\\E600\";\n}\n@font-face {\n  font-family: 'icons';\n  src: url(data:application/font-woff;charset=utf-8;base64,d09GRk9UVE8AAARgAAoAAAAABBgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANgAAADYZbVvCE9TLzIAAAHMAAAAYAAAAGAIIvy2Y21hcAAAAiwAAABMAAAATBpVzFdnYXNwAAACeAAAAAgAAAAIAAAAEGhlYWQAAAKAAAAANgAAADYAl8viaGhlYQAAArgAAAAkAAAAJANuAeZobXR4AAAC3AAAABQAAAAUAwAAdG1heHAAAALwAAAABgAAAAYABVAAbmFtZQAAAvgAAAFFAAABRVcZpu5wb3N0AAAEQAAAACAAAAAgAAMAAAEABAQAAQEBCGljb21vb24AAQIAAQA6+BwC+BsD+BgEHgoAGVP/i4seCgAZU/+LiwwHi2v4lPh0BR0AAAB2Dx0AAAB7ER0AAAAJHQAAAM8SAAYBAQgPERMWG2ljb21vb25pY29tb29udTB1MXUyMHVFNjAwAAACAYkAAwAFAQEEBwoNTPyUDvyUDvyUDvuUDvgg958VgYD7AiOLi4aFg4iEi4SLg46GkYuL+wLzgZaAloqel5eWlpqMmX8I7yvv6wWZl5qKloCXf4p4gIAIDviUFPiUFYsMCgADAgABkAAFAAABTAFmAAAARwFMAWYAAAD1ABkAhAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOYAAeD/4P/gAeAAIAAAAAEAAAAAAAAAAAAAACAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQAOAAAAAoACAACAAIAAQAg5gD//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAQAAss1nQF8PPPUACwIAAAAAAM/2xdgAAAAAz/bF2AAAAAABjAE1AAAACAACAAAAAAAAAAEAAAHg/+AAAAIAAAAAAAGMAAEAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAQAAAAIAAHQAAFAAAAUAAAAAAA4ArgABAAAAAAABAA4AAAABAAAAAAACAA4ARwABAAAAAAADAA4AJAABAAAAAAAEAA4AVQABAAAAAAAFABYADgABAAAAAAAGAAcAMgABAAAAAAAKADQAYwADAAEECQABAA4AAAADAAEECQACAA4ARwADAAEECQADAA4AJAADAAEECQAEAA4AVQADAAEECQAFABYADgADAAEECQAGAA4AOQADAAEECQAKADQAYwBpAGMAbwBtAG8AbwBuAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuAFIAZQBnAHUAbABhAHIAaQBjAG8AbQBvAG8AbgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format(\"woff\");\n  font-weight: normal;\n  font-style: normal;\n}\n.form {\n  font-size: 0.875rem;\n}\n.form ul {\n    margin-bottom: 0.625rem;\n    padding: 0 0.625rem;\n    border-top: 0.0625rem solid #ddd;\n    border-bottom: 0.0625rem solid #ddd;\n    background: #fff;\n}\n.form li {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.3125rem 0;\n}\n.form li > input[type='text'], .form li > input[type='tel'], .form li > input[type='date'], .form li > label, .form li > textarea {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      height: 1.5625rem;\n      line-height: 1.5625rem;\n      border: 0.0625rem solid #ddd;\n      padding: 0.25rem;\n}\n.form li > textarea {\n      display: block;\n      width: 100%;\n      height: 3.75rem;\n      padding: 0.3125rem;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      -webkit-appearance: none;\n}\n.form li > label {\n      border: none;\n}\n.form li > input:not(:first-child) {\n      margin-left: 0.625rem;\n}\n.form li input:not([type='radio']) {\n      background: #fff;\n      -webkit-appearance: none;\n}\n.form li input:not([type='radio'])[type='radio'] {\n        margin-right: 0.3125rem;\n}\n.form li select {\n      display: block;\n}\n.form .select {\n    display: block;\n    /* 1 */\n    width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    position: relative;\n    /* 2 */\n    vertical-align: middle;\n    /* 3 */\n    padding: 0;\n    /* 4 */\n    overflow: hidden;\n    /* 5 */\n    background: #fff;\n    color: #555;\n    border: 0.0625rem solid #ddd;\n    text-shadow: none;\n    border-radius: 0.25rem;\n    /* 6 */\n    /* 6 */\n}\n.form .select:hover {\n      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n}\n.form .select:before {\n      position: absolute;\n      /* 7 */\n      top: 0.5em;\n      /* 7 */\n      right: 0.5em;\n      /* 7 */\n      pointer-events: none;\n      /* 8 */\n}\n.form .select select {\n      width: 100%;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      padding: 0.5em;\n      /* 10 */\n      padding-right: 2em;\n      /* 11 */\n      border: none;\n      /* 13 */\n      background: transparent;\n      /* 13 */\n      background-image: none;\n      /* 13 */\n      -webkit-appearance: none;\n      /* 13 */\n      -moz-appearance: none;\n      /* 13 */\n      appearance: none;\n      /* 13 */\n      text-indent: 0.01px;\n      /* 14 */\n      text-overflow: '';\n      /* 14 */\n}\n.form .select select:focus {\n        outline: none;\n        /* 16 */\n}\n.form .submit {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.625rem;\n}\n.form .submit .btn {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      text-align: center;\n      height: 2.1875rem;\n      line-height: 2.1875rem;\n      background: #f85200;\n      border-radius: 0.1875rem;\n      color: #fff;\n      font-size: 0.875rem;\n}\n.form .submit .btn:not(:first-child) {\n        margin-left: 0.625rem;\n}\n.form .submit .btn:hover {\n        background: #ff4e00;\n}\n\n/* link color */\n.red {\n  color: #f42b13;\n}\n.green {\n  color: #16c154;\n}\n.black {\n  color: black;\n}\n.gray {\n  color: #666;\n}\n.blue {\n  color: #2899f2;\n}\n.orange {\n  color: #cb420c;\n}\n\n/* public */\n.flex {\n  flex-shrink: 0;\n  -webkit-flex-shrink: 0;\n}\ninput {\n  outline: none;\n}\n.container {\n  background: #f8f8f8;\n}\n.image .form {\n  margin-top: 0.9375rem;\n  overflow: hidden;\n}\n.image .form input[type='file'] {\n    display: none;\n}\n.image .form .btn-file {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    border-radius: 0.1875rem;\n    display: block;\n    width: 100%;\n    height: 2.1875rem;\n    line-height: 2.1875rem;\n    text-align: center;\n    border: 0.0625rem solid #ddd;\n    background: #d00000;\n    color: #fff;\n}\n.image .form .btn-file.gray {\n      background: gray;\n}\n.image .form li {\n    padding: 0.625rem 0;\n}\n.image .form li .label {\n      width: 5.625rem;\n      padding-right: 0.3125rem;\n      text-align: center;\n}\n.image .form li .text {\n      box-flex: 1;\n      -webkit-box-flex: 1;\n}\n.image .form li .text label:not(:first-child) {\n        margin-right: 0.625rem;\n}\n.image .form li #img {\n      display: block;\n      margin: 0 auto;\n      max-width: 10rem;\n      max-height: 10rem;\n      border: 0.0625rem solid #ddd;\n      padding: 0.0625rem;\n      background: #fff;\n}\n", "", {"version":3,"sources":["/./js/image/add.vue"],"names":[],"mappings":"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","file":"add.vue","sourcesContent":["body, div, p, h1, h2, h3, h4, h5, h6, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, table, th, td {\n  margin: 0;\n  padding: 0; }\n\naddress, cite, em, i {\n  font-style: normal; }\n\nhtml, body, root {\n  height: 100%;\n  overflow: hidden; }\n\nbody {\n  margin: 0 auto;\n  color: #fff;\n  -webkit-appearance: none;\n  background: #fff;\n  font-family: 'PingFang SC','STHeiti','Microsoft YaHei',Helvetica,Arial,sans-serif;\n  color: #878C92; }\n\nli {\n  list-style: none; }\n\nhtml, body {\n  max-width: 750px;\n  margin: 0 auto; }\n\na {\n  color: #535862;\n  text-decoration: none; }\n\na:hover {\n  color: #c40000;\n  text-decoration: underline; }\n\nimg {\n  border: 0; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\n  cursor: pointer;\n  -webkit-appearance: none; }\n\n.clearfix:after, .wrapper:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0; }\n\n.clearfix {\n  display: inline-block; }\n\n/* close commented backslash hack */\n::-webkit-input-placeholder {\n  font-size: .75rem; }\n\n/* height */\n/* public */\n.form .select:before {\n  font-family: \"icons\";\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.icon--down:before, .form .select:before {\n  content: \"\\e600\"; }\n\n@font-face {\n  font-family: 'icons';\n  src: url(data:application/font-woff;charset=utf-8;base64,d09GRk9UVE8AAARgAAoAAAAABBgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANgAAADYZbVvCE9TLzIAAAHMAAAAYAAAAGAIIvy2Y21hcAAAAiwAAABMAAAATBpVzFdnYXNwAAACeAAAAAgAAAAIAAAAEGhlYWQAAAKAAAAANgAAADYAl8viaGhlYQAAArgAAAAkAAAAJANuAeZobXR4AAAC3AAAABQAAAAUAwAAdG1heHAAAALwAAAABgAAAAYABVAAbmFtZQAAAvgAAAFFAAABRVcZpu5wb3N0AAAEQAAAACAAAAAgAAMAAAEABAQAAQEBCGljb21vb24AAQIAAQA6+BwC+BsD+BgEHgoAGVP/i4seCgAZU/+LiwwHi2v4lPh0BR0AAAB2Dx0AAAB7ER0AAAAJHQAAAM8SAAYBAQgPERMWG2ljb21vb25pY29tb29udTB1MXUyMHVFNjAwAAACAYkAAwAFAQEEBwoNTPyUDvyUDvyUDvuUDvgg958VgYD7AiOLi4aFg4iEi4SLg46GkYuL+wLzgZaAloqel5eWlpqMmX8I7yvv6wWZl5qKloCXf4p4gIAIDviUFPiUFYsMCgADAgABkAAFAAABTAFmAAAARwFMAWYAAAD1ABkAhAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOYAAeD/4P/gAeAAIAAAAAEAAAAAAAAAAAAAACAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQAOAAAAAoACAACAAIAAQAg5gD//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAQAAss1nQF8PPPUACwIAAAAAAM/2xdgAAAAAz/bF2AAAAAABjAE1AAAACAACAAAAAAAAAAEAAAHg/+AAAAIAAAAAAAGMAAEAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAQAAAAIAAHQAAFAAAAUAAAAAAA4ArgABAAAAAAABAA4AAAABAAAAAAACAA4ARwABAAAAAAADAA4AJAABAAAAAAAEAA4AVQABAAAAAAAFABYADgABAAAAAAAGAAcAMgABAAAAAAAKADQAYwADAAEECQABAA4AAAADAAEECQACAA4ARwADAAEECQADAA4AJAADAAEECQAEAA4AVQADAAEECQAFABYADgADAAEECQAGAA4AOQADAAEECQAKADQAYwBpAGMAbwBtAG8AbwBuAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuAFIAZQBnAHUAbABhAHIAaQBjAG8AbQBvAG8AbgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format(\"woff\");\n  font-weight: normal;\n  font-style: normal; }\n\n.form {\n  font-size: 0.875rem; }\n  .form ul {\n    margin-bottom: 0.625rem;\n    padding: 0 0.625rem;\n    border-top: 0.0625rem solid #ddd;\n    border-bottom: 0.0625rem solid #ddd;\n    background: #fff; }\n  .form li {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.3125rem 0; }\n    .form li > input[type='text'], .form li > input[type='tel'], .form li > input[type='date'], .form li > label, .form li > textarea {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      height: 1.5625rem;\n      line-height: 1.5625rem;\n      border: 0.0625rem solid #ddd;\n      padding: 0.25rem; }\n    .form li > textarea {\n      display: block;\n      width: 100%;\n      height: 3.75rem;\n      padding: 0.3125rem;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      -webkit-appearance: none; }\n    .form li > label {\n      border: none; }\n    .form li > input:not(:first-child) {\n      margin-left: 0.625rem; }\n    .form li input:not([type='radio']) {\n      background: #fff;\n      -webkit-appearance: none; }\n      .form li input:not([type='radio'])[type='radio'] {\n        margin-right: 0.3125rem; }\n    .form li select {\n      display: block; }\n  .form .select {\n    display: block;\n    /* 1 */\n    width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    position: relative;\n    /* 2 */\n    vertical-align: middle;\n    /* 3 */\n    padding: 0;\n    /* 4 */\n    overflow: hidden;\n    /* 5 */\n    background: #fff;\n    color: #555;\n    border: 0.0625rem solid #ddd;\n    text-shadow: none;\n    border-radius: 0.25rem;\n    /* 6 */\n    /* 6 */ }\n    .form .select:hover {\n      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15); }\n    .form .select:before {\n      position: absolute;\n      /* 7 */\n      top: 0.5em;\n      /* 7 */\n      right: 0.5em;\n      /* 7 */\n      pointer-events: none;\n      /* 8 */ }\n    .form .select select {\n      width: 100%;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      padding: 0.5em;\n      /* 10 */\n      padding-right: 2em;\n      /* 11 */\n      border: none;\n      /* 13 */\n      background: transparent;\n      /* 13 */\n      background-image: none;\n      /* 13 */\n      -webkit-appearance: none;\n      /* 13 */\n      -moz-appearance: none;\n      /* 13 */\n      appearance: none;\n      /* 13 */\n      text-indent: 0.01px;\n      /* 14 */\n      text-overflow: '';\n      /* 14 */ }\n      .form .select select:focus {\n        outline: none;\n        /* 16 */ }\n  .form .submit {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.625rem; }\n    .form .submit .btn {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      text-align: center;\n      height: 2.1875rem;\n      line-height: 2.1875rem;\n      background: #f85200;\n      border-radius: 0.1875rem;\n      color: #fff;\n      font-size: 0.875rem; }\n      .form .submit .btn:not(:first-child) {\n        margin-left: 0.625rem; }\n      .form .submit .btn:hover {\n        background: #ff4e00; }\n\n/* link color */\n.red {\n  color: #f42b13; }\n\n.green {\n  color: #16c154; }\n\n.black {\n  color: black; }\n\n.gray {\n  color: #666; }\n\n.blue {\n  color: #2899f2; }\n\n.orange {\n  color: #cb420c; }\n\n/* public */\n.flex {\n  flex-shrink: 0;\n  -webkit-flex-shrink: 0; }\n\ninput {\n  outline: none; }\n\n.container {\n  background: #f8f8f8; }\n\n.image .form {\n  margin-top: 0.9375rem;\n  overflow: hidden; }\n  .image .form input[type='file'] {\n    display: none; }\n  .image .form .btn-file {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    border-radius: 0.1875rem;\n    display: block;\n    width: 100%;\n    height: 2.1875rem;\n    line-height: 2.1875rem;\n    text-align: center;\n    border: 0.0625rem solid #ddd;\n    background: #d00000;\n    color: #fff; }\n    .image .form .btn-file.gray {\n      background: gray; }\n  .image .form li {\n    padding: 0.625rem 0; }\n    .image .form li .label {\n      width: 5.625rem;\n      padding-right: 0.3125rem;\n      text-align: center; }\n    .image .form li .text {\n      box-flex: 1;\n      -webkit-box-flex: 1; }\n      .image .form li .text label:not(:first-child) {\n        margin-right: 0.625rem; }\n    .image .form li #img {\n      display: block;\n      margin: 0 auto;\n      max-width: 10rem;\n      max-height: 10rem;\n      border: 0.0625rem solid #ddd;\n      padding: 0.0625rem;\n      background: #fff; }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "image"
  }, [_c('div', {
    staticClass: "form"
  }, [_c('ul', [_c('li', [_c('input', {
    attrs: {
      "id": "file",
      "type": "file",
      "value": "上传图片"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "btn-file",
    on: {
      "click": _vm.file
    }
  }, [_vm._v("+上传图片")])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "label"
  }, [_vm._v("是否等比缩放")]), _vm._v(" "), _c('div', {
    staticClass: "text"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.shuo),
      expression: "shuo"
    }],
    attrs: {
      "type": "radio",
      "id": "one1",
      "value": "true"
    },
    domProps: {
      "checked": _vm._q(_vm.shuo, "true")
    },
    on: {
      "click": function($event) {
        _vm.shuo = "true"
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "one1"
    }
  }, [_vm._v("是")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.shuo),
      expression: "shuo"
    }],
    attrs: {
      "type": "radio",
      "id": "two1",
      "value": "false"
    },
    domProps: {
      "checked": _vm._q(_vm.shuo, "false")
    },
    on: {
      "click": function($event) {
        _vm.shuo = "false"
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "two1"
    }
  }, [_vm._v("否")])])]), _vm._v(" "), _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.shuo == "true"),
      expression: "shuo==\"true\""
    }]
  }, [_c('div', {
    staticClass: "label"
  }, [_vm._v("等比缩放选择")]), _vm._v(" "), _c('div', {
    staticClass: "text"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.size),
      expression: "size"
    }],
    attrs: {
      "type": "radio",
      "id": "one2",
      "value": "true"
    },
    domProps: {
      "checked": _vm._q(_vm.size, "true")
    },
    on: {
      "click": function($event) {
        _vm.size = "true"
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "one2"
    }
  }, [_vm._v("是")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.size),
      expression: "size"
    }],
    attrs: {
      "type": "radio",
      "id": "two2",
      "value": "false"
    },
    domProps: {
      "checked": _vm._q(_vm.size, "false")
    },
    on: {
      "click": function($event) {
        _vm.size = "false"
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "two2"
    }
  }, [_vm._v("否")])])]), _vm._v(" "), _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.shuo == "true" && _vm.size == "true"),
      expression: "shuo==\"true\"&&size==\"true\""
    }]
  }, [_c('input', {
    staticClass: "text",
    attrs: {
      "type": "tel",
      "placeholder": "图片宽度"
    }
  })]), _vm._v(" "), _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.shuo == "true" && _vm.size == "false"),
      expression: "shuo==\"true\"&&size==\"false\""
    }]
  }, [_c('input', {
    staticClass: "text",
    attrs: {
      "type": "tel",
      "placeholder": "图片高度"
    }
  })])]), _vm._v(" "), _vm._m(3)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticStyle: {
      "display": "none"
    }
  }, [_c('img', {
    attrs: {
      "id": "img"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('input', {
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "图片标题"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('div', {
    staticClass: "label"
  }, [_vm._v("是否水印")]), _vm._v(" "), _c('div', {
    staticClass: "text"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "id": "one",
      "value": "true"
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "one"
    }
  }, [_vm._v("是")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "radio",
      "id": "two",
      "value": "false"
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "two"
    }
  }, [_vm._v("否")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "submit"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("提交")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8196eca4", module.exports)
  }
}

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("392f0614", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8196eca4!./../../../../../../node_modules/sass-loader/lib/loader.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./add.vue", function() {
     var newContent = require("!!./../../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8196eca4!./../../../../../../node_modules/sass-loader/lib/loader.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./add.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});
//# sourceMappingURL=5_chunk.js.map?name=8b6efeed84eb1678154f