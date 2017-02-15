webpackJsonp([0],{

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(51)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(45),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Myindex\\myproject\\yang\\mobile-html\\js\\video\\list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b87767e", Component.options)
  } else {
    hotAPI.reload("data-v-0b87767e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
	props: {},
	data: function data() {
		return {};
	}
};

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\nbody, div, p, h1, h2, h3, h4, h5, h6, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, table, th, td {\n  margin: 0;\n  padding: 0;\n}\naddress, cite, em, i {\n  font-style: normal;\n}\nhtml, body, root {\n  height: 100%;\n  overflow: hidden;\n}\nbody {\n  margin: 0 auto;\n  color: #fff;\n  -webkit-appearance: none;\n  background: #fff;\n  font-family: 'PingFang SC','STHeiti','Microsoft YaHei',Helvetica,Arial,sans-serif;\n  color: #878C92;\n}\nli {\n  list-style: none;\n}\nhtml, body {\n  max-width: 750px;\n  margin: 0 auto;\n}\na {\n  color: #535862;\n  text-decoration: none;\n}\na:hover {\n  color: #c40000;\n  text-decoration: underline;\n}\nimg {\n  border: 0;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\n  cursor: pointer;\n  -webkit-appearance: none;\n}\n.clearfix:after, .wrapper:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.clearfix {\n  display: inline-block;\n}\n\n/* close commented backslash hack */\n::-webkit-input-placeholder {\n  font-size: .75rem;\n}\n\n/* height */\n/* public */\n/* link color */\n.red {\n  color: #f42b13;\n}\n.green {\n  color: #16c154;\n}\n.black {\n  color: black;\n}\n.gray {\n  color: #666;\n}\n.blue {\n  color: #2899f2;\n}\n.orange {\n  color: #cb420c;\n}\n\n/* public */\n.flex {\n  flex-shrink: 0;\n  -webkit-flex-shrink: 0;\n}\ninput {\n  outline: none;\n}\n.container {\n  background: #f8f8f8;\n}\n.video .video-list {\n  box-flex: 1;\n  -webkit-box-flex: 1;\n  overflow-y: scroll;\n}\n.video .video-list dl {\n    line-height: 1.375rem;\n    margin-bottom: 0.625rem;\n    padding: 0.625rem 0.625rem 0.3125rem;\n    border-top: 0.0625rem solid #ddd;\n    border-bottom: 0.0625rem solid #ddd;\n    background: #fff;\n    overflow: hidden;\n}\n@media only screen and (min-device-width: 320px) and (max-device-width: 340px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) and (-webkit-max-device-pixel-ratio: 2) {\n.video .video-list dl {\n        line-height: 1.17857rem;\n}\n}\n@media only screen and (min-device-width: 240px) and (max-device-width: 600px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 0.75) and (-webkit-max-device-pixel-ratio: 1.9) {\n.video .video-list dl {\n        line-height: 1.17857rem;\n}\n}\n@media only screen and (min-device-width: 410px) and (max-device-width: 500px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2.5) and (-webkit-max-device-pixel-ratio: 4) {\n.video .video-list dl {\n        line-height: 1.51937rem;\n}\n}\n.video .video-list dl dt {\n      height: 1.375rem;\n      font-size: 1rem;\n      color: #444;\n}\n@media only screen and (min-device-width: 320px) and (max-device-width: 340px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) and (-webkit-max-device-pixel-ratio: 2) {\n.video .video-list dl dt {\n          height: 1.17857rem;\n}\n}\n@media only screen and (min-device-width: 240px) and (max-device-width: 600px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 0.75) and (-webkit-max-device-pixel-ratio: 1.9) {\n.video .video-list dl dt {\n          height: 1.17857rem;\n}\n}\n@media only screen and (min-device-width: 410px) and (max-device-width: 500px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2.5) and (-webkit-max-device-pixel-ratio: 4) {\n.video .video-list dl dt {\n          height: 1.51937rem;\n}\n}\n.video .video-list dl dd {\n      max-height: 2.75rem;\n      font-size: 0.875rem;\n}\n@media only screen and (min-device-width: 320px) and (max-device-width: 340px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) and (-webkit-max-device-pixel-ratio: 2) {\n.video .video-list dl dd {\n          max-height: 2.35714rem;\n}\n}\n@media only screen and (min-device-width: 240px) and (max-device-width: 600px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 0.75) and (-webkit-max-device-pixel-ratio: 1.9) {\n.video .video-list dl dd {\n          max-height: 2.35714rem;\n}\n}\n@media only screen and (min-device-width: 410px) and (max-device-width: 500px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2.5) and (-webkit-max-device-pixel-ratio: 4) {\n.video .video-list dl dd {\n          max-height: 3.03875rem;\n}\n}\n.video .video-list dl dd p {\n        overflow: hidden;\n        text-overflow: ellipsis;\n}\n.video .video-list dl dd .aside {\n        margin-top: 0.3125rem;\n        padding-top: 0.3125rem;\n        font-size: 0.75rem;\n        border-top: 0.0625rem dashed #eee;\n}\n.video .video-list dl dd .aside .submit {\n          float: right;\n}\n.video .video-list dl dd .aside .submit .btn {\n            display: inline-block;\n            height: 1.4375rem;\n            line-height: 1.4375rem;\n            padding: 0 0.9375rem;\n            border: 0.0625rem solid #ddd;\n            background: #f8f8f8;\n}\n.video .video-list dl dd .aside .submit .btn:hover {\n              background: #e50000;\n              color: #fff;\n}\n", "", {"version":3,"sources":["/./js/video/list.vue"],"names":[],"mappings":";AAAA;EACE,UAAU;EACV,WAAW;CAAE;AAEf;EACE,mBAAmB;CAAE;AAEvB;EACE,aAAa;EACb,iBAAiB;CAAE;AAErB;EACE,eAAe;EACf,YAAY;EACZ,yBAAyB;EACzB,iBAAiB;EACjB,kFAAkF;EAClF,eAAe;CAAE;AAEnB;EACE,iBAAiB;CAAE;AAErB;EACE,iBAAiB;EACjB,eAAe;CAAE;AAEnB;EACE,eAAe;EACf,sBAAsB;CAAE;AAE1B;EACE,eAAe;EACf,2BAA2B;CAAE;AAE/B;EACE,UAAU;CAAE;AAEd;EACE,0BAA0B;EAC1B,kBAAkB;CAAE;AAEtB;EACE,gBAAgB;EAChB,yBAAyB;CAAE;AAE7B;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CAAE;AAEd;EACE,sBAAsB;CAAE;;AAE1B,oCAAoC;AACpC;EACE,kBAAkB;CAAE;;AAEtB,YAAY;AACZ,YAAY;AACZ,gBAAgB;AAChB;EACE,eAAe;CAAE;AAEnB;EACE,eAAe;CAAE;AAEnB;EACE,aAAa;CAAE;AAEjB;EACE,YAAY;CAAE;AAEhB;EACE,eAAe;CAAE;AAEnB;EACE,eAAe;CAAE;;AAEnB,YAAY;AACZ;EACE,eAAe;EACf,uBAAuB;CAAE;AAE3B;EACE,cAAc;CAAE;AAElB;EACE,oBAAoB;CAAE;AAExB;EACE,YAAY;EACZ,oBAAoB;EACpB,mBAAmB;CAAE;AACrB;IACE,sBAAsB;IACtB,wBAAwB;IACxB,qCAAqC;IACrC,iCAAiC;IACjC,oCAAoC;IACpC,iBAAiB;IACjB,iBAAiB;CAAE;AACnB;AACE;QACE,wBAAwB;CAAE;CAAE;AAChC;AACE;QACE,wBAAwB;CAAE;CAAE;AAChC;AACE;QACE,wBAAwB;CAAE;CAAE;AAChC;MACE,iBAAiB;MACjB,gBAAgB;MAChB,YAAY;CAAE;AACd;AACE;UACE,mBAAmB;CAAE;CAAE;AAC3B;AACE;UACE,mBAAmB;CAAE;CAAE;AAC3B;AACE;UACE,mBAAmB;CAAE;CAAE;AAC7B;MACE,oBAAoB;MACpB,oBAAoB;CAAE;AACtB;AACE;UACE,uBAAuB;CAAE;CAAE;AAC/B;AACE;UACE,uBAAuB;CAAE;CAAE;AAC/B;AACE;UACE,uBAAuB;CAAE;CAAE;AAC/B;QACE,iBAAiB;QACjB,wBAAwB;CAAE;AAC5B;QACE,sBAAsB;QACtB,uBAAuB;QACvB,mBAAmB;QACnB,kCAAkC;CAAE;AACpC;UACE,aAAa;CAAE;AACf;YACE,sBAAsB;YACtB,kBAAkB;YAClB,uBAAuB;YACvB,qBAAqB;YACrB,6BAA6B;YAC7B,oBAAoB;CAAE;AACtB;cACE,oBAAoB;cACpB,YAAY;CAAE","file":"list.vue","sourcesContent":["body, div, p, h1, h2, h3, h4, h5, h6, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, table, th, td {\n  margin: 0;\n  padding: 0; }\n\naddress, cite, em, i {\n  font-style: normal; }\n\nhtml, body, root {\n  height: 100%;\n  overflow: hidden; }\n\nbody {\n  margin: 0 auto;\n  color: #fff;\n  -webkit-appearance: none;\n  background: #fff;\n  font-family: 'PingFang SC','STHeiti','Microsoft YaHei',Helvetica,Arial,sans-serif;\n  color: #878C92; }\n\nli {\n  list-style: none; }\n\nhtml, body {\n  max-width: 750px;\n  margin: 0 auto; }\n\na {\n  color: #535862;\n  text-decoration: none; }\n\na:hover {\n  color: #c40000;\n  text-decoration: underline; }\n\nimg {\n  border: 0; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\n  cursor: pointer;\n  -webkit-appearance: none; }\n\n.clearfix:after, .wrapper:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0; }\n\n.clearfix {\n  display: inline-block; }\n\n/* close commented backslash hack */\n::-webkit-input-placeholder {\n  font-size: .75rem; }\n\n/* height */\n/* public */\n/* link color */\n.red {\n  color: #f42b13; }\n\n.green {\n  color: #16c154; }\n\n.black {\n  color: black; }\n\n.gray {\n  color: #666; }\n\n.blue {\n  color: #2899f2; }\n\n.orange {\n  color: #cb420c; }\n\n/* public */\n.flex {\n  flex-shrink: 0;\n  -webkit-flex-shrink: 0; }\n\ninput {\n  outline: none; }\n\n.container {\n  background: #f8f8f8; }\n\n.video .video-list {\n  box-flex: 1;\n  -webkit-box-flex: 1;\n  overflow-y: scroll; }\n  .video .video-list dl {\n    line-height: 1.375rem;\n    margin-bottom: 0.625rem;\n    padding: 0.625rem 0.625rem 0.3125rem;\n    border-top: 0.0625rem solid #ddd;\n    border-bottom: 0.0625rem solid #ddd;\n    background: #fff;\n    overflow: hidden; }\n    @media only screen and (min-device-width: 320px) and (max-device-width: 340px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) and (-webkit-max-device-pixel-ratio: 2) {\n      .video .video-list dl {\n        line-height: 1.17857rem; } }\n    @media only screen and (min-device-width: 240px) and (max-device-width: 600px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 0.75) and (-webkit-max-device-pixel-ratio: 1.9) {\n      .video .video-list dl {\n        line-height: 1.17857rem; } }\n    @media only screen and (min-device-width: 410px) and (max-device-width: 500px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2.5) and (-webkit-max-device-pixel-ratio: 4) {\n      .video .video-list dl {\n        line-height: 1.51937rem; } }\n    .video .video-list dl dt {\n      height: 1.375rem;\n      font-size: 1rem;\n      color: #444; }\n      @media only screen and (min-device-width: 320px) and (max-device-width: 340px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) and (-webkit-max-device-pixel-ratio: 2) {\n        .video .video-list dl dt {\n          height: 1.17857rem; } }\n      @media only screen and (min-device-width: 240px) and (max-device-width: 600px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 0.75) and (-webkit-max-device-pixel-ratio: 1.9) {\n        .video .video-list dl dt {\n          height: 1.17857rem; } }\n      @media only screen and (min-device-width: 410px) and (max-device-width: 500px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2.5) and (-webkit-max-device-pixel-ratio: 4) {\n        .video .video-list dl dt {\n          height: 1.51937rem; } }\n    .video .video-list dl dd {\n      max-height: 2.75rem;\n      font-size: 0.875rem; }\n      @media only screen and (min-device-width: 320px) and (max-device-width: 340px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) and (-webkit-max-device-pixel-ratio: 2) {\n        .video .video-list dl dd {\n          max-height: 2.35714rem; } }\n      @media only screen and (min-device-width: 240px) and (max-device-width: 600px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 0.75) and (-webkit-max-device-pixel-ratio: 1.9) {\n        .video .video-list dl dd {\n          max-height: 2.35714rem; } }\n      @media only screen and (min-device-width: 410px) and (max-device-width: 500px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2.5) and (-webkit-max-device-pixel-ratio: 4) {\n        .video .video-list dl dd {\n          max-height: 3.03875rem; } }\n      .video .video-list dl dd p {\n        overflow: hidden;\n        text-overflow: ellipsis; }\n      .video .video-list dl dd .aside {\n        margin-top: 0.3125rem;\n        padding-top: 0.3125rem;\n        font-size: 0.75rem;\n        border-top: 0.0625rem dashed #eee; }\n        .video .video-list dl dd .aside .submit {\n          float: right; }\n          .video .video-list dl dd .aside .submit .btn {\n            display: inline-block;\n            height: 1.4375rem;\n            line-height: 1.4375rem;\n            padding: 0 0.9375rem;\n            border: 0.0625rem solid #ddd;\n            background: #f8f8f8; }\n            .video .video-list dl dd .aside .submit .btn:hover {\n              background: #e50000;\n              color: #fff; }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "video"
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "fixed-edit"
  }, [_c('div', {
    staticClass: "btn"
  }, [_c('router-link', {
    attrs: {
      "to": "/new/add"
    }
  }, [_c('i', {
    staticClass: "add"
  }), _vm._v("\r\n\t\t\t\t新增\r\n\t\t\t")])], 1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "Search"
    }
  }, [_c('input', {
    attrs: {
      "type": "text"
    }
  }), _c('div', {
    staticClass: "btn"
  }, [_vm._v("搜索")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "video-list"
  }, [_c('dl', [_c('dt', [_vm._v("标题标题")]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("http://www.baidu.com/dsflaskdjfe32904890234/sdfjlio43509534")]), _vm._v(" "), _c('div', {
    staticClass: "aside"
  }, [_c('div', {
    staticClass: "submit"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("修改")]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_vm._v("发布")])]), _vm._v(" "), _c('span', {
    staticClass: "author"
  }, [_vm._v("作者：卖血的羔羊")]), _vm._v(" "), _c('span', {
    staticClass: "time"
  }, [_vm._v("2017/02/02")])])])]), _c('dl', [_c('dt', [_vm._v("标题标题")]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("内容内容")]), _vm._v(" "), _c('div', {
    staticClass: "aside"
  }, [_c('div', {
    staticClass: "submit"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("修改")]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_vm._v("发布")])]), _vm._v(" "), _c('span', {
    staticClass: "author"
  }, [_vm._v("作者：卖血的羔羊")]), _vm._v(" "), _c('span', {
    staticClass: "time"
  }, [_vm._v("2017/02/02")])])])]), _c('dl', [_c('dt', [_vm._v("标题标题")]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("内容内容")]), _vm._v(" "), _c('div', {
    staticClass: "aside"
  }, [_c('div', {
    staticClass: "submit"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("修改")]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_vm._v("发布")])]), _vm._v(" "), _c('span', {
    staticClass: "author"
  }, [_vm._v("作者：卖血的羔羊")]), _vm._v(" "), _c('span', {
    staticClass: "time"
  }, [_vm._v("2017/02/02")])])])]), _c('dl', [_c('dt', [_vm._v("标题标题")]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("内容内容")]), _vm._v(" "), _c('div', {
    staticClass: "aside"
  }, [_c('div', {
    staticClass: "submit"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("修改")]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_vm._v("发布")])]), _vm._v(" "), _c('span', {
    staticClass: "author"
  }, [_vm._v("作者：卖血的羔羊")]), _vm._v(" "), _c('span', {
    staticClass: "time"
  }, [_vm._v("2017/02/02")])])])]), _c('dl', [_c('dt', [_vm._v("标题标题")]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("内容内容")]), _vm._v(" "), _c('div', {
    staticClass: "aside"
  }, [_c('div', {
    staticClass: "submit"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("修改")]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_vm._v("发布")])]), _vm._v(" "), _c('span', {
    staticClass: "author"
  }, [_vm._v("作者：卖血的羔羊")]), _vm._v(" "), _c('span', {
    staticClass: "time"
  }, [_vm._v("2017/02/02")])])])]), _c('dl', [_c('dt', [_vm._v("标题标题")]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("内容内容")]), _vm._v(" "), _c('div', {
    staticClass: "aside"
  }, [_c('div', {
    staticClass: "submit"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("修改")]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_vm._v("发布")])]), _vm._v(" "), _c('span', {
    staticClass: "author"
  }, [_vm._v("作者：卖血的羔羊")]), _vm._v(" "), _c('span', {
    staticClass: "time"
  }, [_vm._v("2017/02/02")])])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0b87767e", module.exports)
  }
}

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("28e2742a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0b87767e!./../../../../../../node_modules/sass-loader/lib/loader.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./list.vue", function() {
     var newContent = require("!!./../../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0b87767e!./../../../../../../node_modules/sass-loader/lib/loader.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});
//# sourceMappingURL=0_chunk.js.map?name=08935000e4e70870b5eb