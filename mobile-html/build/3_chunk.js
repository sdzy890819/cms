webpackJsonp([3],{

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(55)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(49),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Myindex\\myproject\\yang\\mobile-html\\js\\new\\add.vue"
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

/***/ 37:
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
	mounted: function mounted() {
		this.date = '2017/01/01';
	}
};

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"add.vue","sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "new",
    staticStyle: {
      "overflow-y": "scroll"
    }
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
     require("vue-hot-reload-api").rerender("data-v-2b6a4b33", module.exports)
  }
}

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("5c73dc16", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2b6a4b33!./../../../../../../node_modules/sass-loader/lib/loader.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./add.vue", function() {
     var newContent = require("!!./../../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2b6a4b33!./../../../../../../node_modules/sass-loader/lib/loader.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./add.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});
//# sourceMappingURL=3_chunk.js.map?name=3451ae1b6a86adb496da