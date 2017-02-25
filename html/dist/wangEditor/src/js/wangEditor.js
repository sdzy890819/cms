!function(e){"function"==typeof window.define?window.define.amd?
// AMD模式
window.define("wangEditor",["jquery"],e):window.define.cmd?
// CMD模式
window.define(function(t,n,i){return e}):
// 全局模式
e(window.jQuery):"object"==typeof module&&"object"==typeof module.exports?(
// commonjs
// 引用 css —— webapck
window.wangEditorCssPath?require(window.wangEditorCssPath):require("../css/wangEditor.css"),module.exports=e(
// 传入 jquery ，支持使用 npm 方式或者自己定义jquery的路径
window.wangEditorJQueryPath?require(window.wangEditorJQueryPath):require("jquery"))):
// 全局模式
e(window.jQuery)}(function(e){
// 验证是否引用jquery
if(!e||!e.fn||!e.fn.jquery)return void alert("在引用wangEditor.js之前，先引用jQuery，否则无法使用 wangEditor");
// 定义扩展函数
var t=function(t){var n=window.wangEditor;n&&
// 执行传入的函数
t(n,e)};
// 最终返回wangEditor构造函数
// 定义构造函数
// editor 绑定事件
// editor api
// selection range API
// selection range API - IE8及以下
// editor command hooks
// editor command API
// dom selector
// undo redo
// 暴露给用户的 API
// menuContainer 构造函数
// MenuContainer.fn bind fn
// MenuContainer.fn API
// menu 构造函数
// Menu.fn 初始化绑定的事件
// Menu.fn API
// dropList 构造函数
// dropList fn bind
// dropListfn api
// dropPanel 构造函数
// dropPanel fn bind
// dropPanel fn api
// modal 构造函数
// modal fn bind
// modal fn api
// txt 构造函数
// Txt.fn bind fn
// Txt.fn api
// 工具函数
// 语言包
// 全局配置
// 全局UI
// 对象配置
// 增加 container
// 增加编辑区域对象
// 增加menuContainer对象
// 增加menus
// bold菜单
// underline菜单
// italic 菜单
// forecolor 菜单
// bgcolor 菜单
// strikethrough 菜单
// eraser 菜单
// source 菜单
// quote 菜单
// 字体 菜单
// 字号 菜单
// head 菜单
// unorderlist 菜单
// orderlist 菜单
// alignleft 菜单
// aligncenter 菜单
// alignright 菜单
// link 菜单
// unlink 菜单
// table 菜单
// emotion 菜单
// img 菜单
// video 菜单
// location 菜单
// insertcode 菜单
// undo 菜单
// redo 菜单
// 全屏 菜单
// 渲染menus
// 渲染menus
// 渲染 txt
// 渲染 container
// 菜单事件
// 菜单container事件
// 编辑区域事件
// 上传图片事件
// xhr 上传图片
// 进度条
// upload img 插件
// h5 方式上传图片
// form方式上传图片
// upload img 插件 粘贴图片
// 拖拽上传图片 插件 
// 编辑器区域 table toolbar
// 编辑器区域 img toolbar
// 编辑区域 link toolbar
// menu吸顶
// 缩进 菜单插件
// 行高 菜单插件
// 自定义上传
// 版权提示
return function(e,t){if(e.wangEditor)
// 重复引用
return void alert("一个页面不能重复引用 wangEditor.js 或 wangEditor.min.js ！！！");
// 编辑器（整体）构造函数
var n=function(e){
// 支持 id 和 element 两种形式
"string"==typeof e&&(e="#"+e);
// ---------------获取基本节点------------------
var n=t(e);if(1===n.length){var i=n[0].nodeName;"TEXTAREA"!==i&&"DIV"!==i||(this.valueNodeName=i.toLowerCase(),this.$valueContainer=n,
// 记录 elem 的 prev 和 parent（最后渲染 editor 要用到）
this.$prev=n.prev(),this.$parent=n.parent(),
// ------------------初始化------------------
this.init())}};n.fn=n.prototype,n.$body=t("body"),n.$document=t(document),n.$window=t(e),n.userAgent=navigator.userAgent,n.getComputedStyle=e.getComputedStyle,n.w3cRange="function"==typeof document.createRange,n.hostname=location.hostname.toLowerCase(),n.websiteHost="wangeditor.github.io|www.wangeditor.com|wangeditor.coding.me",n.isOnWebsite=n.websiteHost.indexOf(n.hostname)>=0,n.docsite="http://www.kancloud.cn/wangfupeng/wangeditor2/113961",
// 暴露给全局对象
e.wangEditor=n,
// 注册 plugin 事件，用于用户自定义插件
// 用户在引用 wangEditor.js 之后，还可以通过 E.plugin() 注入自定义函数，
// 该函数将会在 editor.create() 方法的最后一步执行
n.plugin=function(e){n._plugins||(n._plugins=[]),"function"==typeof e&&n._plugins.push(e)}}(window,e),t(function(e,t){e.fn.init=function(){
// 初始化 editor 默认配置
this.initDefaultConfig(),
// 增加container
this.addEditorContainer(),
// 增加编辑区域
this.addTxt(),
// 增加menuContainer
this.addMenuContainer(),
// 初始化菜单集合
this.menus={},
// 初始化commandHooks
this.commandHooks()}}),t(function(e,t){
// 预定义 ready 事件
e.fn.ready=function(e){this.readyFns||(this.readyFns=[]),this.readyFns.push(e)},
// 处理ready事件
e.fn.readyHeadler=function(){for(var e=this.readyFns;e.length;)e.shift().call(this)},
// 更新内容到 $valueContainer
e.fn.updateValue=function(){var e=this,t=e.$valueContainer,n=e.txt.$txt;if(t!==n){var i=n.html();t.val(i)}},
// 获取初始化的内容
e.fn.getInitValue=function(){var e=this,t=e.$valueContainer,n="",i=e.valueNodeName;return"div"===i?n=t.html():"textarea"===i&&(n=t.val()),n},
// 触发菜单updatestyle
e.fn.updateMenuStyle=function(){var e=this.menus;t.each(e,function(e,t){t.updateSelected()})},
// 除了传入的 menuIds，其他全部启用
e.fn.enableMenusExcept=function(e){this._disabled||(
// menuIds参数：支持数组和字符串
e=e||[],"string"==typeof e&&(e=[e]),t.each(this.menus,function(t,n){e.indexOf(t)>=0||n.disabled(!1)}))},
// 除了传入的 menuIds，其他全部禁用
e.fn.disableMenusExcept=function(e){this._disabled||(
// menuIds参数：支持数组和字符串
e=e||[],"string"==typeof e&&(e=[e]),t.each(this.menus,function(t,n){e.indexOf(t)>=0||n.disabled(!0)}))},
// 隐藏所有 dropPanel droplist modal
e.fn.hideDropPanelAndModal=function(){var e=this.menus;t.each(e,function(e,t){var n=t.dropPanel||t.dropList||t.modal;n&&n.hide&&n.hide()})}}),t(function(e,t){function n(){}
// 用到 w3c range 的函数，如果检测到浏览器不支持 w3c range，则赋值为空函数
var i=!e.w3cRange;
// 设置或读取当前的range
e.fn.currentRange=function(e){return e?void(this._rangeData=e):this._rangeData},
// 将当前选区折叠
e.fn.collapseRange=function(e,t){
// opt 参数说明：'start'-折叠到开始; 'end'-折叠到结束
t=t||"end",t="start"===t,e=e||this.currentRange(),e&&(
// 合并，保存
e.collapse(t),this.currentRange(e))},
// 获取选区的文字
e.fn.getRangeText=i?n:function(e){if(e=e||this.currentRange())return e.toString()},
// 获取选区对应的DOM对象
e.fn.getRangeElem=i?n:function(e){e=e||this.currentRange();var t=e.commonAncestorContainer;return 1===t.nodeType?t:t.parentNode},
// 选区内容是否为空？
e.fn.isRangeEmpty=i?n:function(e){return e=e||this.currentRange(),!(!e||!e.startContainer||e.startContainer!==e.endContainer||e.startOffset!==e.endOffset)},
// 保存选区数据
e.fn.saveSelection=i?n:function(e){var n,i,a=this,o=a.txt.$txt.get(0);e?n=e.commonAncestorContainer:(i=document.getSelection(),i.getRangeAt&&i.rangeCount&&(e=document.getSelection().getRangeAt(0),n=e.commonAncestorContainer)),
// 确定父元素一定要包含在编辑器区域内
n&&(t.contains(o,n)||o===n)&&
// 保存选择区域
a.currentRange(e)},
// 恢复选中区域
e.fn.restoreSelection=i?n:function(t){var n;if(t=t||this.currentRange())
// 使用 try catch 来防止 IE 某些情况报错
try{n=document.getSelection(),n.removeAllRanges(),n.addRange(t)}catch(t){e.error("执行 editor.restoreSelection 时，IE可能会有异常，不影响使用")}},
// 根据elem恢复选区
e.fn.restoreSelectionByElem=i?n:function(e,t){
// opt参数说明：'start'-折叠到开始，'end'-折叠到结束，'all'-全部选中
e&&(t=t||"end",// 默认为折叠到结束
// 根据elem获取选区
this.setRangeByElem(e),
// 根据 opt 折叠选区
"start"===t&&this.collapseRange(this.currentRange(),"start"),"end"===t&&this.collapseRange(this.currentRange(),"end"),
// 恢复选区
this.restoreSelection())},
// 初始化选区
e.fn.initSelection=i?n:function(){var e=this;if(!e.currentRange()){var t=e.txt.$txt,n=t.children().first();n.length&&e.restoreSelectionByElem(n.get(0))}},
// 根据元素创建选区
e.fn.setRangeByElem=i?n:function(e){var n=this,i=n.txt.$txt.get(0);if(e&&t.contains(i,e)){for(
// 找到elem的第一个 textNode 和 最后一个 textNode
var a=e.firstChild;a&&3!==a.nodeType;)
// 继续向下
a=a.firstChild;for(var o=e.lastChild;o&&3!==o.nodeType;)
// 继续向下
o=o.lastChild;var r=document.createRange();a&&o?(
// 说明 elem 有内容，能取到子元素
r.setStart(a,0),r.setEnd(o,o.textContent.length)):(
// 说明 elem 无内容
r.setStart(e,0),r.setEnd(e,0)),
// 保存选区
n.saveSelection(r)}}}),t(function(e,t){e.w3cRange||(
// -----------------IE8时，需要重写以下方法-------------------
// 获取选区的文字
e.fn.getRangeText=function(e){if(e=e||this.currentRange())return e.text},
// 获取选区对应的DOM对象
e.fn.getRangeElem=function(e){if(e=e||this.currentRange()){var t=e.parentElement();return 1===t.nodeType?t:t.parentNode}},
// 选区内容是否为空？
e.fn.isRangeEmpty=function(e){return e=e||this.currentRange(),!e||!e.text},
// 保存选区数据
e.fn.saveSelection=function(e){var n,i=this,a=i.txt.$txt.get(0);e?n=e.parentElement():(e=document.selection.createRange(),
//IE6、7中，insertImage后会执行此处
//由于找不到range.parentElement，所以干脆将_parentElem赋值为null
n="undefined"==typeof e.parentElement?null:e.parentElement()),
// 确定父元素一定要包含在编辑器区域内
n&&(t.contains(a,n)||a===n)&&
// 保存选择区域
i.currentRange(e)},
// 恢复选中区域
e.fn.restoreSelection=function(e){var t,n=this;if(e=e||n.currentRange()){t=document.selection.createRange();try{
// 此处，plupload上传上传图片时，IE8-会报一个『参数无效』的错误
t.setEndPoint("EndToEnd",e)}catch(e){}if(0===e.text.length)try{
// IE8 插入表情会报错
t.collapse(!1)}catch(e){}else t.setEndPoint("StartToStart",e);t.select()}})}),t(function(e,t){e.fn.commandHooks=function(){var e=this,n={};
// insertHtml
n.insertHtml=function(n){var i,a=t(n),o=e.getRangeElem();i=e.getLegalTags(o),i&&t(i).after(a)},
// 保存到对象
e.commandHooks=n}}),t(function(e,t){
// 基本命令
e.fn.command=function(e,t,n,i){function a(){t&&(r.queryCommandSupported(t)?
// 默认命令
document.execCommand(t,!1,n):(
// hooks 命令
o=r.commandHooks,t in o&&o[t](n)))}var o,r=this;this.customCommand(e,a,i)},
// 针对一个elem对象执行基础命令
e.fn.commandForElem=function(e,t,n,i,a){
// 取得查询elem的查询条件和验证函数
var o,r;"string"==typeof e?o=e:(o=e.selector,r=e.check);
// 查询elem
var c=this.getRangeElem();c=this.getSelfOrParentByName(c,o,r),
// 根据elem设置range
c&&this.setRangeByElem(c),
// 然后执行基础命令
this.command(t,n,i,a)},
// 自定义命令
e.fn.customCommand=function(e,t,n){
// 隐藏 dropPanel dropList modal  设置 200ms 间隔
function i(){a.hideDropPanelAndModal()}var a=this,o=a.currentRange();
// 记录内容，以便撤销（执行命令之前就要记录）
// 恢复选区（有 range 参数）
// 执行命令事件
// 保存选区（无参数，要从浏览器直接获取range信息）
// 重新恢复选区（无参数，要取得刚刚从浏览器得到的range信息）
// 执行 callback
// 最后插入空行
// 包裹暴露的img和text
// 更新内容
// 更新菜单样式
// 目前没有选区，则无法执行命令
return o?(a.undoRecord(),this.restoreSelection(o),t.call(a),this.saveSelection(),this.restoreSelection(),n&&"function"==typeof n&&n.call(a),a.txt.insertEmptyP(),a.txt.wrapImgAndText(),a.updateValue(),a.updateMenuStyle(),setTimeout(i,200),void(e&&e.preventDefault())):void(e&&e.preventDefault())},
// 封装 document.queryCommandValue 函数
// IE8 直接执行偶尔会报错，因此直接用 try catch 封装一下
e.fn.queryCommandValue=function(e){var t="";try{t=document.queryCommandValue(e)}catch(e){}return t},
// 封装 document.queryCommandState 函数
// IE8 直接执行偶尔会报错，因此直接用 try catch 封装一下
e.fn.queryCommandState=function(e){var t=!1;try{t=document.queryCommandState(e)}catch(e){}return t},
// 封装 document.queryCommandSupported 函数
e.fn.queryCommandSupported=function(e){var t=!1;try{t=document.queryCommandSupported(e)}catch(e){}return t}}),t(function(e,t){
// matchesSelector hook
function n(e){var n=this,i=t(e),a=!1;
// 用jquery查找 selector 所有对象，如果其中有一个和传入 elem 相同，则证明 elem 符合 selector
return i.each(function(){if(this===n)return a=!0,!1}),a}var i;
// 从当前的elem，往上去查找合法标签 如 p head table blockquote ul ol 等
e.fn.getLegalTags=function(t){var n=this.config.legalTags;return n?this.getSelfOrParentByName(t,n):void e.error("配置项中缺少 legalTags 的配置")},
// 根据条件，查询自身或者父元素，符合即返回
e.fn.getSelfOrParentByName=function(e,a,o){if(e&&a){i||(
// 定义 matchesSelector 函数
i=e.webkitMatchesSelector||e.mozMatchesSelector||e.oMatchesSelector||e.matchesSelector),i||(
// 如果浏览器本身不支持 matchesSelector 则使用自定义的hook
i=n);for(var r=this.txt.$txt.get(0);e&&r!==e&&t.contains(r,e);){if(i.call(e,a)){
// 符合 selector 查询条件
if(!o)
// 没有 check 验证函数，直接返回即可
return e;if(o(e))
// 如果有 check 验证函数，还需 check 函数的确认
return e}
// 如果上一步没经过验证，则将跳转到父元素
e=e.parentNode}}}}),t(function(e,t){// 缓存的最大长度
function n(e){return null==e._redoList&&(e._redoList=[]),e._redoList}function i(e){return null==e._undoList&&(e._undoList=[]),e._undoList}
// 数据处理
function a(e,t,n){
// var range = data.range;
// var range2 = range.cloneRange && range.cloneRange();
var i=t.val,a=e.txt.$txt.html();if(null!=i){if(i===a)return"redo"===n?void e.redo():"undo"===n?void e.undo():void 0;
// 保存数据
e.txt.$txt.html(i),
// 更新数据到textarea（有必要的话）
e.updateValue(),
// onchange 事件
e.onchange&&"function"==typeof e.onchange&&e.onchange.call(e)}}var o=20;
// 记录
e.fn.undoRecord=function(){var e=this,t=e.txt.$txt,a=t.html(),r=i(e),c=n(e),l=r.length?r[0]:"";a!==l.val&&(
// 清空 redolist
c.length&&(c=[]),
// 添加数据到 undoList
r.unshift({range:e.currentRange(),// 将当前的range也记录下
val:a}),
// 限制 undoList 长度
r.length>o&&r.pop())},
// undo 操作
e.fn.undo=function(){var e=this,t=i(e),o=n(e);if(t.length){
// 取出 undolist 第一个值，加入 redolist
var r=t.shift();o.unshift(r),
// 并修改编辑器的内容
a(this,r,"undo")}},
// redo 操作
e.fn.redo=function(){var e=this,t=i(e),o=n(e);if(o.length){
// 取出 redolist 第一个值，加入 undolist
var r=o.shift();t.unshift(r),
// 并修改编辑器的内容
a(this,r,"redo")}}}),t(function(e,t){
// 创建编辑器
e.fn.create=function(){var n=this;
// 检查 E.$body 是否有值
// 如果在 body 之前引用了 js 文件，body 尚未加载，可能没有值
e.$body&&0!==e.$body.length||(e.$body=t("body"),e.$document=t(document),e.$window=t(window)),
// 执行 addMenus 之前：
// 1. 允许用户修改 editor.UI 自定义配置UI
// 2. 允许用户通过修改 editor.menus 来自定义配置菜单
// 因此要在 create 时执行，而不是 init           
n.addMenus(),
// 渲染
n.renderMenus(),n.renderMenuContainer(),n.renderTxt(),n.renderEditorContainer(),
// 绑定事件
n.eventMenus(),n.eventMenuContainer(),n.eventTxt(),
// 处理ready事件
n.readyHeadler(),
// 初始化选区
n.initSelection(),
// $txt 快捷方式
n.$txt=n.txt.$txt;
// 执行用户自定义事件，通过 E.ready() 添加
var i=e._plugins;i&&i.length&&t.each(i,function(e,t){t.call(n)})},
// 禁用编辑器
e.fn.disable=function(){this.txt.$txt.removeAttr("contenteditable"),this.disableMenusExcept(),
// 先禁用，再记录状态
this._disabled=!0},
// 启用编辑器
e.fn.enable=function(){
// 先解除状态记录，再启用
this._disabled=!1,this.txt.$txt.attr("contenteditable","true"),this.enableMenusExcept()},
// 销毁编辑器
e.fn.destroy=function(){var e=this,t=e.$valueContainer,n=e.$editorContainer,i=e.valueNodeName;"div"===i?(
// div 生成的编辑器
t.removeAttr("contenteditable"),n.after(t),n.hide()):(
// textarea 生成的编辑器
t.show(),n.hide())},
// 撤销 销毁编辑器
e.fn.undestroy=function(){var e=this,t=e.$valueContainer,n=e.$editorContainer,i=e.menuContainer.$menuContainer,a=e.valueNodeName;"div"===a?(
// div 生成的编辑器
t.attr("contenteditable","true"),i.after(t),n.show()):(
// textarea 生成的编辑器
t.hide(),n.show())},
// 清空内容的快捷方式
e.fn.clear=function(){var e=this,t=e.txt.$txt;t.html("<p><br></p>"),e.restoreSelectionByElem(t.find("p").get(0))}}),t(function(e,t){
// 定义构造函数
var n=function(e){this.editor=e,this.init()};n.fn=n.prototype,
// 暴露给 E 即 window.wangEditor
e.MenuContainer=n}),t(function(e,t){var n=e.MenuContainer;
// 初始化
n.fn.init=function(){var e=this,n=t('<div class="wangEditor-menu-container clearfix"></div>');e.$menuContainer=n,
// change shadow
e.changeShadow()},
// 编辑区域滚动时，增加shadow
n.fn.changeShadow=function(){var e=this.$menuContainer,t=this.editor,n=t.txt.$txt;n.on("scroll",function(){n.scrollTop()>10?e.addClass("wangEditor-menu-shadow"):e.removeClass("wangEditor-menu-shadow")})}}),t(function(e,t){var n=e.MenuContainer;n.fn.render=function(){var e=this.$menuContainer,t=this.editor.$editorContainer;t.append(e)},
// 获取菜单栏的高度
n.fn.height=function(){var e=this.$menuContainer;return e.height()},
// 添加菜单
n.fn.appendMenu=function(e,t){
// 增加菜单（返回 $menuItem）
// 判断是否需要新增一个菜单组
return this._addGroup(e),this._addOneMenu(t)},n.fn._addGroup=function(e){var n,i=this.$menuContainer;this.$currentGroup&&this.currentGroupIdx===e||(n=t('<div class="menu-group clearfix"></div>'),i.append(n),this.$currentGroup=n,this.currentGroupIdx=e)},n.fn._addOneMenu=function(e){var n=e.$domNormal,i=e.$domSelected,a=this.$currentGroup,o=t('<div class="menu-item clearfix"></div>');return i.hide(),o.append(n).append(i),a.append(o),o}}),t(function(e,t){
// 定义构造函数
var n=function(e){this.editor=e.editor,this.id=e.id,this.title=e.title,this.$domNormal=e.$domNormal,this.$domSelected=e.$domSelected||e.$domNormal,
// document.execCommand 的参数
this.commandName=e.commandName,this.commandValue=e.commandValue,this.commandNameSelected=e.commandNameSelected||e.commandName,this.commandValueSelected=e.commandValueSelected||e.commandValue};n.fn=n.prototype,
// 暴露给 E 即 window.wangEditor
e.Menu=n}),t(function(e,t){var n=e.Menu;
// 初始化UI
n.fn.initUI=function(){var n=this.editor,i=n.UI.menus,a=this.id,o=i[a];this.$domNormal&&this.$domSelected||(null==o&&(e.warn('editor.UI配置中，没有菜单 "'+a+'" 的UI配置，只能取默认值'),
// 必须写成 uiConfig['default'];
// 写成 uiConfig.default IE8会报错
o=i.default),
// 正常状态
this.$domNormal=t(o.normal),
// 选中状态
/^\./.test(o.selected)?
// 增加一个样式
this.$domSelected=this.$domNormal.clone().addClass(o.selected.slice(1)):
// 一个新的dom对象
this.$domSelected=t(o.selected))}}),t(function(e,t){var n=e.Menu;
// 渲染菜单
n.fn.render=function(e){
// 渲染UI
this.initUI();var t=this.editor,n=t.menuContainer,i=n.appendMenu(e,this),a=this.onRender;
// 渲染tip
this._renderTip(i),
// 执行 onRender 函数
a&&"function"==typeof a&&a.call(this)},n.fn._renderTip=function(n){function i(){d.show()}function a(){d.hide()}var o,r=this,c=r.editor,l=r.title,d=t('<div class="menu-tip"></div>');r.tipWidth||(
// 设置一个纯透明的 p（absolute;top:-10000px;不会显示在内容区域）
// 内容赋值为 title ，为了计算tip宽度
o=t('<p style="opacity:0; filter:Alpha(opacity=0); position:absolute;top:-10000px;">'+l+"</p>"),
// 先添加到body，计算完再 remove
e.$body.append(o),c.ready(function(){var e=o.outerWidth()+5,t=d.outerWidth(),n=parseFloat(d.css("margin-left"),10);
// 计算完，拿到数据，则弃用
o.remove(),o=null,
// 重新设置样式
d.css({width:e,"margin-left":n+(t-e)/2}),
// 存储
r.tipWidth=e})),
// $tip.append($triangle);
d.append(l),n.append(d);var s;n.find("a").on("mouseenter",function(e){r.active()||r.disabled()||(s=setTimeout(i,200))}).on("mouseleave",function(e){s&&clearTimeout(s),a()}).on("click",a)},
// 绑定事件
n.fn.bindEvent=function(){var t=this,n=t.$domNormal,i=t.$domSelected,a=t.clickEvent;a||(a=function(n){
// -----------dropPanel dropList modal-----------
var i=t.dropPanel||t.dropList||t.modal;if(i&&i.show)return void(i.isShowing?i.hide():i.show());
// -----------command-----------
var a,o,r=t.editor,c=t.selected;c?(a=t.commandNameSelected,o=t.commandValueSelected):(a=t.commandName,o=t.commandValue),a?
// 执行命令
r.command(n,a,o):(
// 提示
e.warn('菜单 "'+t.id+'" 未定义click事件'),n.preventDefault())});
// 获取菜单定义的selected情况下的点击事件
var o=t.clickEventSelected||a;
// 将事件绑定到菜单dom上
n.click(function(e){t.disabled()||(a.call(t,e),t.updateSelected()),e.preventDefault()}),i.click(function(e){t.disabled()||(o.call(t,e),t.updateSelected()),e.preventDefault()})},
// 更新选中状态
n.fn.updateSelected=function(){var e=this,t=(e.editor,e.updateSelectedEvent);t||(
// 用户未自定义，则设置默认值
t=function(){var e=this,t=e.editor,n=e.commandName,i=e.commandValue;if(i){if(t.queryCommandValue(n).toLowerCase()===i.toLowerCase())return!0}else if(t.queryCommandState(n))return!0;return!1});
// 获取结果
var n=t.call(e);n=!!n,
// 存储结果、显示效果
e.changeSelectedState(n)},
// 切换选中状态、显示效果
n.fn.changeSelectedState=function(e){var t=this,n=t.selected;if(null!=e&&"boolean"==typeof e){if(n===e)
// 计算结果和当前的状态一样
return;
// 存储结果
t.selected=e,
// 切换菜单的显示
e?(
// 选中
t.$domNormal.hide(),t.$domSelected.show()):(
// 未选中
t.$domNormal.show(),t.$domSelected.hide())}},
// 点击菜单，显示了 dropPanel modal 时，菜单的状态 
n.fn.active=function(e){return null==e?this._activeState:void(this._activeState=e)},n.fn.activeStyle=function(e){var t=(this.selected,this.$domNormal),n=this.$domSelected;e?(t.addClass("active"),n.addClass("active")):(t.removeClass("active"),n.removeClass("active")),
// 记录状态 （ menu hover 时会取状态用 ）
this.active(e)},
// 菜单的启用和禁用
n.fn.disabled=function(e){
// 参数为空，取值
if(null==e)return!!this._disabled;if(this._disabled!==e){var t=this.$domNormal,n=this.$domSelected;
// 设置样式
e?(t.addClass("disable"),n.addClass("disable")):(t.removeClass("disable"),n.removeClass("disable")),
// 存储
this._disabled=e}}}),t(function(e,t){
// 定义构造函数
var n=function(e,t,n){this.editor=e,this.menu=t,
// list 的数据源，格式 {'commandValue': 'title', ...}
this.data=n.data,
// 要为每个item自定义的模板
this.tpl=n.tpl,
// 为了执行 editor.commandForElem 而传入的elem查询方式
this.selectorForELemCommand=n.selectorForELemCommand,
// 执行事件前后的钩子
this.beforeEvent=n.beforeEvent,this.afterEvent=n.afterEvent,
// 初始化
this.init()};n.fn=n.prototype,
// 暴露给 E 即 window.wangEditor
e.DropList=n}),t(function(e,t){var n=e.DropList;
// init
n.fn.init=function(){var e=this;
// 生成dom对象
e.initDOM(),
// 绑定command事件
e.bindEvent(),
// 声明隐藏的事件
e.initHideEvent()},
// 初始化dom结构
n.fn.initDOM=function(){var e,n,i=this,a=i.data,o=i.tpl||"<span>{#title}</span>",r=t('<div class="wangEditor-drop-list clearfix"></div>');t.each(a,function(i,a){e=o.replace(/{#commandValue}/gi,i).replace(/{#title}/gi,a),n=t('<a href="#" commandValue="'+i+'"></a>'),n.append(e),r.append(n)}),i.$list=r},
// 绑定事件
n.fn.bindEvent=function(){var e=this,n=e.editor,i=e.menu,a=i.commandName,o=e.selectorForELemCommand,r=e.$list,c=e.beforeEvent,l=e.afterEvent;r.on("click","a[commandValue]",function(e){
// 正式命令执行之前
c&&"function"==typeof c&&c.call(e);
// 执行命令
var r=t(e.currentTarget).attr("commandValue");i.selected&&n.isRangeEmpty()&&o?
// 当前处于选中状态，并且选中内容为空
n.commandForElem(o,e,a,r):
// 当前未处于选中状态，或者有选中内容。则执行默认命令
n.command(e,a,r),
// 正式命令之后的钩子
l&&"function"==typeof l&&l.call(e)})},
// 点击其他地方，立即隐藏 droplist
n.fn.initHideEvent=function(){var n=this,i=n.$list.get(0);e.$body.on("click",function(e){if(n.isShowing){var a,o=e.target,r=n.menu;a=r.selected?r.$domSelected.get(0):r.$domNormal.get(0),a===o||t.contains(a,o)||i===o||t.contains(i,o)||
// 其他情况，隐藏 list
n.hide()}}),e.$window.scroll(function(){n.hide()}),e.$window.on("resize",function(){n.hide()})}}),t(function(e,t){var n=e.DropList;
// 渲染
n.fn._render=function(){var e=this,t=e.editor,n=e.$list;
// 渲染到页面
t.$editorContainer.append(n),
// 记录状态
e.rendered=!0},
// 定位
n.fn._position=function(){var e=this,t=e.$list,n=e.editor,i=e.menu,a=n.menuContainer.$menuContainer,o=i.selected?i.$domSelected:i.$domNormal,r=o.offsetParent().position(),c=r.top,l=r.left,d=o.offsetParent().height(),s=o.offsetParent().width(),u=t.outerWidth(),f=n.txt.$txt.outerWidth(),m=c+d,p=l+s/2,h=0-s/2,g=p+u-f;g>-10&&(h=h-g-10),
// 设置样式
t.css({top:m,left:p,"margin-left":h}),
// 如果因为向下滚动而导致菜单fixed，则再加一步处理
n._isMenufixed&&(m+=a.offset().top+a.outerHeight()-t.offset().top,
// 重新设置top
t.css({top:m}))},
// 显示
n.fn.show=function(){var e=this,t=e.menu;if(e.rendered||
// 第一次show之前，先渲染
e._render(),!e.isShowing){var n=e.$list;n.show(),
// 定位
e._position(),
// 记录状态
e.isShowing=!0,
// 菜单状态
t.activeStyle(!0)}},
// 隐藏
n.fn.hide=function(){var e=this,t=e.menu;if(e.isShowing){var n=e.$list;n.hide(),
// 记录状态
e.isShowing=!1,
// 菜单状态
t.activeStyle(!1)}}}),t(function(e,t){
// 定义构造函数
var n=function(e,t,n){this.editor=e,this.menu=t,this.$content=n.$content,this.width=n.width||200,this.height=n.height,this.onRender=n.onRender,
// init
this.init()};n.fn=n.prototype,
// 暴露给 E 即 window.wangEditor
e.DropPanel=n}),t(function(e,t){var n=e.DropPanel;
// init
n.fn.init=function(){var e=this;
// 生成dom对象
e.initDOM(),
// 声明隐藏的事件
e.initHideEvent()},
// init DOM
n.fn.initDOM=function(){var e=this,n=e.$content,i=e.width,a=e.height,o=t('<div class="wangEditor-drop-panel clearfix"></div>'),r=t('<div class="tip-triangle"></div>');o.css({width:i,height:a?a:"auto"}),o.append(r),o.append(n),
// 添加对象数据
e.$panel=o,e.$triangle=r},
// 点击其他地方，立即隐藏 dropPanel
n.fn.initHideEvent=function(){var n=this,i=n.$panel.get(0);e.$body.on("click",function(e){if(n.isShowing){var a,o=e.target,r=n.menu;a=r.selected?r.$domSelected.get(0):r.$domNormal.get(0),a===o||t.contains(a,o)||i===o||t.contains(i,o)||
// 其他情况，隐藏 panel
n.hide()}}),e.$window.scroll(function(e){n.hide()}),e.$window.on("resize",function(){n.hide()})}}),t(function(e,t){var n=e.DropPanel;
// 渲染
n.fn._render=function(){var e=this,t=e.onRender,n=e.editor,i=e.$panel;
// 渲染到页面
n.$editorContainer.append(i),
// 渲染后的回调事件
t&&t.call(e),
// 记录状态
e.rendered=!0},
// 定位
n.fn._position=function(){var e=this,t=e.$panel,n=e.$triangle,i=e.editor,a=i.menuContainer.$menuContainer,o=e.menu,r=o.selected?o.$domSelected:o.$domNormal,c=r.offsetParent().position(),l=c.top,d=c.left,s=r.offsetParent().height(),u=r.offsetParent().width(),f=t.outerWidth(),m=i.txt.$txt.outerWidth(),p=l+s,h=d+u/2,g=0-f/2,v=g;// 下文用于和 marginLeft 比较，来设置三角形tip的位置
// 如果超出了左边界，则移动回来（要和左侧有10px间隙）
0-g>h-10&&(g=0-(h-10));
// 如果超出了有边界，则要左移（且和右侧有10px间隙）
var w=h+f+g-m;w>-10&&(g=g-w-10),
// 设置样式
t.css({top:p,left:h,"margin-left":g}),
// 如果因为向下滚动而导致菜单fixed，则再加一步处理
i._isMenufixed&&(p+=a.offset().top+a.outerHeight()-t.offset().top,
// 重新设置top
t.css({top:p})),
// 设置三角形 tip 的位置
n.css({"margin-left":v-g-5})},
// focus 第一个 input
n.fn.focusFirstInput=function(){var e=this,n=e.$panel;n.find("input[type=text],textarea").each(function(){var e=t(this);if(null==e.attr("disabled"))return e.focus(),!1})},
// 显示
n.fn.show=function(){var t=this,n=t.menu;if(t.rendered||
// 第一次show之前，先渲染
t._render(),!t.isShowing){var i=t.$panel;i.show(),
// 定位
t._position(),
// 记录状态
t.isShowing=!0,
// 菜单状态
n.activeStyle(!0),e.w3cRange?
// 高级浏览器
t.focusFirstInput():
// 兼容 IE8 input placeholder
e.placeholderForIE8(i)}},
// 隐藏
n.fn.hide=function(){var e=this,t=e.menu;if(e.isShowing){var n=e.$panel;n.hide(),
// 记录状态
e.isShowing=!1,
// 菜单状态
t.activeStyle(!1)}}}),t(function(e,t){
// 定义构造函数
var n=function(e,t,n){this.editor=e,this.menu=t,this.$content=n.$content,this.init()};n.fn=n.prototype,
// 暴露给 E 即 window.wangEditor
e.Modal=n}),t(function(e,t){var n=e.Modal;n.fn.init=function(){var e=this;
// 初始化dom
e.initDom(),
// 初始化隐藏事件
e.initHideEvent()},
// 初始化dom
n.fn.initDom=function(){var e=this,n=e.$content,i=t('<div class="wangEditor-modal"></div>'),a=t('<div class="wangEditor-modal-close"><i class="wangeditor-menu-img-cancel-circle"></i></div>');i.append(a),i.append(n),
// 记录数据
e.$modal=i,e.$close=a},
// 初始化隐藏事件
n.fn.initHideEvent=function(){var n=this,i=n.$close,a=n.$modal.get(0);
// 点击 $close 按钮，隐藏
i.click(function(){n.hide()}),
// 点击其他部分，隐藏
e.$body.on("click",function(e){if(n.isShowing){var i,o=e.target,r=n.menu;r&&(i=r.selected?r.$domSelected.get(0):r.$domNormal.get(0),i===o||t.contains(i,o))||a===o||t.contains(a,o)||
// 其他情况，隐藏 panel
n.hide()}})}}),t(function(e,t){var n=e.Modal;
// 渲染
n.fn._render=function(){var t=this,n=t.editor,i=t.$modal;
// $modal的z-index，在配置的z-index基础上再 +10
i.css("z-index",n.config.zindex+10+""),
// 渲染到body最后面
e.$body.append(i),
// 记录状态
t.rendered=!0},
// 定位
n.fn._position=function(){var t=this,n=t.$modal,i=n.offset().top,a=n.outerWidth(),o=n.outerHeight(),r=0-a/2,c=0-o/2,l=e.$window.scrollTop();
// 保证modal最顶部，不超过浏览器上边框
o/2>i&&(c=0-i),n.css({"margin-left":r+"px","margin-top":c+l+"px"})},
// 显示
n.fn.show=function(){var e=this,t=e.menu;if(e.rendered||
// 第一次show之前，先渲染
e._render(),!e.isShowing){
// 记录状态
e.isShowing=!0;var n=e.$modal;n.show(),
// 定位
e._position(),
// 激活菜单状态
t&&t.activeStyle(!0)}},
// 隐藏
n.fn.hide=function(){var e=this,t=e.menu;if(e.isShowing){
// 记录状态
e.isShowing=!1;
// 隐藏
var n=e.$modal;n.hide(),
// 菜单状态
t&&t.activeStyle(!1)}}}),t(function(e,t){
// 定义构造函数
var n=function(e){this.editor=e,
// 初始化
this.init()};n.fn=n.prototype,
// 暴露给 E 即 window.wangEditor
e.Txt=n}),t(function(e,t){var n=e.Txt;
// 初始化
n.fn.init=function(){var e,n=this,i=n.editor,a=i.$valueContainer,o=i.getInitValue();"DIV"===a.get(0).nodeName?(
// 如果传入生成编辑器的元素就是div，则直接使用
e=a,e.addClass("wangEditor-txt"),e.attr("contentEditable","true")):
// 如果不是div（是textarea），则创建一个div
e=t('<div class="wangEditor-txt" contentEditable="true">'+o+"</div>"),
// 试图最后插入一个空行，ready之后才行
i.ready(function(){n.insertEmptyP()}),n.$txt=e,
// 删除时，如果没有内容了，就添加一个 <p><br></p>
n.contentEmptyHandle(),
// enter时，不能使用 div 换行
n.bindEnterForDiv(),
// enter时，用 p 包裹 text
n.bindEnterForText(),
// tab 插入4个空格
n.bindTabEvent(),
// 处理粘贴内容
n.bindPasteFilter(),
// $txt.formatText() 方法
n.bindFormatText(),
// 定义 $txt.html() 方法
n.bindHtml()},
// 删除时，如果没有内容了，就添加一个 <p><br></p>
n.fn.contentEmptyHandle=function(){var e,n=this,i=n.editor,a=n.$txt;a.on("keydown",function(e){if(8===e.keyCode){var n=t.trim(a.html().toLowerCase());
// 如果最后还剩余一个空行，就不再继续删除了
return"<p><br></p>"===n?void e.preventDefault():void 0}}),a.on("keyup",function(n){if(8===n.keyCode){var o=t.trim(a.html().toLowerCase());
// ff时用 txtHtml === '<br>' 判断，其他用 !txtHtml 判断
o&&"<br>"!==o||(
// 内容空了
e=t("<p><br/></p>"),a.html(""),// 一定要先清空，否则在 ff 下有问题
a.append(e),i.restoreSelectionByElem(e.get(0)))}})},
// enter时，不能使用 div 换行
n.fn.bindEnterForDiv=function(){function n(){if(i){var e=t("<p>"+i.html()+"</p>");i.after(e),i.remove()}}var i,a=(e.config.legalTags,this),o=a.editor,r=a.$txt;r.on("keydown keyup",function(e){if(13===e.keyCode){
// 查找合法标签
var a,r,c=o.getRangeElem(),l=o.getLegalTags(c);if(!l){if(
// 没找到合法标签，就去查找 div
l=o.getSelfOrParentByName(c,"div"),!l)return;a=t(l),"keydown"===e.type&&(
// 异步执行（同步执行会出现问题）
i=a,setTimeout(n,0)),"keyup"===e.type&&(
// 将 div 的内容移动到 p 里面，并移除 div
r=t("<p>"+a.html()+"</p>"),a.after(r),a.remove(),
// 如果是回车结束，将选区定位到行首
o.restoreSelectionByElem(r.get(0),"start"))}}})},
// enter时，用 p 包裹 text
n.fn.bindEnterForText=function(){var e,t=this,n=t.$txt;n.on("keyup",function(n){13===n.keyCode&&(e||(e=function(){t.wrapImgAndText()}),setTimeout(e))})},
// tab 时，插入4个空格
n.fn.bindTabEvent=function(){var e=this,t=e.editor,n=e.$txt;n.on("keydown",function(e){9===e.keyCode&&t.queryCommandSupported("insertHtml")&&t.command(e,"insertHtml","&nbsp;&nbsp;&nbsp;&nbsp;")})},
// 处理粘贴内容
n.fn.bindPasteFilter=function(){
// 处理粘贴的内容
function e(a){if(a&&a.nodeType&&a.nodeName){var o,c,l=a.nodeName.toLowerCase(),s=a.nodeType;
// 只处理文本和普通node标签
if(3===s||1===s){
// 如果是容器，则继续深度遍历
if(o=t(a),"div"===l)
// 遍历子元素，执行操作
return c=[],t.each(a.childNodes,function(e,t){
// elem.childNodes 可获取TEXT节点，而 $elem.children() 就获取不到
// 先将 elem.childNodes 拷贝一份，一面在循环递归过程中 elem 发生变化
c.push(t)}),void t.each(c,function(){e(this)});if(d.indexOf(l)>=0)
// 如果是合法标签之内的，则根据元素类型，获取值
r+=n(a);else if(3===s)
// 如果是文本，则直接插入 p 标签
r+="<p>"+a.textContent+"</p>";else if("br"===l)
// <br>保留
r+="<br/>";else{
// 忽略的标签
if(["meta","style","script","object","form","iframe","hr"].indexOf(l)>=0)return;
// 其他标签，移除属性，插入 p 标签
o=t(i(a)),
// 注意，这里的 clone() 是必须的，否则会出错
r+=t("<div>").append(o.clone()).html()}}}}
// 获取元素的结果
function n(e){var n,a=e.nodeName.toLowerCase(),o="",r="";
// 直接取出元素text即可
//p head 取出 text 和链接
// 剔除 a img 之外的元素
// ul ol元素，获取子元素（li元素）的text link img，再拼接
// 其他元素，移除元素属性
return["blockquote"].indexOf(a)>=0?(n=t(e),"<"+a+">"+n.text()+"</"+a+">"):["p","h1","h2","h3","h4","h5"].indexOf(a)>=0?(e=i(e),n=t(e),o=n.html(),o=o.replace(/<.*?>/gi,function(e){return"</a>"===e||0===e.indexOf("<a ")||0===e.indexOf("<img ")?e:""}),"<"+a+">"+o+"</"+a+">"):["ul","ol"].indexOf(a)>=0?(n=t(e),n.children().each(function(){var e=t(i(this)),n=e.html();n=n.replace(/<.*?>/gi,function(e){return"</a>"===e||0===e.indexOf("<a ")||0===e.indexOf("<img ")?e:""}),r+="<li>"+n+"</li>"}),"<"+a+">"+r+"</"+a+">"):(n=t(i(e)),t("<div>").append(n).html())}
// 移除一个元素（子元素）的attr
function i(e){var n=e.attributes||[],a=[],o=["href","target","src","alt","rowspan","colspan"];//例外情况
// 先存储下elem中所有 attr 的名称
t.each(n,function(e,t){t&&2===t.nodeType&&a.push(t.nodeName)}),
// 再根据名称删除所有attr
t.each(a,function(t,n){o.indexOf(n)<0&&
// 除了 exception 规定的例外情况，删除其他属性
e.removeAttribute(n)});
// 递归子节点
var r=e.childNodes;return r.length&&t.each(r,function(e,t){i(t)}),e}var a=this,o=a.editor,r="",c=a.$txt,l=o.config.legalTags,d=l.split(",");c.on("paste",function(n){if(o.config.pasteFilter){var i=o.getRangeElem().nodeName;if("TD"!==i&&"TH"!==i){r="";// 先清空 resultHtml
var c,l,d=n.clipboardData||n.originalEvent.clipboardData,s=window.clipboardData;if(o.config.pasteText){
// 只粘贴纯文本
if(d&&d.getData)
// w3c
c=d.getData("text/plain");else{if(!s||!s.getData)
// 其他情况
return;
// IE
c=s.getData("text")}
// 拼接为 <p> 标签
c&&(r="<p>"+c+"</p>")}else
// 粘贴过滤了样式的、只有标签的 html
if(d&&d.getData)
// w3c
// 获取粘贴过来的html
c=d.getData("text/html"),c?(
// 创建dom
l=t("<div>"+c+"</div>"),
// 处理，并将结果存储到 resultHtml 『全局』变量
e(l.get(0))):(
// 得不到html，试图获取text
c=d.getData("text/plain"),c&&(
// 替换特殊字符
c=c.replace(/[ ]/g,"&nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"</p><p>"),
// 拼接
r="<p>"+c+"</p>",
// 查询链接
r=r.replace(/<p>(https?:\/\/.*?)<\/p>/gi,function(e,t){return'<p><a href="'+t+'" target="_blank">'+t+"</p>"})));else{if(!s||!s.getData)
// 其他情况
return;if(
// IE 直接从剪切板中取出纯文本格式
r=s.getData("text"),!r)return;
// 拼接为 <p> 标签
r="<p>"+r+"</p>",r=r.replace(new RegExp("\n","g"),"</p><p>")}
// 执行命令
r&&(o.command(n,"insertHtml",r),
// 删除内容为空的 p 和嵌套的 p
a.clearEmptyOrNestP())}}})},
// 绑定 $txt.formatText() 方法
n.fn.bindFormatText=function(){var n=this,i=(n.editor,n.$txt),a=e.config.legalTags,o=a.split(","),r=(o.length,[]);
// 将 E.config.legalTags 配置的有效字符，生成正则表达式
t.each(o,function(e,t){var n=">\\s*<("+t+")>";r.push(new RegExp(n,"ig"))}),
// 增加 li 
r.push(new RegExp(">\\s*<(li)>","ig")),
// 增加 tr
r.push(new RegExp(">\\s*<(tr)>","ig")),
// 增加 code
r.push(new RegExp(">\\s*<(code)>","ig")),
// 生成 formatText 方法
i.formatText=function(){var e=t("<div>"),n=i.html();
// 去除空格
// 段落、表格之间换行
return n=n.replace(/\s*</gi,"<"),t.each(r,function(e,t){t.test(n)&&(n=n.replace(t,function(e,t){return">\n<"+t+">"}))}),e.html(n),e.text()}},
// 定制 $txt.html 方法
n.fn.bindHtml=function(){var e=this,n=e.editor,i=e.$txt,a=n.$valueContainer,o=n.valueNodeName;i.html=function(e){var n;
// div 生成的编辑器，取值、赋值，都直接触发jquery的html方法
// textarea 生成的编辑器，则需要考虑赋值时，也给textarea赋值
// 取值，直接触发jquery原生html方法
// 替换 html 中，src和href属性中的 & 字符。
// 因为 .html() 或者 .innerHTML 会把所有的 & 字符都改成 &amp; 但是 src 和 href 中的要保持 &
// 赋值，需要同时给 textarea 赋值
// 手动触发 change 事件，因为 $txt 监控了 change 事件来判断是否需要执行 editor.onchange 
return"div"===o&&(n=t.fn.html.call(i,e)),void 0===e?(n=t.fn.html.call(i),n=n.replace(/(href|src)\=\"(.*)\"/gim,function(e,t,n){return t+'="'+n.replace("&amp;","&")+'"'})):(n=t.fn.html.call(i,e),a.val(e)),void 0===e?n:void i.change()}}}),t(function(e,t){var n=e.Txt,i="propertychange change click keyup input paste";
// 渲染
n.fn.render=function(){var e=this.$txt,t=this.editor.$editorContainer;t.append(e)},
// 计算高度
n.fn.initHeight=function(){var e=this.editor,t=this.$txt,n=e.$valueContainer.height(),i=e.menuContainer.height(),a=n-i;
// 限制最小为 50px
a=a<50?50:a,t.height(a),
// 记录原始高度
e.valueContainerHeight=n,
// 设置 max-height
this.initMaxHeight(a,i)},
// 计算最大高度
n.fn.initMaxHeight=function(n,i){var a=this.editor,o=a.menuContainer.$menuContainer,r=this.$txt,c=t("<div>");
// 需要浏览器支持 max-height，否则不管
if(window.getComputedStyle&&"max-height"in window.getComputedStyle(r.get(0))){
// 获取 max-height 并判断是否有值
var l=parseInt(a.$valueContainer.css("max-height"));if(isNaN(l))return;
// max-height 和『全屏』暂时有冲突
if(a.menus.fullscreen)return void e.warn("max-height和『全屏』菜单一起使用时，会有一些问题尚未解决，请暂时不要两个同时使用");
// 标记
a.useMaxHeight=!0,
// 设置maxheight
c.css({"max-height":l-i+"px","overflow-y":"auto"}),r.css({height:"auto","overflow-y":"visible","min-height":n+"px"}),
// 滚动式，菜单阴影
c.on("scroll",function(){r.parent().scrollTop()>10?o.addClass("wangEditor-menu-shadow"):o.removeClass("wangEditor-menu-shadow")}),
// 需在编辑器区域外面再包裹一层
r.wrap(c)}},
// 保存选区
n.fn.saveSelectionEvent=function(){function e(){r.saveSelection()}
// 同步保存选区
function t(){
// 100ms之内，不重复保存
Date.now()-c<100||(c=Date.now(),e())}
// 异步保存选区
function n(){
// 节流，防止高频率重复操作
a&&clearTimeout(a),a=setTimeout(e,300)}var a,o=this.$txt,r=this.editor,c=Date.now();
// txt change 、focus、blur 时随时保存选区
o.on(i+" focus blur",function(e){
// 先同步保存选区，为了让接下来就马上要执行 editor.getRangeElem() 的程序
// 能够获取到正确的 rangeElem
t(),
// 再异步保存选区，为了确定更加准确的选区，为后续的操作做准备
n()}),
// 鼠标拖拽选择时，可能会拖拽到编辑器区域外面再松手，此时 $txt 就监听不到 click事件了
o.on("mousedown",function(){o.on("mouseleave.saveSelection",function(e){
// 先同步后异步，如上述注释
t(),n(),
// 顺道吧菜单状态也更新了
r.updateMenuStyle()})}).on("mouseup",function(){o.off("mouseleave.saveSelection")})},
// 随时更新 value
n.fn.updateValueEvent=function(){
// 触发 onchange 事件
function e(){var e=a.html();n!==e&&(
// 触发 onchange 事件
o.onchange&&"function"==typeof o.onchange&&o.onchange.call(o),
// 更新内容
o.updateValue(),
// 记录最新内容
n=e)}var t,n,a=this.$txt,o=this.editor;
// txt change 时随时更新内容
a.on(i,function(i){
// 初始化
null==n&&(n=a.html()),
// 监控内容变化（停止操作 100ms 之后立即执行）
t&&clearTimeout(t),t=setTimeout(e,100)})},
// 随时更新 menustyle
n.fn.updateMenuStyleEvent=function(){var e=this.$txt,t=this.editor;
// txt change 时随时更新内容
e.on(i,function(e){t.updateMenuStyle()})},
// 最后插入试图插入 <p><br><p>
n.fn.insertEmptyP=function(){var e=this.$txt,n=e.children();return 0===n.length?void e.append(t("<p><br></p>")):void("<br>"!==t.trim(n.last().html()).toLowerCase()&&e.append(t("<p><br></p>")))},
// 将编辑器暴露出来的文字和图片，都用 p 来包裹
n.fn.wrapImgAndText=function(){var e,n,i=this.$txt,a=i.children("img"),o=i[0],r=o.childNodes,c=r.length;
// 处理文字
for(
// 处理图片
a.length&&a.each(function(){t(this).wrap("<p>")}),e=0;e<c;e++)n=r[e],3===n.nodeType&&n.textContent&&t.trim(n.textContent)&&t(n).wrap("<p>")},
// 清空内容为空的<p>，以及重复包裹的<p>（在windows下的chrome粘贴文字之后，会出现上述情况）
n.fn.clearEmptyOrNestP=function(){var e=this.$txt,n=e.find("p");n.each(function(){var e,n=t(this),i=n.children(),a=i.length,o=t.trim(n.html());
// 内容为空的p
// 内容为空的p
// 嵌套的p
return o?void(1===a&&(e=i.first(),e.get(0)&&"P"===e.get(0).nodeName&&n.html(e.html()))):void n.remove()})},
// 获取 scrollTop
n.fn.scrollTop=function(e){var t=this,n=t.editor,i=t.$txt;return n.useMaxHeight?i.parent().scrollTop(e):i.scrollTop(e)},
// 鼠标hover时候，显示p、head的高度
n.fn.showHeightOnHover=function(){function e(e){l||(a.append(c),l=!0);var t=(r.position().top,r.outerHeight(),e.height()),n=e.position().top,i=parseInt(e.css("margin-top"),10),d=parseInt(e.css("padding-top"),10),s=parseInt(e.css("margin-bottom"),10),u=parseInt(e.css("padding-bottom"),10);n+o.height();
// var spaceValue;
// // 判断是否超出下边界
// spaceValue = (resultTop + resultHeight) - (txtTop + txtHeight);
// if (spaceValue > 0) {
//     resultHeight = resultHeight - spaceValue;
// }
// // 判断是否超出了下边界
// spaceValue = txtTop > resultTop;
// if (spaceValue) {
//     resultHeight = resultHeight - spaceValue;
//     top = top + spaceValue;
// }
// 按照最终结果渲染
c.css({height:t+d+i+u+s,top:n+o.height()})}function n(){l&&(c.remove(),l=!1)}var i=this.editor,a=i.$editorContainer,o=i.menuContainer,r=this.$txt,c=t('<i class="height-tip"><i>'),l=!1;r.on("mouseenter","ul,ol,blockquote,p,h1,h2,h3,h4,h5,table,pre",function(n){e(t(n.currentTarget))}).on("mouseleave",function(){n()})}}),t(function(e,t){
// IE8 [].indexOf()
Array.prototype.indexOf||(
//IE低版本不支持 arr.indexOf 
Array.prototype.indexOf=function(e){for(var t=0,n=this.length;t<n;t++)if(this[t]===e)return t;return-1},
//IE低版本不支持 arr.lastIndexOf
Array.prototype.lastIndexOf=function(e){var t=this.length;for(t-=1;t>=0;t--)if(this[t]===e)return t;return-1}),
// IE8 Date.now()
Date.now||(Date.now=function(){return(new Date).valueOf()});
// console.log && console.warn && console.error
var n=window.console,i=function(){};t.each(["info","log","warn","error"],function(t,a){null==n?e[a]=i:e[a]=function(t){
// 通过配置来控制打印输出
e.config&&e.config.printLog&&n[a]("wangEditor提示: "+t)}}),
// 获取随机数
e.random=function(){return Math.random().toString().slice(2)},
// 浏览器是否支持 placeholder
e.placeholder="placeholder"in document.createElement("input"),
// 兼容IE8的 input placeholder
e.placeholderForIE8=function(n){e.placeholder||n.find("input[placeholder]").each(function(){var e=t(this),n=e.attr("placeholder");""===e.val()&&(e.css("color","#666"),e.val(n),e.on("focus.placeholder click.placeholder",function(){e.val(""),e.css("color","#333"),e.off("focus.placeholder click.placeholder")}))})}}),t(function(e,t){e.langs={},
// 中文
e.langs["zh-cn"]={bold:"粗体",underline:"下划线",italic:"斜体",forecolor:"文字颜色",bgcolor:"背景色",strikethrough:"删除线",eraser:"清空格式",source:"源码",quote:"引用",fontfamily:"字体",fontsize:"字号",head:"标题",orderlist:"有序列表",unorderlist:"无序列表",alignleft:"左对齐",aligncenter:"居中",alignright:"右对齐",link:"链接",text:"文本",submit:"提交",cancel:"取消",unlink:"取消链接",table:"表格",emotion:"表情",img:"图片",video:"视频",width:"宽",height:"高",location:"位置",loading:"加载中",searchlocation:"搜索位置",dynamicMap:"动态地图",clearLocation:"清除位置",langDynamicOneLocation:"动态地图只能显示一个位置",insertcode:"插入代码",undo:"撤销",redo:"重复",fullscreen:"全屏",openLink:"打开链接"},
// 英文
e.langs.en={bold:"Bold",underline:"Underline",italic:"Italic",forecolor:"Color",bgcolor:"Backcolor",strikethrough:"Strikethrough",eraser:"Eraser",source:"Codeview",quote:"Quote",fontfamily:"Font family",fontsize:"Font size",head:"Head",orderlist:"Ordered list",unorderlist:"Unordered list",alignleft:"Align left",aligncenter:"Align center",alignright:"Align right",link:"Insert link",text:"Text",submit:"Submit",cancel:"Cancel",unlink:"Unlink",table:"Table",emotion:"Emotions",img:"Image",video:"Video",width:"width",height:"height",location:"Location",loading:"Loading",searchlocation:"search",dynamicMap:"Dynamic",clearLocation:"Clear",langDynamicOneLocation:"Only one location in dynamic map",insertcode:"Insert Code",undo:"Undo",redo:"Redo",fullscreen:"Full screnn",openLink:"open link"}}),t(function(e,t){e.config={},
// 全屏时的 z-index
e.config.zindex=1e4,
// 是否打印log
e.config.printLog=!0,
// 菜单吸顶：false - 不吸顶；number - 吸顶，值为top值
e.config.menuFixed=0,
// 编辑源码时，过滤 javascript
e.config.jsFilter=!0,
// 编辑器允许的标签
e.config.legalTags="p,h1,h2,h3,h4,h5,h6,blockquote,table,ul,ol,pre",
// 语言包
e.config.lang=e.langs["zh-cn"],
// 菜单配置
e.config.menus=["source","|","bold","underline","italic","strikethrough","eraser","forecolor","bgcolor","|","quote","fontfamily","fontsize","head","unorderlist","orderlist","alignleft","aligncenter","alignright","|","link","unlink","table","emotion","|","img","video","location","insertcode","|","undo","redo","fullscreen"],
// 颜色配置
e.config.colors={
// 'value': 'title'
"#880000":"暗红色","#800080":"紫色","#ff0000":"红色","#ff00ff":"鲜粉色","#000080":"深蓝色","#0000ff":"蓝色","#00ffff":"湖蓝色","#008080":"蓝绿色","#008000":"绿色","#808000":"橄榄色","#00ff00":"浅绿色","#ffcc00":"橙黄色","#808080":"灰色","#c0c0c0":"银色","#000000":"黑色","#ffffff":"白色"},
// 字体
e.config.familys=["宋体","黑体","楷体","微软雅黑","Arial","Verdana","Georgia","Times New Roman","Microsoft JhengHei","Trebuchet MS","Courier New","Impact","Comic Sans MS","Consolas"],
// 字号
e.config.fontsizes={
// 格式：'value': 'title'
1:"12px",2:"13px",3:"16px",4:"18px",5:"24px",6:"32px",7:"48px"},
// 表情包
e.config.emotionsShow="icon",// 显示项，默认为'icon'，也可以配置成'value'
e.config.emotions={
// 'default': {
//     title: '默认',
//     data: './emotions.data'
// },
weibo:{title:"微博表情",data:[{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif",value:"[草泥马]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif",value:"[神马]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif",value:"[浮云]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_thumb.gif",value:"[给力]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f2/wg_thumb.gif",value:"[围观]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/vw_thumb.gif",value:"[威武]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/panda_thumb.gif",value:"[熊猫]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/81/rabbit_thumb.gif",value:"[兔子]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/otm_thumb.gif",value:"[奥特曼]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/15/j_thumb.gif",value:"[囧]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/hufen_thumb.gif",value:"[互粉]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c4/liwu_thumb.gif",value:"[礼物]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ac/smilea_thumb.gif",value:"[呵呵]"},{icon:"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0b/tootha_thumb.gif",value:"[哈哈]"}]}},
// 百度地图的key
e.config.mapAk="TVhjYjq1ICT2qqL5LdS8mwas",
// 上传图片的配置
// server地址
e.config.uploadImgUrl="",
// 超时时间
e.config.uploadTimeout=2e4,
// 用于存储上传回调事件
e.config.uploadImgFns={},
// 自定义上传图片的filename
// E.config.uploadImgFileName = 'customFileName';
// 自定义上传，设置为 true 之后，显示上传图标
e.config.customUpload=!1,
// 自定义上传的init事件
// E.config.customUploadInit = function () {....};
// 自定义上传时传递的参数（如 token）
e.config.uploadParams={},
// 自定义上传是的header参数
e.config.uploadHeaders={},
// 隐藏网络图片，默认为 false
e.config.hideLinkImg=!1,
// 是否过滤粘贴内容
e.config.pasteFilter=!0,
// 是否粘贴纯文本，当 editor.config.pasteFilter === false 时候，此配置将失效
e.config.pasteText=!1,
// 插入代码时，默认的语言
e.config.codeDefaultLang="javascript"}),t(function(e,t){e.UI={},
// 为菜单自定义配置的UI
e.UI.menus={
// 这个 default 不加引号，在 IE8 会报错
default:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-command"></i></a>',selected:".selected"},bold:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-bold"></i></a>',selected:".selected"},underline:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-underline"></i></a>',selected:".selected"},italic:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-italic"></i></a>',selected:".selected"},forecolor:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-pencil"></i></a>',selected:".selected"},bgcolor:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-brush"></i></a>',selected:".selected"},strikethrough:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-strikethrough"></i></a>',selected:".selected"},eraser:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-eraser"></i></a>',selected:".selected"},quote:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-quotes-left"></i></a>',selected:".selected"},source:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-code"></i></a>',selected:".selected"},fontfamily:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-font2"></i></a>',selected:".selected"},fontsize:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-text-height"></i></a>',selected:".selected"},head:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-header"></i></a>',selected:".selected"},orderlist:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-numbered"></i></a>',selected:".selected"},unorderlist:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-bullet"></i></a>',selected:".selected"},alignleft:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-left"></i></a>',selected:".selected"},aligncenter:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-center"></i></a>',selected:".selected"},alignright:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-right"></i></a>',selected:".selected"},link:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-link"></i></a>',selected:".selected"},unlink:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-unlink"></i></a>',selected:".selected"},table:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-table"></i></a>',selected:".selected"},emotion:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-happy"></i></a>',selected:".selected"},img:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-picture"></i></a>',selected:".selected"},video:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-play"></i></a>',selected:".selected"},location:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-location"></i></a>',selected:".selected"},insertcode:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-terminal"></i></a>',selected:".selected"},undo:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-ccw"></i></a>',selected:".selected"},redo:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-cw"></i></a>',selected:".selected"},fullscreen:{normal:'<a href="#" tabindex="-1"><i class="wangeditor-menu-img-enlarge2"></i></a>',selected:'<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-shrink2"></i></a>'}}}),t(function(e,t){e.fn.initDefaultConfig=function(){var n=this;n.config=t.extend({},e.config),n.UI=t.extend({},e.UI)}}),t(function(e,t){e.fn.addEditorContainer=function(){this.$editorContainer=t('<div class="wangEditor-container"></div>')}}),t(function(e,t){e.fn.addTxt=function(){var t=this,n=new e.Txt(t);t.txt=n}}),t(function(e,t){e.fn.addMenuContainer=function(){var t=this;t.menuContainer=new e.MenuContainer(t)}}),t(function(e,t){
// 存储创建菜单的函数
e.createMenuFns=[],e.createMenu=function(t){e.createMenuFns.push(t)},
// 创建所有菜单
e.fn.addMenus=function(){
// 检验 menuId 是否在配置中存在
function n(e){return a.indexOf(e)>=0}var i=this,a=i.config.menus;
// 遍历所有的菜单创建函数，并执行
t.each(e.createMenuFns,function(e,t){t.call(i,n)})}}),t(function(e,t){e.createMenu(function(t){var n="bold";if(t(n)){var i=this,a=i.config.lang,o=new e.Menu({editor:i,id:n,title:a.bold,commandName:"Bold"});
// 定义选中状态下的click事件
o.clickEventSelected=function(e){var t=i.isRangeEmpty();t?
// 如果选区没有内容
i.commandForElem("b,strong,h1,h2,h3,h4,h5",e,"Bold"):
// 如果选区有内容，则执行基础命令
i.command(e,"Bold")},
// 增加到editor对象中
i.menus[n]=o}})}),t(function(e,t){e.createMenu(function(t){var n="underline";if(t(n)){var i=this,a=i.config.lang,o=new e.Menu({editor:i,id:n,title:a.underline,commandName:"Underline"});
// 定义选中状态下的click事件
o.clickEventSelected=function(e){var t=i.isRangeEmpty();t?
// 如果选区没有内容
i.commandForElem("u,a",e,"Underline"):
// 如果选区有内容，则执行基础命令
i.command(e,"Underline")},
// 增加到editor对象中
i.menus[n]=o}})}),t(function(e,t){e.createMenu(function(t){var n="italic";if(t(n)){var i=this,a=i.config.lang,o=new e.Menu({editor:i,id:n,title:a.italic,commandName:"Italic"});
// 定义选中状态下的click事件
o.clickEventSelected=function(e){var t=i.isRangeEmpty();t?
// 如果选区没有内容
i.commandForElem("i",e,"Italic"):
// 如果选区有内容，则执行基础命令
i.command(e,"Italic")},
// 增加到editor对象中
i.menus[n]=o}})}),t(function(e,t){e.createMenu(function(n){var i="forecolor";if(n(i)){var a=this,o=a.config.lang,r=a.config.colors,c=new e.Menu({editor:a,id:i,title:o.forecolor}),l=t("<div></div>");t.each(r,function(e,t){l.append(['<a href="#" class="color-item"','    title="'+t+'" commandValue="'+e+'" ','    style="color: '+e+'" ','><i class="wangeditor-menu-img-pencil"></i></a>'].join(""))}),l.on("click","a[commandValue]",function(e){
// 执行命令
var n=t(this),i=n.attr("commandValue");c.selected&&a.isRangeEmpty()?
// 当前处于选中状态，并且选中内容为空
a.commandForElem("font[color]",e,"forecolor",i):
// 当前未处于选中状态，或者有选中内容。则执行默认命令
a.command(e,"forecolor",i)}),c.dropPanel=new e.DropPanel(a,c,{$content:l,width:125}),
// 定义 update selected 事件
c.updateSelectedEvent=function(){var e=a.getRangeElem();return e=a.getSelfOrParentByName(e,"font[color]"),!!e},
// 增加到editor对象中
a.menus[i]=c}})}),t(function(e,t){e.createMenu(function(n){
// 检查元素是否有 background-color: 内联样式
function i(e){var t;return!!(e&&e.style&&null!=e.style.cssText&&(t=e.style.cssText,t&&t.indexOf("background-color:")>=0))}var a="bgcolor";if(n(a)){var o=this,r=o.config.lang,c=o.config.colors,l=new e.Menu({editor:o,id:a,title:r.bgcolor}),d=t("<div></div>");t.each(c,function(e,t){d.append(['<a href="#" class="color-item"','    title="'+t+'" commandValue="'+e+'" ','    style="color: '+e+'" ','><i class="wangeditor-menu-img-brush"></i></a>'].join(""))}),d.on("click","a[commandValue]",function(e){
// 执行命令
var n=t(this),a=n.attr("commandValue");l.selected&&o.isRangeEmpty()?
// 当前处于选中状态，并且选中内容为空。使用 commandForElem 执行命令
o.commandForElem({selector:"span,font",check:i},e,"BackColor",a):
// 当前未处于选中状态，或者有选中内容。则执行默认命令
o.command(e,"BackColor",a)}),l.dropPanel=new e.DropPanel(o,l,{$content:d,width:125}),
// 定义 update selected 事件
l.updateSelectedEvent=function(){var e=o.getRangeElem();return e=o.getSelfOrParentByName(e,"span,font",i),!!e},
// 增加到editor对象中
o.menus[a]=l}})}),t(function(e,t){e.createMenu(function(t){var n="strikethrough";if(t(n)){var i=this,a=i.config.lang,o=new e.Menu({editor:i,id:n,title:a.strikethrough,commandName:"StrikeThrough"});
// 定义选中状态下的click事件
o.clickEventSelected=function(e){var t=i.isRangeEmpty();t?
// 如果选区没有内容
i.commandForElem("strike",e,"StrikeThrough"):
// 如果选区有内容，则执行基础命令
i.command(e,"StrikeThrough")},
// 增加到editor对象中
i.menus[n]=o}})}),t(function(e,t){e.createMenu(function(n){var i="eraser";if(n(i)){var a=this,o=a.config.lang,r=new e.Menu({editor:a,id:i,title:o.eraser,commandName:"RemoveFormat"});
// 定义点击事件
r.clickEvent=function(e){
// 自定义的命令函数
function n(){var e,n,i,a,o,c,l,d=this;
// 获取选区 elem
e=d.getRangeElem(),
// 第一步，获取 quote 父元素
a=d.getSelfOrParentByName(e,"blockquote"),a&&(o=t(a),r=t("<p>"+o.text()+"</p>"),o.after(r).remove()),
// 第二步，获取 p h 父元素
n=d.getSelfOrParentByName(e,"p,h1,h2,h3,h4,h5"),n&&(i=t(n),r=t("<p>"+i.text()+"</p>"),i.after(r).remove()),
// 第三步，获取list
c=d.getSelfOrParentByName(e,"ul,ol"),c&&(l=t(c),r=t("<p>"+l.text()+"</p>"),l.after(r).remove())}
// 自定义 callback 事件
function i(){
// callback中，设置range为clearElem
var e=this;r&&e.restoreSelectionByElem(r.get(0))}var o=a.isRangeEmpty();if(!o)
// 选区不是空的，则执行默认命令
return void a.command(e,"RemoveFormat");var r;
// 执行自定义命令
a.customCommand(e,n,i)},
// 增加到editor对象中
a.menus[i]=r}})}),t(function(e,t){e.createMenu(function(n){
// 更新内容
function i(){var e=l.$codeTextarea,n=r.txt.$txt,i=t.trim(e.val());// 取值
i||(i="<p><br></p>"),
// 过滤js代码
r.config.jsFilter&&(i=i.replace(/<script[\s\S]*?<\/script>/gi,""));
// 赋值
try{n.html(i)}catch(e){}}var a="source";if(n(a)){var o,r=this,c=r.config.lang,l=new e.Menu({editor:r,id:a,title:c.source});l.isShowCode=!1,
// 定义click事件
l.clickEvent=function(e){var n=this,a=n.editor,r=a.txt.$txt,c=r.outerHeight(),d=r.height();n.$codeTextarea||(n.$codeTextarea=t('<textarea class="code-textarea"></textarea>'));var s=n.$codeTextarea;s.css({height:d,"margin-top":c-d}),
// 赋值
s.val(r.html()),
// 监控变化
s.on("change",function(e){i()}),
// 渲染
r.after(s).hide(),s.show(),
// 更新状态
l.isShowCode=!0,
// 执行 updateSelected 事件
this.updateSelected(),
// 禁用其他菜单
a.disableMenusExcept("source"),
// 记录当前html值
o=r.html()},
// 定义选中状态下的click事件
l.clickEventSelected=function(e){var t=this,n=t.editor,a=n.txt.$txt,r=t.$codeTextarea;r&&(
// 更新内容
i(),
// 渲染
r.after(a).hide(),a.show(),
// 更新状态
l.isShowCode=!1,
// 执行 updateSelected 事件
this.updateSelected(),
// 启用其他菜单
n.enableMenusExcept("source"),
// 判断是否执行 onchange 事件
a.html()!==o&&n.onchange&&"function"==typeof n.onchange&&n.onchange.call(n))},
// 定义切换选中状态事件
l.updateSelectedEvent=function(){return this.isShowCode},
// 增加到editor对象中
r.menus[a]=l}})}),t(function(e,t){e.createMenu(function(n){var i="quote";if(n(i)){var a=this,o=a.config.lang,r=new e.Menu({editor:a,id:i,title:o.quote,commandName:"formatBlock",commandValue:"blockquote"});
// 定义click事件
r.clickEvent=function(e){
// 自定义command事件
function n(){c=t("<p>"+o.text()+"</p>"),o.after(c).remove(),c.wrap("<blockquote>")}
// 自定义 callback 事件
function i(){
// callback中，设置range为quote
var e=this;c&&e.restoreSelectionByElem(c.get(0))}var o,r=a.getRangeElem();if(!r)return void e.preventDefault();var c,l=a.getSelfOrParentByName(r,"blockquote");
// 说明当前在quote之内，不做任何处理
// 无文字，则不允许执行引用
// 执行自定义命令
// 执行默认命令
// IE8 下执行此处（不过，经测试代码无效，也不报错）
return l?void e.preventDefault():(r=a.getLegalTags(r),o=t(r),o.text()?r?void a.customCommand(e,n,i):void a.command(e,"formatBlock","blockquote"):void 0)},
// 定义选中状态下的click事件
r.clickEventSelected=function(e){
// 自定义的command事件
function n(){var e,n;if(e=t(r),n=e.children(),n.length)return n.each(function(n){var i=t(this);"P"===i.get(0).nodeName?e.after(i):e.after("<p>"+i.text()+"</p>"),c=i}),void e.remove()}
// 自定义的callback函数
function i(){
// callback中，设置range为lastChild
var e=this;c&&e.restoreSelectionByElem(c.get(0))}var o,r,c;
// 获取当前选区的elem，并试图往上找 quote 元素
// 执行自定义命令
// 没找到，则返回
return o=a.getRangeElem(),(r=a.getSelfOrParentByName(o,"blockquote"))?void a.customCommand(e,n,i):void e.preventDefault()},
// 定义更新选中状态的事件
r.updateSelectedEvent=function(){var e,t=this,n=t.editor;return e=n.getRangeElem(),e=n.getSelfOrParentByName(e,"blockquote"),!!e},
// 增加到editor对象中
a.menus[i]=r,
// --------------- 两次点击 enter 跳出引用 ---------------
a.ready(function(){var e=this,n=e.txt.$txt,i=!1;// 是不是刚刚在quote中按了 enter 键
n.on("keydown",function(n){if(13!==n.keyCode)
// 不是 enter 键
return void(i=!1);var a=e.getRangeElem();if(a=e.getSelfOrParentByName(a,"blockquote"),!a)
// 选区不是 quote
return void(i=!1);if(!i)
// 最近没有在qote中按enter键
return void(i=!0);var o=e.getRangeElem(),r=t(o);r.length&&r.parent().after(r),
// 设置选区
e.restoreSelectionByElem(o,"start"),i=!1,
// 阻止默认行文
n.preventDefault()})}),// editor.ready(
// --------------- 处理quote中无内容时不能删除的问题 ---------------
a.ready(function(){function e(){i&&i.remove()}function n(){if(i){var e=i.prev();e.length?
// 有 prev 则定位到 prev 最后
a.restoreSelectionByElem(e.get(0)):
// 无 prev 则初始化选区
a.initSelection()}}var i,a=this,o=a.txt.$txt;o.on("keydown",function(o){if(8===o.keyCode){var r=a.getRangeElem();if(r=a.getSelfOrParentByName(r,"blockquote")){i=t(r);var c=i.text();c||a.customCommand(o,e,n)}}})})}})}),t(function(e,t){e.createMenu(function(n){var i="fontfamily";if(n(i)){var a=this,o=a.config.lang,r=a.config.familys,c=new e.Menu({editor:a,id:i,title:o.fontfamily,commandName:"fontName"}),l={};/*
            data 需要的结构
            {
                'commandValue': 'title'
                ...
            }
        */
t.each(r,function(e,t){
// configFamilys 是数组，data 是对象
l[t]=t});
// 创建droplist
var d='<span style="font-family:{#commandValue};">{#title}</span>';c.dropList=new e.DropList(a,c,{data:l,tpl:d,selectorForELemCommand:"font[face]"}),
// 定义 update selected 事件
c.updateSelectedEvent=function(){var e=a.getRangeElem();return e=a.getSelfOrParentByName(e,"font[face]"),!!e},
// 增加到editor对象中
a.menus[i]=c}})}),t(function(e,t){e.createMenu(function(t){var n="fontsize";if(t(n)){var i=this,a=i.config.lang,o=i.config.fontsizes,r=new e.Menu({editor:i,id:n,title:a.fontsize,commandName:"fontSize"}),c=o,l='<span style="font-size:{#title};">{#title}</span>';r.dropList=new e.DropList(i,r,{data:c,tpl:l,selectorForELemCommand:"font[size]"}),
// 定义 update selected 事件
r.updateSelectedEvent=function(){var e=i.getRangeElem();return e=i.getSelfOrParentByName(e,"font[size]"),!!e},
// 增加到editor对象中
i.menus[n]=r}})}),t(function(e,t){e.createMenu(function(t){function n(e){r.queryCommandState("InsertOrderedList")?(o=!0,
// 先取消有序列表
r.command(e,"InsertOrderedList")):o=!1}function i(e){o&&
// 再设置有序列表
r.command(e,"InsertOrderedList")}var a="head";if(t(a)){var o,r=this,c=r.config.lang,l=new e.Menu({editor:r,id:a,title:c.head,commandName:"formatBlock"}),d={"<h1>":"标题1","<h2>":"标题2","<h3>":"标题3","<h4>":"标题4","<h5>":"标题5"},s="{#commandValue}{#title}";l.dropList=new e.DropList(r,l,{data:d,tpl:s,
// 对 ol 直接设置 head，会出现每个 li 的 index 都变成 1 的问题，因此要先取消 ol，然后设置 head，最后再增加上 ol
beforeEvent:n,afterEvent:i}),
// 定义 update selected 事件
l.updateSelectedEvent=function(){var e=r.getRangeElem();return e=r.getSelfOrParentByName(e,"h1,h2,h3,h4,h5"),!!e},
// 增加到editor对象中
r.menus[a]=l}})}),t(function(e,t){e.createMenu(function(t){var n="unorderlist";if(t(n)){var i=this,a=i.config.lang,o=new e.Menu({editor:i,id:n,title:a.unorderlist,commandName:"InsertUnorderedList"});
// 增加到editor对象中
i.menus[n]=o}})}),t(function(e,t){e.createMenu(function(t){var n="orderlist";if(t(n)){var i=this,a=i.config.lang,o=new e.Menu({editor:i,id:n,title:a.orderlist,commandName:"InsertOrderedList"});
// 增加到editor对象中
i.menus[n]=o}})}),t(function(e,t){e.createMenu(function(n){var i="alignleft";if(n(i)){var a=this,o=a.config.lang,r=new e.Menu({editor:a,id:i,title:o.alignleft,commandName:"JustifyLeft"});
// 定义 update selected 事件
r.updateSelectedEvent=function(){var e=a.getRangeElem();return e=a.getSelfOrParentByName(e,"p,h1,h2,h3,h4,h5,li",function(e){var n;return!!(e&&e.style&&null!=e.style.cssText&&(n=e.style.cssText,n&&/text-align:\s*left;/.test(n)))||"left"===t(e).attr("align")}),!!e},
// 增加到editor对象中
a.menus[i]=r}})}),t(function(e,t){e.createMenu(function(n){var i="aligncenter";if(n(i)){var a=this,o=a.config.lang,r=new e.Menu({editor:a,id:i,title:o.aligncenter,commandName:"JustifyCenter"});
// 定义 update selected 事件
r.updateSelectedEvent=function(){var e=a.getRangeElem();return e=a.getSelfOrParentByName(e,"p,h1,h2,h3,h4,h5,li",function(e){var n;return!!(e&&e.style&&null!=e.style.cssText&&(n=e.style.cssText,n&&/text-align:\s*center;/.test(n)))||"center"===t(e).attr("align")}),!!e},
// 增加到editor对象中
a.menus[i]=r}})}),t(function(e,t){e.createMenu(function(n){var i="alignright";if(n(i)){var a=this,o=a.config.lang,r=new e.Menu({editor:a,id:i,title:o.alignright,commandName:"JustifyRight"});
// 定义 update selected 事件
r.updateSelectedEvent=function(){var e=a.getRangeElem();return e=a.getSelfOrParentByName(e,"p,h1,h2,h3,h4,h5,li",function(e){var n;return!!(e&&e.style&&null!=e.style.cssText&&(n=e.style.cssText,n&&/text-align:\s*right;/.test(n)))||"right"===t(e).attr("align")}),!!e},
// 增加到editor对象中
a.menus[i]=r}})}),t(function(e,t){e.createMenu(function(n){var i="link";if(n(i)){var a=this,o=a.config.lang,r=new e.Menu({editor:a,id:i,title:o.link}),c=t("<div></div>"),l=t('<div style="margin:20px 10px;" class="clearfix"></div>'),d=l.clone(),s=l.clone().css("margin","0 10px"),u=t('<input type="text" class="block" placeholder="'+o.text+'"/>'),f=t('<input type="text" class="block" placeholder="'+o.link+'"/>'),m=t('<button class="right">'+o.submit+"</button>"),p=t('<button class="right gray">'+o.cancel+"</button>");l.append(u),d.append(f),s.append(m).append(p),c.append(l).append(d).append(s),r.dropPanel=new e.DropPanel(a,r,{$content:c,width:300}),
// 定义click事件
r.clickEvent=function(e){var t=this,n=t.dropPanel;
// -------------隐藏----------------
if(n.isShowing)return void n.hide();
// -------------显示----------------
// 重置 input
u.val(""),f.val("http://");
// 获取url
var i="",o=a.getRangeElem();o=a.getSelfOrParentByName(o,"a"),o&&(i=o.href||"");
// 获取 text
var r="",c=a.isRangeEmpty();c?o&&(
// 如果选区空，并且在 a 标签之内
r=o.textContent||o.innerHTML):
// 选区不是空
r=a.getRangeText()||"",
// 设置 url 和 text
i&&f.val(i),r&&u.val(r),
// 如果有选区内容，textinput 不能修改
c?u.removeAttr("disabled"):u.attr("disabled",!0),
// 显示（要设置好了所有input的值和属性之后再显示）
n.show()},
// 定义 update selected 事件
r.updateSelectedEvent=function(){var e=a.getRangeElem();return e=a.getSelfOrParentByName(e,"a"),!!e},
// 『取消』 按钮
p.click(function(e){e.preventDefault(),r.dropPanel.hide()}),
// 『确定』按钮
m.click(function(n){n.preventDefault();var i,o,c,l,d,s,m=a.getRangeElem(),p=a.getSelfOrParentByName(m,"a"),h=a.isRangeEmpty(),g=a.txt.$txt,v="link"+e.random(),w=t.trim(f.val()),x=t.trim(u.val());
// 无选中区域，在 a 标签之内，修改该 a 标签的内容和链接
// 执行命令
// 无选中区域，不在 a 标签之内，插入新的链接
// 选中区域有内容，则执行默认命令
// 获取目前 txt 内所有链接，并为当前链接做一个标记
// 执行命令 
// 去的没有标记的链接，即刚刚插入的链接
// 增加 _blank
// 去掉之前做的标记
return w?(x||(x=w),void(h?p?(i=t(p),c=function(){i.attr("href",w),i.text(x)},l=function(){var e=this;e.restoreSelectionByElem(p)},a.customCommand(n,c,l)):(o='<a href="'+w+'" target="_blank">'+x+"</a>",e.userAgent.indexOf("Firefox")>0&&(o+="<span>&nbsp;</span>"),a.command(n,"insertHtml",o)):(d=g.find("a"),d.attr(v,"1"),a.command(n,"createLink",w),s=g.find("a").not("["+v+"]"),s.attr("target","_blank"),d.removeAttr(v)))):void r.dropPanel.focusFirstInput()}),
// 增加到editor对象中
a.menus[i]=r}})}),t(function(e,t){e.createMenu(function(n){var i="unlink";if(n(i)){var a=this,o=a.config.lang,r=new e.Menu({editor:a,id:i,title:o.unlink,commandName:"unLink"});
// click 事件
r.clickEvent=function(e){function n(){l.after(d).remove()}function i(){a.restoreSelectionByElem(d.get(0))}var o=a.isRangeEmpty();if(!o)
// 有选中区域，或者IE8，执行默认命令
return void a.command(e,"unLink");
// 无选中区域...
var r=a.getRangeElem(),c=a.getSelfOrParentByName(r,"a");if(!c)
// 不在 a 之内，返回
return void e.preventDefault();
// 在 a 之内
var l=t(c),d=t("<span>"+l.text()+"</span>");a.customCommand(e,n,i)},
// 增加到editor对象中
a.menus[i]=r}})}),t(function(e,t){e.createMenu(function(n){var i="table";if(n(i)){var a,o,r,c=this,l=c.config.lang,d=new e.Menu({editor:c,id:i,title:l.table}),s=t('<div style="font-size: 14px; color: #666; text-align:right;"></div>'),u=t('<table class="choose-table" style="margin-bottom:10px;margin-top:5px;">'),f=t("<span>0</span>"),m=t("<span> 行 </span>"),p=t("<span>0</span>"),h=t("<span> 列</span>");
// 创建一个n行n列的表格
for(o=0;o<15;o++){for(a=t('<tr index="'+(o+1)+'">'),r=0;r<20;r++)a.append(t('<td index="'+(r+1)+'">'));u.append(a)}s.append(u),s.append(f).append(m).append(p).append(h),
// 定义table事件
u.on("mouseenter","td",function(e){var n=t(e.currentTarget),i=n.attr("index"),a=n.parent(),o=a.attr("index");
// 显示
f.text(o),p.text(i),
// 遍历设置背景颜色
u.find("tr").each(function(){var e=t(this),n=e.attr("index");parseInt(n,10)<=parseInt(o,10)?
// 该行需要可能需要设置背景色
e.find("td").each(function(){var e=t(this),n=e.attr("index");parseInt(n,10)<=parseInt(i,10)?
// 需要设置背景色
e.addClass("active"):
// 需要移除背景色
e.removeClass("active")}):
// 改行不需要设置背景色
e.find("td").removeClass("active")})}).on("mouseleave",function(e){
// mouseleave 删除背景色
u.find("td").removeClass("active"),f.text(0),p.text(0)}),
// 插入表格
u.on("click","td",function(e){var n,i,a=t(e.currentTarget),o=a.attr("index"),r=a.parent(),l=r.attr("index"),d=parseInt(l,10),s=parseInt(o,10),u="<table>";for(n=0;n<d;n++){for(u+="<tr>",i=0;i<s;i++)u+="<td><span>&nbsp;</span></td>";u+="</tr>"}u+="</table>",
// -------- 执行命令 --------
c.command(e,"insertHtml",u)}),
// 创建 panel
d.dropPanel=new e.DropPanel(c,d,{$content:s,width:262}),
// 增加到editor对象中
c.menus[i]=d}})}),t(function(e,t){e.createMenu(function(n){
// 添加表情图片的函数
function i(e,n){
// 添加表情图片
t.each(e,function(e,i){var a=i.icon||i.url,r=i.value||i.title,c="icon"===d?a:r,l=t('<a href="#" commandValue="'+c+'"></a>'),s=t("<img>");s.attr("_src",a),// 先将 src 复制到 '_src' 属性，先不加载
l.append(s),n.append(l),
// 记录下每一个表情图片的地址
o.emotionUrls.push(a)})}var a="emotion";if(n(a)){var o=this,r=o.config,c=r.lang,l=r.emotions,d=r.emotionsShow;
// 记录每一个表情图片的地址
o.emotionUrls=[];
// 创建 menu 对象
var s=new e.Menu({editor:o,id:a,title:c.emotion}),u=t('<div class="panel-tab"></div>'),f=t('<div class="tab-container"></div>'),m=t('<div class="content-container emotion-content-container"></div>');t.each(l,function(n,a){var o=a.title,r=a.data;e.log("正在处理 "+o+" 表情的数据...");
// 增加该组表情的tab和content
var c=t('<a href="#">'+o+" </a>");f.append(c);var l=t('<div class="content"></div>');
// 处理data
if(m.append(l),
// tab 切换事件
c.click(function(e){f.children().removeClass("selected"),m.children().removeClass("selected"),l.addClass("selected"),c.addClass("selected"),e.preventDefault()}),"string"==typeof r)
// url 形式，需要通过ajax从该url获取数据
e.log("将通过 "+r+" 地址ajax下载表情包"),t.get(r,function(n){n=t.parseJSON(n),e.log("下载完毕，得到 "+n.length+" 个表情"),i(n,l)});else{if(!(Object.prototype.toString.call(r).toLowerCase().indexOf("array")>0))
// 其他情况，data格式不对
return void e.error("data 数据格式错误，请修改为正确格式，参考文档："+e.docsite);
// 数组，即 data 直接就是表情包数据
i(r,l)}}),u.append(f).append(m),
// 默认显示第一个tab
f.children().first().addClass("selected"),m.children().first().addClass("selected"),
// 插入表情command事件
m.on("click","a[commandValue]",function(e){var n=t(e.currentTarget),i=n.attr("commandValue");
// commandValue 有可能是图片url，也有可能是表情的 value，需要区别对待
"icon"===d?
// 插入图片
o.command(e,"InsertImage",i):
// 插入value
o.command(e,"insertHtml","<span>"+i+"</span>"),e.preventDefault()}),
// 添加panel
s.dropPanel=new e.DropPanel(o,s,{$content:u,width:350}),
// 定义click事件（异步加载表情图片）
s.clickEvent=function(n){var i=this,a=i.dropPanel;
// -------------隐藏-------------
// -------------隐藏-------------
// -------------显示-------------
// 异步加载图片
return a.isShowing?void a.hide():(a.show(),void(i.imgLoaded||(m.find("img").each(function(){var n=t(this),i=n.attr("_src");n.on("error",function(){e.error("加载不出表情图片 "+i)}),n.attr("src",i),n.removeAttr("_src")}),i.imgLoaded=!0)))},
// 增加到editor对象中
o.menus[a]=s}})}),t(function(e,t){
// --------------- 处理网络图片content ---------------
function n(e,n,i){
// callback 
function a(){c.val("")}var o=e.config.lang,r=t('<div style="margin:20px 10px 10px 10px;"></div>'),c=t('<input type="text" class="block" placeholder="http://"/>');r.append(c);var l=t('<button class="right">'+o.submit+"</button>"),d=t('<button class="right gray">'+o.cancel+"</button>");i.append(r).append(l).append(d),
// 取消
d.click(function(e){e.preventDefault(),n.dropPanel.hide()}),
// 确定
l.click(function(n){n.preventDefault();var i=t.trim(c.val());if(!i)
// 无内容
return void c.focus();var o='<img style="max-width:100%;" src="'+i+'"/>';e.command(n,"insertHtml",o,a)})}e.createMenu(function(i){
// tab 切换事件
function a(){p.click(function(e){f.children().removeClass("selected"),m.children().removeClass("selected"),g.addClass("selected"),p.addClass("selected"),e.preventDefault()}),h.click(function(t){f.children().removeClass("selected"),m.children().removeClass("selected"),v.addClass("selected"),h.addClass("selected"),t.preventDefault(),
// focus input
e.placeholder&&v.find("input[type=text]").focus()}),
// 默认情况
// $uploadTab.addClass('selected');
// $uploadContent.addClass('selected');
p.click()}
// 隐藏上传图片
function o(){f.remove(),g.remove(),v.addClass("selected")}
// 隐藏网络图片
function r(){f.remove(),v.remove(),g.addClass("selected")}var c="img";if(i(c)){var l=this,d=l.config.lang,s=new e.Menu({editor:l,id:c,title:d.img}),u=t('<div class="panel-tab"></div>'),f=t('<div class="tab-container"></div>'),m=t('<div class="content-container"></div>');u.append(f).append(m);
// tab
var p=t('<a href="#">上传图片</a>'),h=t('<a href="#">网络图片</a>');f.append(p).append(h);
// 上传图片 content
var g=t('<div class="content"></div>');m.append(g);
// 网络图片 content
var v=t('<div class="content"></div>');m.append(v),n(l,s,v),
// 添加panel
s.dropPanel=new e.DropPanel(l,s,{$content:u,width:400,onRender:function(){
// 渲染后的回调事件，用于执行自定义上传的init
// 因为渲染之后，上传面板的dom才会被渲染到页面，才能让第三方空间获取到
var e=l.config.customUploadInit;e&&e.call(l)}}),
// 增加到editor对象中
l.menus[c]=s,
// 判断用户是否配置了上传图片
l.ready(function(){
// 点击 $uploadContent 立即隐藏 dropPanel
// 为了兼容IE8、9的上传，因为IE8、9使用 modal 上传
// 这里使用异步，为了不妨碍高级浏览器通过点击 $uploadContent 选择文件
function e(){s.dropPanel.hide()}var t=this,n=t.config,i=n.uploadImgUrl,c=n.customUpload,l=n.hideLinkImg;i||c?(
// 第一，暴露出 $uploadContent 以便用户自定义 ！！！重要
t.$uploadContent=g,
// 第二，绑定tab切换事件
a(),l&&
// 隐藏网络图片
r()):
// 未配置上传图片功能
o(),g.click(function(){setTimeout(e)})})}})}),t(function(e,t){e.createMenu(function(n){var i="video";if(n(i)){var a=this,o=a.config.lang,r=/^<(iframe)|(embed)/i,c=new e.Menu({editor:a,id:i,title:o.video}),l=t("<div></div>"),d=t('<div style="margin:20px 10px;"></div>'),s=t('<input type="text" class="block" placeholder=\'格式如：<iframe src="..." frameborder=0 allowfullscreen></iframe>\'/>');d.append(s);var u=t('<div style="margin:20px 10px;"></div>'),f=t('<input type="text" value="640" style="width:50px;text-align:center;"/>'),m=t('<input type="text" value="498" style="width:50px;text-align:center;"/>');u.append("<span> "+o.width+" </span>").append(f).append("<span> px &nbsp;&nbsp;&nbsp;</span>").append("<span> "+o.height+" </span>").append(m).append("<span> px </span>");var p=t("<div></div>"),h=t('<a href="http://www.kancloud.cn/wangfupeng/wangeditor2/134973" target="_blank" style="display:inline-block;margin-top:10px;margin-left:10px;color:#999;">如何复制视频链接？</a>'),g=t('<button class="right">'+o.submit+"</button>"),v=t('<button class="right gray">'+o.cancel+"</button>");p.append(h).append(g).append(v),l.append(d).append(u).append(p),
// 取消按钮
v.click(function(e){e.preventDefault(),s.val(""),c.dropPanel.hide()}),
// 确定按钮
g.click(function(e){e.preventDefault();var n,i=t.trim(s.val()),o=parseInt(f.val()),l=parseInt(m.val()),d=t("<div>"),u="<p>{content}</p>";
// 验证数据
// 验证数据
// 设置高度和宽度
// 拼接字符串
// 执行命令
return i?r.test(i)?isNaN(o)||isNaN(l)?void alert("宽度或高度不是数字！"):(n=t(i),n.attr("width",o).attr("height",l),u=u.replace("{content}",d.append(n).html()),a.command(e,"insertHtml",u),void s.val("")):(alert("视频链接格式错误！"),void c.dropPanel.focusFirstInput()):void c.dropPanel.focusFirstInput()}),
// 创建panel
c.dropPanel=new e.DropPanel(a,c,{$content:l,width:400}),
// 增加到editor对象中
a.menus[i]=c}})}),t(function(e,t){
// 判断浏览器的 input 是否支持 keyup
var n=function(e){return"onkeyup"in e}(document.createElement("input"));
// 百度地图的key
e.baiduMapAk="TVhjYjq1ICT2qqL5LdS8mwas",
// 一个页面中，如果有多个编辑器，地图会出现问题。这个参数记录一下，如果超过 1 就提示
e.numberOfLocation=0,e.createMenu(function(i){function a(){g.val("")}var o="location";if(i(o)){if(++e.numberOfLocation>1)return void e.error("目前不支持在一个页面多个编辑器上同时使用地图，可通过自定义菜单配置去掉地图菜单");var r=this,c=r.config,l=c.lang,d=c.mapAk;
// 地图的变量存储到这个地方
r.mapData={};var s=r.mapData;
// ---------- 地图事件 ----------
s.markers=[],s.mapContainerId="map"+e.random(),s.clearLocations=function(){var e=s.map;e&&(e.clearOverlays(),
//同时，清空marker数组
s.markers=[])},s.searchMap=function(){var e=s.map;if(e){var t,n,i=window.BMap,a=h.val(),o=g.val();""!==a&&(o&&""!==o||e.centerAndZoom(a,11),
//地址解析
o&&""!==o&&(t=new i.Geocoder,
// 将地址解析结果显示在地图上,并调整地图视野
t.getPoint(o,function(t){t?(e.centerAndZoom(t,13),n=new i.Marker(t),e.addOverlay(n),n.enableDragging(),//允许拖拽
s.markers.push(n)):
// alert('未找到');
e.centerAndZoom(a,11)},a)))}};
// load script 之后的 callback
var u=!1;window.baiduMapCallBack=function(){//开启鼠标滚轮缩放
//根据IP定位
function t(t){var i=t.name;a.setCenter(i),
// 设置城市名称
h.val(i),e.placeholder&&g.focus();var o,r;n?(
// 并绑定搜索事件 - input 支持 keyup
r=function(e){"keyup"===e.type&&13===e.keyCode&&e.preventDefault(),o&&clearTimeout(o),o=setTimeout(s.searchMap,500)},h.on("keyup change paste",r),g.on("keyup change paste",r)):(
// 并绑定搜索事件 - input 不支持 keyup
r=function(){if(!m.is(":visible"))
// panel 不显示了，就不用再监控了
return void clearTimeout(o);var e="",t="",n=h.val(),i=g.val();n===e&&i===t||(
// 刚获取的数据和之前的数据不一致，执行查询
s.searchMap(),
// 更新数据
e=n,t=i),
// 继续监控
o&&clearTimeout(o),o=setTimeout(r,1e3)},
// 开始监控
o=setTimeout(r,1e3))}
// 避免重复加载
if(!u){u=!0;var i=window.BMap;s.map||(
// 创建Map实例
s.map=new i.Map(s.mapContainerId));var a=s.map;a.centerAndZoom(new i.Point(116.404,39.915),11),// 初始化地图,设置中心点坐标和地图级别
a.addControl(new i.MapTypeControl),//添加地图类型控件
a.setCurrentCity("北京"),// 设置地图显示的城市 此项是必须设置的
a.enableScrollWheelZoom(!0);var o=new i.LocalCity;o.get(t),
//鼠标点击，创建位置
a.addEventListener("click",function(e){var t=new i.Marker(new i.Point(e.point.lng,e.point.lat));a.addOverlay(t),t.enableDragging(),s.markers.push(t)},!1)}},s.loadMapScript=function(){var t=document.createElement("script");t.type="text/javascript",t.src="https://api.map.baidu.com/api?v=2.0&ak="+d+"&s=1&callback=baiduMapCallBack";// baiduMapCallBack是一个本地函数
try{
// IE10- 报错
document.body.appendChild(t)}catch(t){e.error("加载地图过程中发生错误")}},
// 初始化地图
s.initMap=function(){window.BMap?
// 不是第一次，直接处理地图即可
window.baiduMapCallBack():
// 第一次，先加载地图 script，再处理地图（script加载完自动执行处理）
s.loadMapScript()};
// ---------- 创建 menu 对象 ----------
var f=new e.Menu({editor:r,id:o,title:l.location});r.menus[o]=f;
// ---------- 构建UI ----------
// panel content 
var m=t("<div></div>"),p=t('<div style="margin:10px 0;"></div>'),h=t('<input type="text"/>');h.css({width:"80px","text-align":"center"});var g=t('<input type="text"/>');g.css({width:"300px","margin-left":"10px"}).attr("placeholder",l.searchlocation);var v=t('<button class="right link">'+l.clearLocation+"</button>");p.append(v).append(h).append(g),m.append(p),
// 清除位置按钮
v.click(function(e){g.val(""),g.focus(),s.clearLocations(),e.preventDefault()});
// 地图
var w=t('<div id="'+s.mapContainerId+'"></div>');w.css({height:"260px",width:"100%",position:"relative","margin-top":"10px",border:"1px solid #f1f1f1"});var x=t("<span>"+l.loading+"</span>");x.css({position:"absolute",width:"100px","text-align":"center",top:"45%",left:"50%","margin-left":"-50px"}),w.append(x),m.append(w);
// 按钮
var y=t('<div style="margin:10px 0;"></div>'),b=t('<button class="right">'+l.submit+"</button>"),E=t('<button class="right gray">'+l.cancel+"</button>"),C=t('<label style="display:inline-block;margin-top:10px;color:#666;"></label>'),k=t('<input type="checkbox">');C.append(k).append('<span style="display:inline-block;margin-left:5px;">  '+l.dynamicMap+"</span>"),y.append(C).append(b).append(E),m.append(y),
// 『取消』按钮事件
E.click(function(e){e.preventDefault(),a(),f.dropPanel.hide()}),
// 『确定』按钮事件
b.click(function(e){e.preventDefault();var n,i,o,c=s.map,d=k.is(":checked"),u=s.markers,f=c.getCenter(),m=f.lng,p=f.lat,h=c.getZoom(),g=c.getSize(),v=g.width,w=g.height;if(
//动态地址
i=d?"http://ueditor.baidu.com/ueditor/dialogs/map/show.html#":"http://api.map.baidu.com/staticimage?",
//src参数
i=i+"center="+m+","+p+"&zoom="+h+"&width="+v+"&height="+w,u.length>0&&(i+="&markers=",
//添加所有的marker
t.each(u,function(e,t){n=t.getPosition(),e>0&&(i+="|"),i=i+n.lng+","+n.lat})),d){if(u.length>1)return void alert(l.langDynamicOneLocation);i+="&markerStyles=l,A",
//插入iframe
o='<iframe class="ueditor_baidumap" src="{src}" frameborder="0" width="'+v+'" height="'+w+'"></iframe>',o=o.replace("{src}",i),r.command(e,"insertHtml",o,a)}else
//插入图片
r.command(e,"insertHtml",'<img style="max-width:100%;" src="'+i+'"/>',a)}),
// 根据 UI 创建菜单 panel
f.dropPanel=new e.DropPanel(r,f,{$content:m,width:500}),
// ---------- 事件 ----------
// render 时执行事件
f.onRender=function(){d===e.baiduMapAk&&e.warn("建议在配置中自定义百度地图的mapAk，否则可能影响地图功能，文档："+e.docsite)},
// click 事件
f.clickEvent=function(e){var t=this,n=t.dropPanel,i=!1;
// -------------隐藏-------------
// -------------隐藏-------------
// -------------显示-------------
// 第一次，先加载地图
return n.isShowing?void n.hide():(s.map||(i=!0),n.show(),s.initMap(),void(i||g.focus()))}}})}),t(function(e,t){
// 加载 highlightjs 代码
function n(){if(!(e.userAgent.indexOf("MSIE 8")>0||window.hljs)){var t=document.createElement("script");t.type="text/javascript",t.src="//cdn.bootcss.com/highlight.js/9.2.0/highlight.min.js",document.body.appendChild(t)}}e.createMenu(function(i){
// ------ 增加 content 内容 ------
function a(e){
// textarea 区域
var n=t("<div></div>");n.css({margin:"15px 5px 5px 5px",height:"160px","text-align":"center"}),m.css({width:"100%",height:"100%",padding:"10px"}),m.on("keydown",function(e){
// 取消 tab 键默认行为
9===e.keyCode&&e.preventDefault()}),n.append(m),e.append(n);
// 按钮区域
var i=t("<div></div>"),a=t('<button class="right">'+d.submit+"</button>"),o=t('<button class="right gray">'+d.cancel+"</button>");i.append(a).append(o).append(p),e.append(i),
// 取消按钮
o.click(function(e){e.preventDefault(),u.dropPanel.hide()});
// 确定按钮
var r='<pre style="max-width:100%;overflow-x:auto;"><code{#langClass}>{#content}</code></pre>';a.click(function(e){function n(){var e;l&&(e=g.attr("class"),e!==l+" hljs"&&g.attr("class",l+" hljs")),g.html(a)}function i(){c.restoreSelectionByElem(v),f()}e.preventDefault();var a=m.val();if(!a)
// 无内容
return void m.focus();var o=c.getRangeElem();t.trim(t(o).text())&&0!==r.indexOf("<p><br></p>")&&(r="<p><br></p>"+r);var l=p?p.val():"",d="",f=function(){s.find("pre code").each(function(e,n){var i=t(n);i.attr("codemark")||window.hljs&&(
// 新代码块，格式化之后，立即标记 codemark
window.hljs.highlightBlock(n),i.attr("codemark","1"))})};
// ---- menu 未选中状态 ----
if(
// 语言高亮样式
l&&(d=' class="'+l+' hljs"'),
// 替换标签
a=a.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;"),!u.selected){
// 拼接html
var h=r.replace("{#langClass}",d).replace("{#content}",a);return void c.command(e,"insertHtml",h,f)}
// ---- menu 选中状态 ----
var g,v=c.getSelfOrParentByName(o,"pre");v&&(
// 确定找到 pre 之后，再找 code
v=c.getSelfOrParentByName(o,"code")),v&&(g=t(v),c.customCommand(e,n,i))})}
// ------ 点击时，禁用其他标签 ------
function o(){var e=c.getRangeElem(),t=c.getSelfOrParentByName(e,"code");t?
// 在 code 之内，禁用其他菜单
c.disableMenusExcept("insertcode"):
// 不是在 code 之内，启用其他菜单
c.enableMenusExcept("insertcode")}var r="insertcode";if(i(r)){
// 加载 highlightjs 代码
setTimeout(n,0);var c=this,l=c.config,d=l.lang,s=c.txt.$txt,u=new e.Menu({editor:c,id:r,title:d.insertcode});
// click 事件
u.clickEvent=function(e){var n=this,i=n.dropPanel;
// 隐藏
if(i.isShowing)return void i.hide();
// 显示
m.val(""),i.show();
// highlightjs 语言列表
var a=window.hljs;if(a&&a.listLanguages){if(0!==p.children().length)return;p.css({"margin-top":"9px","margin-left":"5px"}),t.each(a.listLanguages(),function(e,t){"xml"===t&&(t="html"),t===l.codeDefaultLang?p.append('<option value="'+t+'" selected="selected">'+t+"</option>"):p.append('<option value="'+t+'">'+t+"</option>")})}else p.hide()},
// 选中状态下的 click 事件
u.clickEventSelected=function(e){var n=this,i=n.dropPanel;
// 隐藏
if(i.isShowing)return void i.hide();
// 显示
i.show();var a,o,r=c.getRangeElem(),l=c.getSelfOrParentByName(r,"pre");l&&(
// 确定找到 pre 之后，再找 code
l=c.getSelfOrParentByName(r,"code")),l&&(a=t(l),
// 赋值内容
m.val(a.text()),p&&(
// 赋值语言
o=a.attr("class"),o&&p.val(o.split(" ")[0])))},
// 定义更新选中状态的事件
u.updateSelectedEvent=function(){var e,t=this,n=t.editor;return e=n.getRangeElem(),e=n.getSelfOrParentByName(e,"pre"),!!e};
// 创建 panel
var f=t("<div></div>"),m=t("<textarea></textarea>"),p=t("<select></select>");a(f),u.dropPanel=new e.DropPanel(c,u,{$content:f,width:500}),
// 增加到editor对象中
c.menus[r]=u,
// ------ enter 时，不另起标签，只换行 ------
s.on("keydown",function(e){if(13===e.keyCode){var t=c.getRangeElem(),n=c.getSelfOrParentByName(t,"code");n&&c.command(e,"insertHtml","\n")}}),s.on("keydown click",function(e){
// 此处必须使用 setTimeout 异步处理，否则不对
setTimeout(o)})}})}),t(function(e,t){e.createMenu(function(t){var n="undo";if(t(n)){var i=this,a=i.config.lang,o=new e.Menu({editor:i,id:n,title:a.undo});
// click 事件
o.clickEvent=function(e){i.undo()},
// 增加到editor对象中
i.menus[n]=o,
// ------------ 初始化时、enter 时、打字中断时，做记录 ------------
// ------------ ctrl + z 是调用记录撤销，而不是使用浏览器默认的撤销 ------------
i.ready(function(){
// 执行undo记录
function e(){n.undoRecord()}var t,n=this,i=n.txt.$txt;i.on("keydown",function(i){var a=i.keyCode;
// 撤销 ctrl + z
// 撤销 ctrl + z
// enter 做记录
// keyup 之后 1s 之内不操作，则做一次记录
return i.ctrlKey&&90===a?void n.undo():void(13===a?e():(t&&clearTimeout(t),t=setTimeout(e,1e3)))}),
// 初始化做记录
n.undoRecord()})}})}),t(function(e,t){e.createMenu(function(t){var n="redo";if(t(n)){var i=this,a=i.config.lang,o=new e.Menu({editor:i,id:n,title:a.redo});
// click 事件
o.clickEvent=function(e){i.redo()},
// 增加到editor对象中
i.menus[n]=o}})}),t(function(e,t){
// 记录全屏时的scrollTop
var n;e.createMenu(function(t){var i="fullscreen";if(t(i)){var a,o,r=this,c=r.txt.$txt,l=r.config,d=l.zindex||1e4,s=l.lang,u=!1,f=new e.Menu({editor:r,id:i,title:s.fullscreen});
// 定义click事件
f.clickEvent=function(t){
// 增加样式
var i=r.$editorContainer;i.addClass("wangEditor-fullscreen"),
// （先保存当前的）再设置z-index
a=i.css("z-index"),i.css("z-index",d);var l,s=c.height(),f=c.outerHeight();r.useMaxHeight&&(
// 记录 max-height，并暂时去掉maxheight
o=c.css("max-height"),c.css("max-height","none"),
// 如果使用了maxHeight， 将$txt从它的父元素中移出来
l=c.parent(),l.after(c),l.remove(),c.css("overflow-y","auto"));
// 设置高度到全屏
var m=r.menuContainer;c.height(e.$window.height()-m.height()-(f-s)),
// 取消menuContainer的内联样式（menu吸顶时，会为 menuContainer 设置一些内联样式）
r.menuContainer.$menuContainer.attr("style",""),
// 保存状态
u=!0,
// 记录编辑器是否全屏
r.isFullScreen=!0,
// 记录设置全屏时的高度
n=e.$window.scrollTop()},
// 定义选中状态的 click 事件
f.clickEventSelected=function(t){
// 取消样式
var i=r.$editorContainer;i.removeClass("wangEditor-fullscreen"),i.css("z-index",a),
// 还原height
r.useMaxHeight?c.css("max-height",o):
// editor.valueContainerHeight 在 editor.txt.initHeight() 中事先保存了
r.$valueContainer.css("height",r.valueContainerHeight),
// 重新计算高度
r.txt.initHeight(),
// 保存状态
u=!1,
// 记录编辑器是否全屏
r.isFullScreen=!1,
// 还原scrollTop
null!=n&&e.$window.scrollTop(n)},
// 定义选中事件
f.updateSelectedEvent=function(e){return u},
// 增加到editor对象中
r.menus[i]=f}})}),t(function(e,t){e.fn.renderMenus=function(){var e,n=this,i=n.menus,a=n.config.menus,o=(n.menuContainer,0);t.each(a,function(t,n){return"|"===n?void o++:(e=i[n],void(e&&e.render(o)))})}}),t(function(e,t){e.fn.renderMenuContainer=function(){var e=this,t=e.menuContainer;e.$editorContainer;t.render()}}),t(function(e,t){e.fn.renderTxt=function(){var e=this,t=e.txt;t.render(),
// ready 时候，计算txt的高度
e.ready(function(){t.initHeight()})}}),t(function(e,t){e.fn.renderEditorContainer=function(){var e,t,n=this,i=n.$valueContainer,a=n.$editorContainer,o=n.txt.$txt;
// 将编辑器渲染到页面中
i===o?(e=n.$prev,t=n.$parent,e&&e.length?
// 有前置节点，就插入到前置节点的后面
e.after(a):
// 没有前置节点，就直接插入到父元素
t.prepend(a)):(i.after(a),i.hide())}}),t(function(e,t){
// 绑定每个菜单的click事件
e.fn.eventMenus=function(){var e=this.menus;
// 绑定菜单的点击事件
t.each(e,function(e,t){t.bindEvent()})}}),t(function(e,t){e.fn.eventMenuContainer=function(){}}),t(function(e,t){e.fn.eventTxt=function(){var e=this.txt;
// txt内容变化时，保存选区
e.saveSelectionEvent(),
// txt内容变化时，随时更新 value
e.updateValueEvent(),
// txt内容变化时，随时更新 menu style
e.updateMenuStyleEvent()}}),t(function(e,t){e.plugin(function(){var t=this,n=t.config.uploadImgFns;// editor.config.uploadImgFns = {} 在config文件中定义了
// -------- 定义load函数 --------
n.onload||(n.onload=function(t,n){e.log("上传结束，返回结果为 "+t);var i,a=this,o=a.uploadImgOriginalName||"";0===t.indexOf("error|")?(
// 提示错误
e.warn("上传失败："+t.split("|")[1]),alert(t.split("|")[1])):(e.log("上传成功，即将插入编辑区域，结果为："+t),
// 将结果插入编辑器
i=document.createElement("img"),i.onload=function(){var n='<img src="'+t+'" alt="'+o+'" style="max-width:100%;"/>';a.command(null,"insertHtml",n),e.log("已插入图片，地址 "+t),i=null},i.onerror=function(){e.error("使用返回的结果获取图片，发生错误。请确认以下结果是否正确："+t),i=null},i.src=t)}),
// -------- 定义tiemout函数 --------
n.ontimeout||(n.ontimeout=function(t){e.error("上传图片超时"),alert("上传图片超时")}),
// -------- 定义error函数 --------
n.onerror||(n.onerror=function(t){e.error("上传上图片发生错误"),alert("上传上图片发生错误")})})}),t(function(e,t){window.FileReader&&window.FormData&&e.plugin(function(){
// -------- 将以base64的图片url数据转换为Blob --------
function n(e,t){
//去掉url的头，并转换为byte
var n,i=window.atob(e.split(",")[1]),a=new ArrayBuffer(i.length),o=new Uint8Array(a);for(n=0;n<i.length;n++)o[n]=i.charCodeAt(n);return new Blob([a],{type:t})}
// -------- 插入图片的方法 --------
function i(t,n){var i=document.createElement("img");i.onload=function(){var a='<img src="'+t+'" style="max-width:100%;"/>';o.command(n,"insertHtml",a),e.log("已插入图片，地址 "+t),i=null},i.onerror=function(){e.error("使用返回的结果获取图片，发生错误。请确认以下结果是否正确："+t),i=null},i.src=t}
// -------- onprogress 事件 --------
function a(e){if(e.lengthComputable){var t=e.loaded/e.total;o.showUploadProgress(100*t)}}var o=this,r=o.config,c=r.uploadImgUrl,l=r.uploadTimeout,d=r.uploadImgFns,s=d.onload,u=d.ontimeout,f=d.onerror;c&&(
// -------- xhr 上传图片 --------
o.xhrUploadImg=function(r){
// 超时处理
function d(){k&&clearTimeout(k),$&&$.abort&&$.abort(),
// 超时了就阻止默认行为
m.preventDefault(),
// 执行回调函数，提示什么内容，都应该在回调函数中定义
y&&y.call(o,$),
// 隐藏进度条
o.hideUploadProgress()}
// opt 数据
var m=r.event,p=r.filename||"",h=r.base64,g=r.fileType||"image/png",v=r.name||"wangEditor_upload_file",w=r.loadfn||s,x=r.errorfn||f,y=r.timeoutfn||u,b=o.config.uploadParams||{},E=o.config.uploadHeaders||{},C="png";
// ------------ begin 预览模拟上传 ------------
if(// 默认为 png
p.indexOf(".")>0?
// 原来的文件名有扩展名
C=p.slice(p.lastIndexOf(".")-p.length+1):g.indexOf("/")>0&&g.split("/")[1]&&(
// 文件名没有扩展名，通过类型获取，如从 'image/png' 取 'png'
C=g.split("/")[1]),e.isOnWebsite)return e.log("预览模拟上传"),void i(h,m);
// ------------ end 预览模拟上传 ------------
// 变量声明
var k,$=new XMLHttpRequest,S=new FormData;$.onload=function(){k&&clearTimeout(k),
// 记录文件名到 editor.uploadImgOriginalName ，插入图片时，可做 alt 属性用
o.uploadImgOriginalName=p,p.indexOf(".")>0&&(o.uploadImgOriginalName=p.split(".")[0]),
// 执行load函数，任何操作，都应该在load函数中定义
w&&w.call(o,$.responseText,$),
// 隐藏进度条
o.hideUploadProgress()},$.onerror=function(){k&&clearTimeout(k),
// 超时了就阻止默认行为
m.preventDefault(),
// 执行error函数，错误提示，应该在error函数中定义
x&&x.call(o,$),
// 隐藏进度条
o.hideUploadProgress()},
// xhr.onprogress = updateProgress;
$.upload.onprogress=a,
// 填充数据
S.append(v,n(h,g),e.random()+"."+C),
// 添加参数
t.each(b,function(e,t){S.append(e,t)}),
// 开始上传
$.open("POST",c,!0),
// xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  // 将参数解析成传统form的方式上传
// 修改自定义配置的headers
t.each(E,function(e,t){$.setRequestHeader(e,t)}),
// 跨域上传时，传cookie
$.withCredentials=!0,
// 发送数据
$.send(S),k=setTimeout(d,l),e.log("开始上传...并开始超时计算")})})}),t(function(e,t){e.plugin(function(){function e(){d||(d=!0,l.css({top:o+"px"}),r.append(l))}function n(){l.hide(),s=null}var i=this,a=i.menuContainer,o=a.height(),r=i.$editorContainer,c=r.width(),l=t('<div class="wangEditor-upload-progress"></div>'),d=!1;
// ------ 显示进度 ------
i.showUploadProgress=function(t){s&&clearTimeout(s),
// 显示之前，先判断是否渲染
e(),l.show(),l.width(t*c/100)};
// ------ 隐藏进度条 ------
var s;i.hideUploadProgress=function(e){s&&clearTimeout(s),e=e||750,s=setTimeout(n,e)}})}),t(function(e,t){e.plugin(function(){var n,i=this,a=i.config,o=a.uploadImgUrl,r=a.uploadTimeout;if(o){
// 获取editor的上传dom
var c=i.$uploadContent;if(c){
// 自定义UI，并添加到上传dom节点上
var l=t('<div class="upload-icon-container"><i class="wangeditor-menu-img-upload"></i></div>');c.append(l);
// ---------- 构建上传对象 ----------
var d=new e.UploadFile({editor:i,uploadUrl:o,timeout:r,fileAccept:"image/jpg,image/jpeg,image/png,image/gif,image/bmp"});
// 选择本地文件，上传
l.click(function(e){n=e,d.selectFiles()})}}})}),t(function(e,t){if(window.FileReader&&window.FormData){
// 构造函数
var n=function(e){this.editor=e.editor,this.uploadUrl=e.uploadUrl,this.timeout=e.timeout,this.fileAccept=e.fileAccept,this.multiple=!0};n.fn=n.prototype,
// clear
n.fn.clear=function(){this.$input.val(""),e.log("input value 已清空")},
// 渲染
n.fn.render=function(){var n=this;if(!n._hasRender){e.log("渲染dom");var i=n.fileAccept,a=i?'accept="'+i+'"':"",o=n.multiple,r=o?'multiple="multiple"':"",c=t('<input type="file" '+a+" "+r+"/>"),l=t('<div style="visibility:hidden;"></div>');l.append(c),e.$body.append(l),
// onchange 事件
c.on("change",function(e){n.selected(e,c.get(0))}),
// 记录对象数据
n.$input=c,
// 记录
n._hasRender=!0}},
// 选择
n.fn.selectFiles=function(){var t=this;e.log("使用 html5 方式上传"),
// 先渲染
t.render(),
// 选择
e.log("选择文件"),t.$input.click()},
// 选中文件之后
n.fn.selected=function(n,i){var a=this,o=i.files||[];0!==o.length&&(e.log("选中 "+o.length+" 个文件"),
// 遍历选中的文件，预览、上传
t.each(o,function(e,t){a.upload(t)}))},
// 上传单个文件
n.fn.upload=function(t){
// 清空 input 数据
function n(){i.clear()}var i=this,a=i.editor,o=t.name||"",r=t.type||"",c=a.config.uploadImgFns,l=a.config.uploadImgFileName||"wangEditorH5File",d=c.onload,s=c.ontimeout,u=c.onerror,f=new FileReader;
// onload事件
// 开始取文件
return d&&s&&u?(e.log("开始执行 "+o+" 文件的上传"),f.onload=function(t){e.log("已读取"+o+"文件");var i=t.target.result||this.result;a.xhrUploadImg({event:t,filename:o,base64:i,fileType:r,name:l,loadfn:function(e,t){n();
// 执行配置中的方法
var i=this;d.call(i,e,t)},errorfn:function(t){n(),e.isOnWebsite&&alert("wangEditor官网暂时没有服务端，因此报错。实际项目中不会发生");
// 执行配置中的方法
var i=this;u.call(i,t)},timeoutfn:function(t){n(),e.isOnWebsite&&alert("wangEditor官网暂时没有服务端，因此超时。实际项目中不会发生");
// 执行配置中的方法
var i=this;s(i,t)}})},void f.readAsDataURL(t)):void e.error("请为编辑器配置上传图片的 onload ontimeout onerror 回调事件")},
// 暴露给 E
e.UploadFile=n}}),t(function(e,t){if(!window.FileReader||!window.FormData){
// 构造函数
var n=function(e){this.editor=e.editor,this.uploadUrl=e.uploadUrl,this.timeout=e.timeout,this.fileAccept=e.fileAccept,this.multiple=!1};n.fn=n.prototype,
// clear
n.fn.clear=function(){this.$input.val(""),e.log("input value 已清空")},
// 隐藏modal
n.fn.hideModal=function(){this.modal.hide()},
// 渲染
n.fn.render=function(){var n=this,i=n.editor,a=i.config.uploadImgFileName||"wangEditorFormFile";if(!n._hasRender){
// 服务器端路径
var o=n.uploadUrl;e.log("渲染dom");
// 创建 form 和 iframe
var r="iframe"+e.random(),c=t('<iframe name="'+r+'" id="'+r+'" frameborder="0" width="0" height="0"></iframe>'),l=n.multiple,d=l?'multiple="multiple"':"",s=t("<p>选择图片并上传</p>"),u=t('<input type="file" '+d+' name="'+a+'"/>'),f=t('<input type="submit" value="上传"/>'),m=t('<form enctype="multipart/form-data" method="post" action="'+o+'" target="'+r+'"></form>'),p=t('<div style="margin:10px 20px;"></div>');m.append(s).append(u).append(f),
// 增加用户配置的参数，如 token
t.each(i.config.uploadParams,function(e,n){m.append(t('<input type="hidden" name="'+e+'" value="'+n+'"/>'))}),p.append(m),p.append(c),n.$input=u,n.$iframe=c;
// 生成 modal
var h=new e.Modal(i,void 0,{$content:p});n.modal=h,
// 记录
n._hasRender=!0}},
// 绑定 iframe load 事件
n.fn.bindLoadEvent=function(){
// 定义load事件
function e(){var e=t.trim(r.document.body.innerHTML);if(e){
// 获取文件名
var a=n.$input.val(),o=a;a.lastIndexOf("\\")>=0&&(
// 获取 abc.png 格式
o=a.slice(a.lastIndexOf("\\")+1),o.indexOf(".")>0&&(
// 获取 abc （即不带扩展名的文件名）
o=o.split(".")[0])),
// 将文件名暂存到 editor.uploadImgOriginalName ，插入图片时，可作为 alt 属性来用
i.uploadImgOriginalName=o,
// 执行load函数，插入图片的操作，应该在load函数中执行
c.call(i,e),
// 清空 input 数据
n.clear(),
// 隐藏modal
n.hideModal()}}var n=this;if(!n._hasBindLoad){var i=n.editor,a=n.$iframe,o=a.get(0),r=o.contentWindow,c=i.config.uploadImgFns.onload;
// 绑定 load 事件
o.attachEvent?o.attachEvent("onload",e):o.onload=e,
// 记录
n._hasBindLoad=!0}},n.fn.show=function(){function e(){n.show(),t.bindLoadEvent()}var t=this,n=t.modal;setTimeout(e)},
// 选择
n.fn.selectFiles=function(){var t=this;e.log("使用 form 方式上传"),
// 先渲染
t.render(),
// 先清空
t.clear(),
// 显示
t.show()},
// 暴露给 E
e.UploadFile=n}}),t(function(e,t){e.plugin(function(){
// -------- 非 chrome 下，通过查找粘贴的图片的方式上传 --------
function n(){var n=/^data:(image\/\w+);base64/,r=c.find("img");e.log("粘贴后，检查到编辑器有"+r.length+"个图片。开始遍历图片，试图找到刚刚粘贴过来的图片"),t.each(r,function(){var r,c,l=this,d=t(l),u=d.attr("src");
// 判断当前图片是否是粘贴之前的
a.each(function(){if(l===this)
// 当前图片是粘贴之前的
return r=!0,!1}),
// 当前图片是粘贴之前的，则忽略
r||(e.log("找到一个粘贴过来的图片"),n.test(u)?(
// 得到的粘贴的图片是 base64 格式，符合要求
e.log("src 是 base64 格式，可以上传"),c=u.match(n)[1],o.xhrUploadImg({event:i,base64:u,fileType:c,name:s})):e.log("src 为 "+u+" ，不是 base64 格式，暂时不支持上传"),
// 最终移除原图片
d.remove())}),e.log("遍历结束")}var i,a,o=this,r=o.txt,c=r.$txt,l=o.config,d=l.uploadImgUrl,s=l.uploadImgFileName||"wangEditorPasteFile";
// 未配置上传图片url，则忽略
d&&
// 开始监控粘贴事件
c.on("paste",function(r){i=r;var l,d,u=i.clipboardData||i.originalEvent.clipboardData;
// -------- 试图获取剪切板中的文字，有文字的情况下，就不处理图片粘贴 --------
l=null==u?window.clipboardData&&window.clipboardData.getData("text"):u.getData("text/plain")||u.getData("text/html"),l||(d=u&&u.items,d?(
// -------- chrome 可以用 data.items 取出图片 -----
e.log("通过 data.items 得到了数据"),t.each(d,function(t,n){var a=n.type||"";if(!(a.indexOf("image")<0)){var r=n.getAsFile(),c=new FileReader;e.log("得到一个粘贴图片"),c.onload=function(t){e.log("读取到粘贴的图片");
// 执行上传
var n=t.target.result||this.result;o.xhrUploadImg({event:i,base64:n,fileType:a,name:s})},
//读取粘贴的文件
c.readAsDataURL(r)}})):(
// -------- 非 chrome 不能用 data.items 取图片 -----
e.log("未从 data.items 得到数据，使用检测粘贴图片的方式"),
// 获取
a=c.find("img"),e.log("粘贴前，检查到编辑器有"+a.length+"个图片"),
// 异步上传找到的图片
setTimeout(n,0)))})})}),t(function(e,t){e.plugin(function(){var n=this,i=n.txt,a=i.$txt,o=n.config,r=o.uploadImgUrl,c=o.uploadImgFileName||"wangEditorDragFile";
// 未配置上传图片url，则忽略
r&&(
// 阻止浏览器默认行为
e.$document.on("dragleave drop dragenter dragover",function(e){e.preventDefault()}),
// 监控 $txt drop 事件
a.on("drop",function(i){i.preventDefault();var a=i.originalEvent,o=a.dataTransfer&&a.dataTransfer.files;o&&o.length&&t.each(o,function(t,a){var o=a.type,r=a.name;if(!(o.indexOf("image/")<0)){e.log("得到图片 "+r);var l=new FileReader;l.onload=function(t){e.log("读取到图片 "+r);
// 执行上传
var a=t.target.result||this.result;n.xhrUploadImg({event:i,base64:a,fileType:o,name:c})},
//读取粘贴的文件
l.readAsDataURL(a)}})}))})}),t(function(e,t){e.plugin(function(){
// 渲染到页面
function n(){f||(
// 绑定事件
i(),
// 拼接 渲染到页面上
m.append(p).append(h).append(g).append(v),c.$editorContainer.append(m),f=!0)}
// 绑定事件
function i(){function e(e,n){
// 执行命令之前，先存储html内容
s=d.html();
// 监控内容变化
var i=function(){n&&n(),s!==d.html()&&d.change()};
// 执行命令
t&&c.customCommand(e,t,i)}
// 统一执行命令的方法
var t;
// 删除
h.click(function(n){t=function(){r.remove()},e(n,function(){setTimeout(o,100)})}),
// 放大
v.click(function(n){t=function(){r.css({width:"100%"})},e(n,function(){setTimeout(a)})}),
// 缩小
g.click(function(n){t=function(){r.css({width:"auto"})},e(n,function(){setTimeout(a)})})}
// 显示 toolbar
function a(){if(!c._disabled&&null!=r){r.addClass("clicked");var e=r.position(),t=e.top,n=e.left,i=r.outerHeight(),a=r.outerWidth(),o=t+i,l=n,d=0,s=u.position().top,f=u.outerHeight();o>s+f&&(
// top 不得超出编辑范围
o=s+f),
// 显示（方便计算 margin）
m.show();
// 计算 margin
var h=m.outerWidth();d=a/2-h/2,
// 定位
m.css({top:o+5,left:l,"margin-left":d}),
// 如果定位太靠左了
d<0?(
// 得到三角形的margin-left
m.css("margin-left","0"),p.hide()):p.show()}}
// 隐藏 toolbar
function o(){null!=r&&(r.removeClass("clicked"),r=null,m.hide())}var r,c=this,l=c.txt,d=l.$txt,s="",u=c.useMaxHeight?d.parent():d,f=!1,m=t('<div class="txt-toolbar"></div>'),p=t('<div class="tip-triangle"></div>'),h=t('<a href="#"><i class="wangeditor-menu-img-trash-o"></i></a>'),g=t('<a href="#"><i class="wangeditor-menu-img-search-minus"></i></a>'),v=t('<a href="#"><i class="wangeditor-menu-img-search-plus"></i></a>');
// click table 事件
u.on("click","table",function(e){var i=t(e.currentTarget);
// 渲染
// 显示 toolbar
// 阻止冒泡
return n(),r&&r.get(0)===i.get(0)?void setTimeout(o,100):(r=i,a(),e.preventDefault(),void e.stopPropagation())}).on("click keydown scroll",function(e){setTimeout(o,100)}),e.$body.on("click keydown scroll",function(e){setTimeout(o,100)})})}),t(function(e,t){e.userAgent.indexOf("MSIE 8")>0||e.plugin(function(){
// 获取 / 设置 链接
function n(e,n){if(d){var i,a,o=function(){
// 及时保存currentLink
null!=n&&(g=n),p!==m.html()&&m.change()},r=!1,c=d.parent();if("a"===c.get(0).nodeName.toLowerCase()?(
// 父元素就是图片链接
a=c,r=!0):
// 父元素不是图片链接，则重新创建一个链接
a=t('<a target="_blank"></a>'),null==n)
// url 无值，是获取链接
return a.attr("href")||"";if(""===n)
// url 是空字符串，是取消链接
r&&(i=function(){d.unwrap()});else{
// url 有值，是设置链接
if(n===g)return;i=function(){a.attr("href",n),r||
// 当前图片未包含在链接中，则包含进来
d.wrap(a)}}
// 执行命令
i&&(
// 记录下执行命令之前的html内容
p=m.html(),
// 执行命令
s.customCommand(e,i,o))}}
// 渲染到页面
function i(){v||(
// 绑定事件
a(),o(),
// 菜单放入 container
b.append(E).append(C).append(k).append($).append(S).append(M).append(T).append(N),
// 链接input放入container
R.append(D).append(O).append(P),
// 拼接 渲染到页面上
x.append(y).append(b).append(R),s.$editorContainer.append(x).append(w),v=!0)}
// 绑定toolbar事件
function a(){function e(e,t){var n;
// 记录下执行命令之前的html内容
p=m.html(),n=function(){t&&t(),p!==m.html()&&m.change()},
// 执行命令
i&&s.customCommand(e,i,n)}
// 统一执行命令的方法
var i;
// 删除
E.click(function(t){
// 删除之前先unlink
n(t,""),
// 删除图片
i=function(){d.remove()},e(t,function(){setTimeout(c,100)})}),
// 放大
k.click(function(t){i=function(){var e=d.get(0),t=e.width,n=e.height;t*=1.1,n*=1.1,d.css({width:t+"px",height:n+"px"})},e(t,function(){setTimeout(r)})}),
// 缩小
C.click(function(t){i=function(){var e=d.get(0),t=e.width,n=e.height;t*=.9,n*=.9,d.css({width:t+"px",height:n+"px"})},e(t,function(){setTimeout(r)})}),
// // 左浮动
// $floatLeft.click(function (e) {
//     commandFn = function () {
//         $currentImg.css({
//             float: 'left'
//         });
//     };
//     customCommand(e, function () {
//         setTimeout(hide, 100);
//     });
// });
// alignLeft
$.click(function(t){i=function(){
// 如果 img 增加了链接，那么 img.parent() 就是 a 标签，设置 align 没用的，因此必须找到 P 父节点来设置 align
d.parents("p").css({"text-align":"left"}).attr("align","left")},e(t,function(){setTimeout(c,100)})}),
// // 右浮动
// $floatRight.click(function (e) {
//     commandFn = function () {
//         $currentImg.css({
//             float: 'right'
//         });
//     };
//     customCommand(e, function () {
//         setTimeout(hide, 100);
//     });
// });
// alignRight
M.click(function(t){i=function(){
// 如果 img 增加了链接，那么 img.parent() 就是 a 标签，设置 align 没用的，因此必须找到 P 父节点来设置 align
d.parents("p").css({"text-align":"right"}).attr("align","right")},e(t,function(){setTimeout(c,100)})}),
// // 无浮动
// $noFloat.click(function (e) {
//     commandFn = function () {
//         $currentImg.css({
//             float: 'none'
//         });
//     };
//     customCommand(e, function () {
//         setTimeout(hide, 100);
//     });
// });
// alignCenter
S.click(function(t){i=function(){
// 如果 img 增加了链接，那么 img.parent() 就是 a 标签，设置 align 没用的，因此必须找到 P 父节点来设置 align
d.parents("p").css({"text-align":"center"}).attr("align","center")},e(t,function(){setTimeout(c,100)})}),
// link
// 显示链接input
T.click(function(e){e.preventDefault(),
// 获取当前链接，并显示
g=n(e),D.val(g),b.hide(),R.show()}),
// 设置链接
P.click(function(e){e.preventDefault();var i=t.trim(D.val());i&&
// 设置链接，同时会自动更新 currentLink 的值
n(e,i),
// 隐藏 toolbar
setTimeout(c)}),
// 取消设置链接
O.click(function(e){e.preventDefault(),
// 重置链接 input
D.val(g),b.show(),R.hide()}),
// unlink
N.click(function(e){e.preventDefault(),
// 执行 unlink
n(e,""),
// 隐藏 toolbar
setTimeout(c)})}
// 绑定drag事件
function o(){function t(e){var t,c;
// 计算差额
t=e.pageX-n,c=e.pageY-i;
// --------- 计算拖拽点的位置 ---------
var s=a+t,u=o+c;w.css({"margin-left":s,"margin-top":u});
// --------- 计算图片的大小 ---------
var f=r+t,m=l+c;d&&d.css({width:f,height:m})}var n,i,a,o,r,l;w.on("mousedown",function(s){d&&(
// 当前鼠标位置
n=s.pageX,i=s.pageY,
// 当前拖拽点的位置
a=parseFloat(w.css("margin-left"),10),o=parseFloat(w.css("margin-top"),10),
// 当前图片的大小
r=d.width(),l=d.height(),
// 隐藏 $toolbar
x.hide(),
// 绑定计算事件
e.$document.on("mousemove._dragResizeImg",t),e.$document.on("mouseup._dragResizeImg",function(t){
// 取消绑定
e.$document.off("mousemove._dragResizeImg"),e.$document.off("mouseup._dragResizeImg"),
// 隐藏，并还原拖拽点的位置
c(),w.css({"margin-left":a,"margin-top":o}),
// 记录
I=!1}),
// 记录
I=!0)})}
// 显示 toolbar
function r(){if(!s._disabled&&null!=d){d.addClass("clicked");var e=d.position(),t=e.top,n=e.left,i=d.outerHeight(),a=d.outerWidth();
// --- 定位 dragpoint ---
w.css({top:t+i,left:n+a});
// --- 定位 toolbar ---
// 计算初步结果
var o=t+i,r=n,c=0,l=h.position().top,u=h.outerHeight();o>l+u?
// top 不得超出编辑范围
o=l+u:
// top 超出编辑范围，dragPoint就不显示了
w.show(),
// 显示（方便计算 margin）
x.show();
// 计算 margin
var f=x.outerWidth();c=a/2-f/2,
// 定位
x.css({top:o+5,left:r,"margin-left":c}),
// 如果定位太靠左了
c<0?(
// 得到三角形的margin-left
x.css("margin-left","0"),y.hide()):y.show(),
// disable 菜单
s.disableMenusExcept()}}
// 隐藏 toolbar
function c(){null!=d&&(d.removeClass("clicked"),d=null,x.hide(),w.hide(),
// enable 菜单
s.enableMenusExcept())}
// 判断img是否是一个表情
function l(e){var n=!1;return s.emotionUrls?(t.each(s.emotionUrls,function(t,i){var a=!1;if(e===i&&(n=!0,a=!0),a)return!1}),n):n}var d,s=this,u=s.config.lang,f=s.txt,m=f.$txt,p="",h=s.useMaxHeight?m.parent():m,g=(s.$editorContainer,""),v=!1,w=t('<div class="img-drag-point"></div>'),x=t('<div class="txt-toolbar"></div>'),y=t('<div class="tip-triangle"></div>'),b=t("<div></div>"),E=t('<a href="#"><i class="wangeditor-menu-img-trash-o"></i></a>'),C=t('<a href="#"><i class="wangeditor-menu-img-search-minus"></i></a>'),k=t('<a href="#"><i class="wangeditor-menu-img-search-plus"></i></a>'),$=t('<a href="#"><i class="wangeditor-menu-img-align-left"></i></a>'),S=t('<a href="#"><i class="wangeditor-menu-img-align-center"></i></a>'),M=t('<a href="#"><i class="wangeditor-menu-img-align-right"></i></a>'),T=t('<a href="#"><i class="wangeditor-menu-img-link"></i></a>'),N=t('<a href="#"><i class="wangeditor-menu-img-unlink"></i></a>'),R=t('<div style="display:none;"></div>'),D=t('<input type="text" style="height:26px; margin-left:10px; width:200px;"/>'),P=t('<button class="right">'+u.submit+"</button>"),O=t('<button class="right gray">'+u.cancel+"</button>"),I=!1;
// click img 事件
h.on("mousedown","img",function(e){e.preventDefault()}).on("click","img",function(e){var n=t(e.currentTarget),a=n.attr("src");if(a&&!l(a)){if(
// ---------- 不是表情图标 ---------- 
// 渲染
i(),d&&d.get(0)===n.get(0))return void setTimeout(c,100);
// 显示 toolbar
d=n,r(),
// 默认显示menuContainer，其他默认隐藏
b.show(),R.hide(),
// 阻止冒泡
e.preventDefault(),e.stopPropagation()}}).on("click keydown scroll",function(e){I||setTimeout(c,100)})})}),t(function(e,t){e.plugin(function(){
// 渲染 dom
function e(){r||(m.append(p).append(h),s.$editorContainer.append(m),r=!0)}
// 定位
function n(){if(o){var e=o.position(),t=e.left,n=e.top,i=o.height(),a=n+i+5,r=s.menuContainer.height(),c=s.txt.$txt.outerHeight();a>r+c&&(a=r+c+5),
// 最终设置
m.css({top:a,left:t})}}
// 显示 toolbar
function i(){if(!g&&o){e(),m.show();
// 设置链接
var t=o.attr("href");h.attr("href",t),
// 定位
n(),g=!0}}
// 隐藏 toolbar
function a(){g&&o&&(m.hide(),g=!1)}var o,r,c,l,d,s=this,u=s.config.lang,f=s.txt.$txt,m=t('<div class="txt-toolbar"></div>'),p=t('<div class="tip-triangle"></div>'),h=t('<a href="#" target="_blank"><i class="wangeditor-menu-img-link"></i> '+u.openLink+"</a>"),g=!1;
// $txt 绑定事件
f.on("mouseenter","a",function(e){
// 延时 500ms 显示toolbar
c&&clearTimeout(c),c=setTimeout(function(){var n=e.currentTarget,r=t(n);o=r;var c=r.children("img");c.length&&(
// 该链接下包含一个图片
// 图片点击时，隐藏toolbar
c.click(function(e){a()}),c.hasClass("clicked"))||
// 显示toolbar
i()},500)}).on("mouseleave","a",function(e){
// 延时 500ms 隐藏toolbar
l&&clearTimeout(l),l=setTimeout(a,500)}).on("click keydown scroll",function(e){setTimeout(a,100)}),
// $toolbar 绑定事件
m.on("mouseenter",function(e){
// 先中断掉 $txt.mouseleave 导致的隐藏
l&&clearTimeout(l)}).on("mouseleave",function(e){
// 延时 500ms 显示toolbar
d&&clearTimeout(d),d=setTimeout(a,500)})})}),t(function(e,t){e.plugin(function(){var t=this,n=t.config.menuFixed;if(n!==!1&&"number"==typeof n){var i=parseFloat(e.$body.css("margin-top"),10);isNaN(i)&&(i=0);var a=t.$editorContainer,o=a.offset().top,r=a.outerHeight(),c=t.menuContainer.$menuContainer,l=c.css("position"),d=c.css("top"),s=c.offset().top,u=c.outerHeight();t.txt.$txt;e.$window.scroll(function(){
//全屏模式不支持
if(!t.isFullScreen){var f=e.$window.scrollTop(),m=c.width();
// 如果 menuTop === 0 说明此前编辑器一直隐藏，后来显示出来了，要重新计算相关数据
0===s&&(s=c.offset().top,o=a.offset().top,r=a.outerHeight(),u=c.outerHeight()),f>=s&&f+n+u+30<o+r?(
// 吸顶
c.css({position:"fixed",top:n}),
// 固定宽度
c.width(m),
// 增加body margin-top
e.$body.css({"margin-top":i+u}),
// 记录
t._isMenufixed||(t._isMenufixed=!0)):(
// 取消吸顶
c.css({position:l,top:d}),
// 取消宽度固定
c.css("width","100%"),
// 还原 body margin-top
e.$body.css({"margin-top":i}),
// 撤销记录
t._isMenufixed&&(t._isMenufixed=!1))}})}})}),t(function(e,t){
// 用 createMenu 方法创建菜单
e.createMenu(function(n){
// 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
var i="indent";
// check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
if(n(i)){
// this 指向 editor 对象自身
var a=this,o=new e.Menu({editor:a,// 编辑器对象
id:i,// 菜单id
title:"缩进",// 菜单标题
// 正常状态和选中装下的dom对象，样式需要自定义
$domNormal:t('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-indent-left"></i></a>'),$domSelected:t('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-indent-left"></i></a>')});
// 菜单正常状态下，点击将触发该事件
o.clickEvent=function(e){
// 使用自定义命令
function n(){i.css("text-indent","2em")}var i,o=a.getRangeElem(),r=a.getSelfOrParentByName(o,"p");return r?(i=t(r),void a.customCommand(e,n)):e.preventDefault()},
// 菜单选中状态下，点击将触发该事件
o.clickEventSelected=function(e){
// 使用自定义命令
function n(){i.css("text-indent","0")}var i,o=a.getRangeElem(),r=a.getSelfOrParentByName(o,"p");return r?(i=t(r),void a.customCommand(e,n)):e.preventDefault()},
// 根据当前选区，自定义更新菜单的选中状态或者正常状态
o.updateSelectedEvent=function(){
// 获取当前选区所在的父元素
var e,n,i=a.getRangeElem(),o=a.getSelfOrParentByName(i,"p");return!!o&&(e=t(o),n=e.css("text-indent"),!(!n||"0px"===n))},
// 增加到editor对象中
a.menus[i]=o}})}),t(function(e,t){
// 用 createMenu 方法创建菜单
e.createMenu(function(n){
// 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
var i="lineheight";
// check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
if(n(i)){
// this 指向 editor 对象自身
var a=this;
// 由于浏览器自身不支持 lineHeight 命令，因此要做一个hook
a.commandHooks.lineHeight=function(e){var n=a.getRangeElem(),i=a.getSelfOrParentByName(n,"p,h1,h2,h3,h4,h5,pre");i&&t(i).css("line-height",e+"")};
// 创建 menu 对象
var o=new e.Menu({editor:a,// 编辑器对象
id:i,// 菜单id
title:"行高",// 菜单标题
commandName:"lineHeight",// 命令名称
// 正常状态和选中装下的dom对象，样式需要自定义
$domNormal:t('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-arrows-v"></i></a>'),$domSelected:t('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-arrows-v"></i></a>')}),r={
// 格式： 'value' : 'title'
"1.0":"1.0倍",1.5:"1.5倍",1.8:"1.8倍","2.0":"2.0倍",2.5:"2.5倍","3.0":"3.0倍"},c='<span style="line-height:{#commandValue}">{#title}</span>';o.dropList=new e.DropList(a,o,{data:r,// 传入数据源
tpl:c}),
// 增加到editor对象中
a.menus[i]=o}})}),t(function(e,t){e.plugin(function(){var n=this,i=n.config.customUpload;if(i){if(n.config.uploadImgUrl)return alert("自定义上传无效，详看浏览器日志console.log"),void e.error("已经配置了 uploadImgUrl ，就不能再配置 customUpload ，两者冲突。将导致自定义上传无效。");var a=n.$uploadContent;a||e.error("自定义上传，无法获取 editor.$uploadContent");
// UI
var o=t('<div class="upload-icon-container"><i class="wangeditor-menu-img-upload"></i></div>');a.append(o);
// 设置id，并暴露
var r="upload"+e.random(),c="upload"+e.random();o.attr("id",r),a.attr("id",c),n.customUploadBtnId=r,n.customUploadContainerId=c}})}),t(function(e,t){e.info("本页面富文本编辑器由 wangEditor 提供 http://wangeditor.github.io/ ")}),window.wangEditor});