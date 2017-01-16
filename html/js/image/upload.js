define(["app",'form','position','fixedNav'], function ( app ) {
	app.directive('imageUpload',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	      templateUrl: '../js/plug/upload/uploadImage.html',
				controller: function($scope) {
					$scope.title = "图片上传";
					$scope.$parent.menu.push({name:$scope.title}); //栏目					
					window.uploadevent = function(status, picUrl,callbackdata){						
						
						status += '';
						alert('上传状态'+status)
						switch(status){
							case '1':
							var time = new Date().getTime();
							break;
							break;
							case '-1':
							window.location.reload();
							break;
							default:
							window.location.reload();
						} 
					};

					var swfu;  
					window.onload = function () {  
						var settings_object = {//定义参数配置对象  
							upload_url : "/webapi/upload/uploadImage",  														
							post_params : {  
							"post_param_name_1" : "post_param_value_1",  
							"post_param_name_2" : "post_param_value_2",  
							"post_param_name_n" : "post_param_value_n"  
							},  
							use_query_string : false,  
							requeue_on_error : false,  
							http_success : [201, 202],  
							assume_success_timeout : 0,  
							file_types : "*.jpg;*.gif",  
							file_types_description: "Web Image Files",  
							file_size_limit : "1024",  
							file_upload_limit : 10,  
							file_queue_limit : 2,  
							debug : false,  
							prevent_swf_caching : false,  
							preserve_relative_urls : false,  
							button_placeholder_id : "element_id",  
							button_image_url : "http://www.swfupload.org/button_sprite.png",  
							button_width : 61,  
							button_height : 22,  
							button_text : "<b>Click</b> <span class="redText">here</span>",  
							button_text_style : ".redText { color: #FF0000; }",  
							button_text_left_padding : 3,  
							button_text_top_padding : 2,  
							button_action : SWFUpload.BUTTON_ACTION.SELECT_FILES,  
							button_disabled : false,  
							button_cursor : SWFUpload.CURSOR.HAND,  
							button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,  
							upload_start_handler : upload_start_function,  
							upload_progress_handler : upload_progress_function,  
							upload_error_handler : upload_error_function,  
							upload_success_handler : upload_success_function,  
							upload_complete_handler : upload_complete_function,  
							
						};  
						alert('load');
						swfu = new SWFUpload(settings_object);
					};

					function upload_start_function(){}
					function upload_progress_function(){}
					function upload_error_function(){}
					function upload_success_function(){}
					function upload_complete_function(){}
				}
	    };
	});
});