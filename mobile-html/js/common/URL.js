const url = '/app';
module.exports = {
	upload : {
		uploadVideo : url + '/upload/uploadVideo',
		uploadVideo2 : url + '/upload/uploadVideo2',
		uploadImage : url + '/upload/uploadImage',
		createImages : url + '/upload/createImages',
	},
	images : {
		images : url + '/images/imageslist',
	},
	login : {
		login : url+'/login',
		init : url+'/login/init',
	},
	video : {
		videolist : url+'/video/videolist',
	},
	news : {
		newslist : url+'/news/newslist',
		newscolumnlist : url+'/newscolumn/newscolumnlist', //栏目列表
		delNews : url+'/news/delNews', //删除新闻
	},
	category : {//部门分类
		listCategory : url+'/category/listCategory', //获取部门分类列表
	},
	channel : { //获取频道分类列表
		currentChannelList : url+'/channel/currentChannelList' , 
	},
}