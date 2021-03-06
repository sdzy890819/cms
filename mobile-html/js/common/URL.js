const url = '/app';
module.exports = {
    upload: {
        uploadVideo: url + '/upload/uploadVideo',
        uploadVideo2: url + '/upload/uploadVideo2',
        uploadImage: url + '/upload/uploadImage',
    },
    images: {
        images: url + '/images/imageslist',
        createImages: url + '/images/createImages',
        delImages: url + '/images/delImages',
        detail: url + '/images/detail',
        updateImages: url + '/images/updateImages',
    },
    login: {
        login: url + '/login',
        init: url + '/login/init',
        loginOut: url + '/loginOut',
        currentUser: url + '/currentUser',
    },
    video: {
        videolist: url + '/video/videolist',
        createVideo: url + '/video/createVideo',
        detail: url + '/video/detail',
        updateVideo: url + '/video/updateVideo',
    },
    news: {
        newslist: url + '/news/newslist',
        newscolumnlist: url + '/newscolumn/newscolumnlist', //栏目列表
        delNews: url + '/news/delNews', //删除新闻
        createNews: url + '/news/createNews', //创建新闻
        newsdetail: url + '/news/newsdetail', //详细信息
        updateNews: url + '/news/updateNews', //修改新闻
        publish: url + '/news/publish', //新闻发布
        previousColumn : url + '/news/previousColumn',//获取上次发布新闻的部门 频道 栏目信息 接口
    },
    category: { //部门分类
        listCategory: url + '/category/listCategory', //获取部门分类列表
    },
    channel: { //获取频道分类列表
        currentChannelList: url + '/channel/currentChannelList',
    },
    search: {
        searchNew: url + '/search/searchNew',
        searchVideo: url + '/search/searchVideo',
        searchImages: url + '/search/searchImages',
    }
}