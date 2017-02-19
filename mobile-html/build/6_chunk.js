webpackJsonp([6],{

/***/ 111:
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

exports.default = {
	data: function data() {
		return {
			list: []
		};
	},
	beforeCreate: function beforeCreate() {
		var self = this;
		_global2.default.ajax({
			url: _URL.news.newslist,
			success: function success(_data) {
				var list = _data.data.list;
				list.map(function (obj, i) {
					obj.timeStr = obj.updateTimeStr.substr(5, 11);
				});
				self.list = list;
			}
		});
	},

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
		}
	}
};

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "new"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
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
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4344ca08", module.exports)
  }
}

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(111),
  /* template */
  __webpack_require__(197),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Myindex\\myproject\\yang\\mobile-html\\js\\new\\list.vue"
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
//# sourceMappingURL=6_chunk.js.map?name=d74a6ab941e9a9d6db86