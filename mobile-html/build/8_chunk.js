webpackJsonp([8],{

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _global = __webpack_require__(9);

var _global2 = _interopRequireDefault(_global);

var _URL = __webpack_require__(8);

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

exports.default = {
	data: function data() {
		return {
			list: []
		};
	},
	beforeCreate: function beforeCreate() {
		var self = this,
		    page = 1,
		    pageSize = 10,
		    loading = true;

		function getList() {
			if (loading == false) return;
			loading = false;
			_global2.default.ajax({
				url: _URL.news.newslist,
				data: {
					page: page,
					pageSize: pageSize
				},
				success: function success(_data) {
					var list = _data.data.list;
					if (!list || !list.length) return;
					list.map(function (obj, i) {
						obj.timeStr = obj.updateTimeStr.substr(5, 11);
					});
					self.list = self.list.concat(list);
					loading = true;
					self.$nextTick(function () {
						var box = $('.new-list'),
						    scrollHeight = box[0].scrollHeight,
						    height = box.height();
						box.unbind().on('scroll', function () {
							var scrollTop = $(this).scrollTop() + height + 50;
							if (scrollTop > scrollHeight) {
								if (page <= _data.data.page.pageCount && loading == true) {
									page++;
									getList();
								}
							}
						});
					});
				}
			});
		}
		getList();
	},
	mounted: function mounted() {},

	methods: {
		edit: function edit(obj) {
			_global2.default.pop('修改');
			/*T.ajax({
   	url : news.delNews,
   	data : {
   		},
   	success : function( _data ){
   		var list = _data.data.list;
   		list.map((obj , i)=>{
   			obj.timeStr = obj.updateTimeStr.substr(5,11)
   		})
   		self.list = list;
   	}
   })*/
		},
		release: function release(obj) {
			_global2.default.pop('发布', 'error');
		},
		search: function search() {
			var self = this,
			    txt = self.searchtxt;
			_global2.default.ajax({
				url: _URL.search.searchNew,
				type: 'post',
				data: {
					condition: txt,
					page: 1,
					pageSize: 20
				},
				success: function success(_data) {
					var list = _data.data.list;
					list.map(function (obj, i) {
						obj.timeStr = obj.updateTimeStr.substr(5, 11);
					});
					self.list = list;
				}
			});
		}
	}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "new"
  }, [_c('div', {
    attrs: {
      "id": "Search"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.searchtxt),
      expression: "searchtxt"
    }],
    attrs: {
      "type": "text",
      "placeholder": "请输入搜索内容"
    },
    domProps: {
      "value": _vm._s(_vm.searchtxt)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.searchtxt = $event.target.value
      }
    }
  }), _c('div', {
    staticClass: "btn",
    on: {
      "click": _vm.search
    }
  }, [_vm._v("搜索")])]), _vm._v(" "), _c('div', {
    staticClass: "new-list"
  }, _vm._l((_vm.list), function(obj) {
    return _c('dl', [_c('dt', [_vm._v(_vm._s(obj.title))]), _vm._v(" "), _c('dd', [_c('div', {
      staticClass: "aside"
    }, [_c('div', {
      staticClass: "submit"
    }, [_c('div', {
      staticClass: "btn",
      on: {
        "click": function($event) {
          _vm.edit(obj)
        }
      }
    }, [_vm._v("修改")]), _vm._v(" "), _c('div', {
      staticClass: "btn",
      on: {
        "click": function($event) {
          _vm.release(obj)
        }
      }
    }, [_vm._v("发布")])]), _vm._v(" "), _c('span', {
      staticClass: "author"
    }, [_vm._v("作者：" + _vm._s(obj.writeUserName))]), _vm._v("\r\n\t\t\t\t\t | \r\n\t\t\t\t\t"), _c('span', {
      staticClass: "time"
    }, [_vm._v(_vm._s(obj.timeStr))])])])])
  })), _vm._v(" "), _c('div', {
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
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4344ca08", module.exports)
  }
}

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(112),
  /* template */
  __webpack_require__(214),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\myProjuct\\yang.z\\mobile-html\\js\\new\\list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4344ca08", Component.options)
  } else {
    hotAPI.reload("data-v-4344ca08", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});
//# sourceMappingURL=8_chunk.js.map?name=ba94c7bc7dd7246bfa0a