require.config({
    baseUrl: 'js/',
    paths: {
        'zepto': 'plug/zepto.min',
        'vue' : 'vue.min',
        'vue-router' : 'vue-router.min',
        'wangEditor' : 'plug/wangEditor/dist/js/wangEditor',
    },
    shim: {
        'zepto': {exports: '$'},
    },
    deps:['main'],
    urlArgs: "bust=" +  (new Date()).getTime()
});