webpackJsonp([5],{

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(56)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(50),
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

/***/ 33:
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

exports.default = {
	name: 'add',
	components: {},
	props: {},
	data: function data() {
		return {
			date: new Date()
		};
	},
	ready: function ready() {
		this.date = '2017/01/01';
	}
};

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.form .select:before {\n  font-family: \"icons\";\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.icon--down:before, .form .select:before {\n  content: \"\\E600\";\n}\n@font-face {\n  font-family: 'icons';\n  src: url(data:application/font-woff;charset=utf-8;base64,d09GRk9UVE8AAARgAAoAAAAABBgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANgAAADYZbVvCE9TLzIAAAHMAAAAYAAAAGAIIvy2Y21hcAAAAiwAAABMAAAATBpVzFdnYXNwAAACeAAAAAgAAAAIAAAAEGhlYWQAAAKAAAAANgAAADYAl8viaGhlYQAAArgAAAAkAAAAJANuAeZobXR4AAAC3AAAABQAAAAUAwAAdG1heHAAAALwAAAABgAAAAYABVAAbmFtZQAAAvgAAAFFAAABRVcZpu5wb3N0AAAEQAAAACAAAAAgAAMAAAEABAQAAQEBCGljb21vb24AAQIAAQA6+BwC+BsD+BgEHgoAGVP/i4seCgAZU/+LiwwHi2v4lPh0BR0AAAB2Dx0AAAB7ER0AAAAJHQAAAM8SAAYBAQgPERMWG2ljb21vb25pY29tb29udTB1MXUyMHVFNjAwAAACAYkAAwAFAQEEBwoNTPyUDvyUDvyUDvuUDvgg958VgYD7AiOLi4aFg4iEi4SLg46GkYuL+wLzgZaAloqel5eWlpqMmX8I7yvv6wWZl5qKloCXf4p4gIAIDviUFPiUFYsMCgADAgABkAAFAAABTAFmAAAARwFMAWYAAAD1ABkAhAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOYAAeD/4P/gAeAAIAAAAAEAAAAAAAAAAAAAACAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQAOAAAAAoACAACAAIAAQAg5gD//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAQAAss1nQF8PPPUACwIAAAAAAM/2xdgAAAAAz/bF2AAAAAABjAE1AAAACAACAAAAAAAAAAEAAAHg/+AAAAIAAAAAAAGMAAEAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAQAAAAIAAHQAAFAAAAUAAAAAAA4ArgABAAAAAAABAA4AAAABAAAAAAACAA4ARwABAAAAAAADAA4AJAABAAAAAAAEAA4AVQABAAAAAAAFABYADgABAAAAAAAGAAcAMgABAAAAAAAKADQAYwADAAEECQABAA4AAAADAAEECQACAA4ARwADAAEECQADAA4AJAADAAEECQAEAA4AVQADAAEECQAFABYADgADAAEECQAGAA4AOQADAAEECQAKADQAYwBpAGMAbwBtAG8AbwBuAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuAFIAZQBnAHUAbABhAHIAaQBjAG8AbQBvAG8AbgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format(\"woff\");\n  font-weight: normal;\n  font-style: normal;\n}\n.container {\n  overflow-y: scroll;\n}\n.form {\n  font-size: 0.875rem;\n}\n.form ul {\n    margin-bottom: 0.625rem;\n    padding: 0 0.625rem;\n    border-top: 0.0625rem solid #ddd;\n    border-bottom: 0.0625rem solid #ddd;\n    background: #fff;\n}\n.form li {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.3125rem 0;\n}\n.form li > input[type='text'], .form li > input[type='date'], .form li > label, .form li > textarea {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      height: 1.5625rem;\n      line-height: 1.5625rem;\n      border: 0.0625rem solid #ddd;\n      padding: 0.25rem;\n}\n.form li > textarea {\n      display: block;\n      width: 100%;\n      height: 3.75rem;\n      padding: 0.3125rem;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      -webkit-appearance: none;\n}\n.form li > label {\n      border: none;\n}\n.form li > input:not(:first-child) {\n      margin-left: 0.625rem;\n}\n.form li input:not([type='radio']) {\n      background: #fff;\n      -webkit-appearance: none;\n}\n.form li input:not([type='radio'])[type='radio'] {\n        margin-right: 0.3125rem;\n}\n.form li select {\n      display: block;\n}\n.form .select {\n    display: block;\n    /* 1 */\n    width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    position: relative;\n    /* 2 */\n    vertical-align: middle;\n    /* 3 */\n    padding: 0;\n    /* 4 */\n    overflow: hidden;\n    /* 5 */\n    background: #fff;\n    color: #555;\n    border: 0.0625rem solid #ddd;\n    text-shadow: none;\n    border-radius: 0.25rem;\n    /* 6 */\n    /* 6 */\n}\n.form .select:hover {\n      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n}\n.form .select:before {\n      position: absolute;\n      /* 7 */\n      top: 0.5em;\n      /* 7 */\n      right: 0.5em;\n      /* 7 */\n      pointer-events: none;\n      /* 8 */\n}\n.form .select select {\n      width: 100%;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      padding: 0.5em;\n      /* 10 */\n      padding-right: 2em;\n      /* 11 */\n      border: none;\n      /* 13 */\n      background: transparent;\n      /* 13 */\n      background-image: none;\n      /* 13 */\n      -webkit-appearance: none;\n      /* 13 */\n      -moz-appearance: none;\n      /* 13 */\n      appearance: none;\n      /* 13 */\n      text-indent: 0.01px;\n      /* 14 */\n      text-overflow: '';\n      /* 14 */\n}\n.form .select select:focus {\n        outline: none;\n        /* 16 */\n}\n.form .submit {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.625rem;\n}\n.form .submit .btn {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      text-align: center;\n      height: 2.1875rem;\n      line-height: 2.1875rem;\n      background: #f85200;\n      border-radius: 0.1875rem;\n      color: #fff;\n      font-size: 0.875rem;\n}\n.form .submit .btn:not(:first-child) {\n        margin-left: 0.625rem;\n}\n.form .submit .btn:hover {\n        background: #ff4e00;\n}\n", "", {"version":3,"sources":["/./js/image/add.vue"],"names":[],"mappings":";AAAA;EACE,qBAAqB;EACrB,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;EACpB,qBAAqB;EACrB,qBAAqB;EACrB,uCAAuC;EACvC,oCAAoC;EACpC,mCAAmC;CAAE;AAEvC;EACE,iBAAiB;CAAE;AAErB;EACE,qBAAqB;EACrB,kiDAAkiD;EACliD,oBAAoB;EACpB,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;CAAE;AAEvB;EACE,oBAAoB;CAAE;AACtB;IACE,wBAAwB;IACxB,oBAAoB;IACpB,iCAAiC;IACjC,oCAAoC;IACpC,iBAAiB;CAAE;AACrB;IACE,qBAAqB;IACrB,yBAAyB;IACzB,iBAAiB;IACjB,qBAAqB;CAAE;AACvB;MACE,eAAe;MACf,YAAY;MACZ,oBAAoB;MACpB,kBAAkB;MAClB,uBAAuB;MACvB,6BAA6B;MAC7B,iBAAiB;CAAE;AACrB;MACE,eAAe;MACf,YAAY;MACZ,gBAAgB;MAChB,mBAAmB;MACnB,+BAA+B;MAC/B,uBAAuB;MACvB,yBAAyB;CAAE;AAC7B;MACE,aAAa;CAAE;AACjB;MACE,sBAAsB;CAAE;AAC1B;MACE,iBAAiB;MACjB,yBAAyB;CAAE;AAC3B;QACE,wBAAwB;CAAE;AAC9B;MACE,eAAe;CAAE;AACrB;IACE,eAAe;IACf,OAAO;IACP,YAAY;IACZ,+BAA+B;IAC/B,uBAAuB;IACvB,mBAAmB;IACnB,OAAO;IACP,uBAAuB;IACvB,OAAO;IACP,WAAW;IACX,OAAO;IACP,iBAAiB;IACjB,OAAO;IACP,iBAAiB;IACjB,YAAY;IACZ,6BAA6B;IAC7B,kBAAkB;IAClB,uBAAuB;IACvB,OAAO;IACP,OAAO;CAAE;AACT;MACE,0CAA0C;CAAE;AAC9C;MACE,mBAAmB;MACnB,OAAO;MACP,WAAW;MACX,OAAO;MACP,aAAa;MACb,OAAO;MACP,qBAAqB;MACrB,OAAO;CAAE;AACX;MACE,YAAY;MACZ,+BAA+B;MAC/B,uBAAuB;MACvB,eAAe;MACf,QAAQ;MACR,mBAAmB;MACnB,QAAQ;MACR,aAAa;MACb,QAAQ;MACR,wBAAwB;MACxB,QAAQ;MACR,uBAAuB;MACvB,QAAQ;MACR,yBAAyB;MACzB,QAAQ;MACR,sBAAsB;MACtB,QAAQ;MACR,iBAAiB;MACjB,QAAQ;MACR,oBAAoB;MACpB,QAAQ;MACR,kBAAkB;MAClB,QAAQ;CAAE;AACV;QACE,cAAc;QACd,QAAQ;CAAE;AAChB;IACE,qBAAqB;IACrB,yBAAyB;IACzB,iBAAiB;IACjB,kBAAkB;CAAE;AACpB;MACE,eAAe;MACf,YAAY;MACZ,oBAAoB;MACpB,mBAAmB;MACnB,kBAAkB;MAClB,uBAAuB;MACvB,oBAAoB;MACpB,yBAAyB;MACzB,YAAY;MACZ,oBAAoB;CAAE;AACtB;QACE,sBAAsB;CAAE;AAC1B;QACE,oBAAoB;CAAE","file":"add.vue","sourcesContent":[".form .select:before {\n  font-family: \"icons\";\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.icon--down:before, .form .select:before {\n  content: \"\\e600\"; }\n\n@font-face {\n  font-family: 'icons';\n  src: url(data:application/font-woff;charset=utf-8;base64,d09GRk9UVE8AAARgAAoAAAAABBgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANgAAADYZbVvCE9TLzIAAAHMAAAAYAAAAGAIIvy2Y21hcAAAAiwAAABMAAAATBpVzFdnYXNwAAACeAAAAAgAAAAIAAAAEGhlYWQAAAKAAAAANgAAADYAl8viaGhlYQAAArgAAAAkAAAAJANuAeZobXR4AAAC3AAAABQAAAAUAwAAdG1heHAAAALwAAAABgAAAAYABVAAbmFtZQAAAvgAAAFFAAABRVcZpu5wb3N0AAAEQAAAACAAAAAgAAMAAAEABAQAAQEBCGljb21vb24AAQIAAQA6+BwC+BsD+BgEHgoAGVP/i4seCgAZU/+LiwwHi2v4lPh0BR0AAAB2Dx0AAAB7ER0AAAAJHQAAAM8SAAYBAQgPERMWG2ljb21vb25pY29tb29udTB1MXUyMHVFNjAwAAACAYkAAwAFAQEEBwoNTPyUDvyUDvyUDvuUDvgg958VgYD7AiOLi4aFg4iEi4SLg46GkYuL+wLzgZaAloqel5eWlpqMmX8I7yvv6wWZl5qKloCXf4p4gIAIDviUFPiUFYsMCgADAgABkAAFAAABTAFmAAAARwFMAWYAAAD1ABkAhAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOYAAeD/4P/gAeAAIAAAAAEAAAAAAAAAAAAAACAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQAOAAAAAoACAACAAIAAQAg5gD//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAQAAss1nQF8PPPUACwIAAAAAAM/2xdgAAAAAz/bF2AAAAAABjAE1AAAACAACAAAAAAAAAAEAAAHg/+AAAAIAAAAAAAGMAAEAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAQAAAAIAAHQAAFAAAAUAAAAAAA4ArgABAAAAAAABAA4AAAABAAAAAAACAA4ARwABAAAAAAADAA4AJAABAAAAAAAEAA4AVQABAAAAAAAFABYADgABAAAAAAAGAAcAMgABAAAAAAAKADQAYwADAAEECQABAA4AAAADAAEECQACAA4ARwADAAEECQADAA4AJAADAAEECQAEAA4AVQADAAEECQAFABYADgADAAEECQAGAA4AOQADAAEECQAKADQAYwBpAGMAbwBtAG8AbwBuAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuAFIAZQBnAHUAbABhAHIAaQBjAG8AbQBvAG8AbgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format(\"woff\");\n  font-weight: normal;\n  font-style: normal; }\n\n.container {\n  overflow-y: scroll; }\n\n.form {\n  font-size: 0.875rem; }\n  .form ul {\n    margin-bottom: 0.625rem;\n    padding: 0 0.625rem;\n    border-top: 0.0625rem solid #ddd;\n    border-bottom: 0.0625rem solid #ddd;\n    background: #fff; }\n  .form li {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.3125rem 0; }\n    .form li > input[type='text'], .form li > input[type='date'], .form li > label, .form li > textarea {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      height: 1.5625rem;\n      line-height: 1.5625rem;\n      border: 0.0625rem solid #ddd;\n      padding: 0.25rem; }\n    .form li > textarea {\n      display: block;\n      width: 100%;\n      height: 3.75rem;\n      padding: 0.3125rem;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      -webkit-appearance: none; }\n    .form li > label {\n      border: none; }\n    .form li > input:not(:first-child) {\n      margin-left: 0.625rem; }\n    .form li input:not([type='radio']) {\n      background: #fff;\n      -webkit-appearance: none; }\n      .form li input:not([type='radio'])[type='radio'] {\n        margin-right: 0.3125rem; }\n    .form li select {\n      display: block; }\n  .form .select {\n    display: block;\n    /* 1 */\n    width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    position: relative;\n    /* 2 */\n    vertical-align: middle;\n    /* 3 */\n    padding: 0;\n    /* 4 */\n    overflow: hidden;\n    /* 5 */\n    background: #fff;\n    color: #555;\n    border: 0.0625rem solid #ddd;\n    text-shadow: none;\n    border-radius: 0.25rem;\n    /* 6 */\n    /* 6 */ }\n    .form .select:hover {\n      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15); }\n    .form .select:before {\n      position: absolute;\n      /* 7 */\n      top: 0.5em;\n      /* 7 */\n      right: 0.5em;\n      /* 7 */\n      pointer-events: none;\n      /* 8 */ }\n    .form .select select {\n      width: 100%;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      padding: 0.5em;\n      /* 10 */\n      padding-right: 2em;\n      /* 11 */\n      border: none;\n      /* 13 */\n      background: transparent;\n      /* 13 */\n      background-image: none;\n      /* 13 */\n      -webkit-appearance: none;\n      /* 13 */\n      -moz-appearance: none;\n      /* 13 */\n      appearance: none;\n      /* 13 */\n      text-indent: 0.01px;\n      /* 14 */\n      text-overflow: '';\n      /* 14 */ }\n      .form .select select:focus {\n        outline: none;\n        /* 16 */ }\n  .form .submit {\n    display: -webkit-box;\n    display: -webkit-flexbox;\n    display: flexbox;\n    padding: 0.625rem; }\n    .form .submit .btn {\n      display: block;\n      box-flex: 1;\n      -webkit-box-flex: 1;\n      text-align: center;\n      height: 2.1875rem;\n      line-height: 2.1875rem;\n      background: #f85200;\n      border-radius: 0.1875rem;\n      color: #fff;\n      font-size: 0.875rem; }\n      .form .submit .btn:not(:first-child) {\n        margin-left: 0.625rem; }\n      .form .submit .btn:hover {\n        background: #ff4e00; }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "new"
  }, [_c('div', {
    staticClass: "form"
  }, [_c('ul', [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3), _vm._v(" "), _vm._m(4), _vm._v(" "), _vm._m(5), _vm._v(" "), _vm._m(6), _vm._v(" "), _vm._m(7), _vm._v(" "), _c('li', [_vm._v("\r\n\t\t\t\t富文本\r\n\t\t\t")]), _vm._v(" "), _vm._m(8), _vm._v(" "), _vm._m(9), _vm._v(" "), _c('li', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.date),
      expression: "date"
    }],
    attrs: {
      "type": "date"
    },
    domProps: {
      "value": _vm._s(_vm.date)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.date = $event.target.value
      }
    }
  })])]), _vm._v(" "), _vm._m(10)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('input', {
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "标题"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('input', {
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "副标题"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('input', {
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "关键字"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('input', {
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "作者"
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "来源"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('textarea', {
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "描述"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('div', {
    staticClass: "select"
  }, [_c('select', [_c('option', {
    attrs: {
      "selected": ""
    }
  }, [_vm._v("请选择部门")]), _vm._v(" "), _c('option', [_vm._v("B")]), _vm._v(" "), _c('option', [_vm._v("C")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('div', {
    staticClass: "select"
  }, [_c('select', [_c('option', {
    attrs: {
      "selected": ""
    }
  }, [_vm._v("请选择频道")]), _vm._v(" "), _c('option', [_vm._v("B")]), _vm._v(" "), _c('option', [_vm._v("C")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('div', {
    staticClass: "select"
  }, [_c('select', [_c('option', {
    attrs: {
      "selected": ""
    }
  }, [_vm._v("请选择栏目")]), _vm._v(" "), _c('option', [_vm._v("B")]), _vm._v(" "), _c('option', [_vm._v("C")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('input', {
    staticClass: "text",
    attrs: {
      "type": "text",
      "placeholder": "扩展字段"
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "add"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('label', {
    attrs: {
      "for": "one"
    }
  }, [_c('input', {
    attrs: {
      "id": "one",
      "name": "send",
      "type": "radio"
    }
  }), _vm._v("发布")]), _vm._v(" "), _c('label', {
    attrs: {
      "for": "two"
    }
  }, [_c('input', {
    attrs: {
      "id": "two",
      "name": "send",
      "type": "radio"
    }
  }), _vm._v("不发布")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
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
     require("vue-hot-reload-api").rerender("data-v-8196eca4", module.exports)
  }
}

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(44);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("392f0614", content, false);
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
//# sourceMappingURL=5_chunk.js.map?name=08935000e4e70870b5eb