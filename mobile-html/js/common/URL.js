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
	}
}