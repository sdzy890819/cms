define(["app",'jquery','require','../data/URL','wangEditor'], function ( app,$,require,URL ) {
	return {
		init : function( $scope , obj ){
			app.directive('contenteditable',function(){
				return {
			    	restrict : 'A',
			    	require: '?ngModel',
					link: function(scope, element, attrs, ngModel) {
		                // 初始化 编辑器内容
		                if (!ngModel) {
		                    return;
		                } // do nothing if no ng-model
		                // Specify how UI should be updated
		                ngModel.$render = function() {
		                    element.html(ngModel.$viewValue || '');
		                };
		                // Listen for change events to enable binding
		                element.on('blur keyup change', function() {
		                    //scope.$apply(readViewText);
		                });
		                // No need to initialize, AngularJS will initialize the text based on ng-model attribute
		                // Write data to the model
		                function readViewText() {
		                    var html = element.html();
		                    // When we clear the content editable the browser leaves a <br> behind
		                    // If strip-br attribute is provided then we strip this out
		                    if (attrs.stripBr && html === '<br>') {
		                        html = '';
		                    }
		                    ngModel.$setViewValue(html);
		                }
		                // 创建编辑器
		                var editor = new wangEditor(element);
		                editor.config.menus = [
					        'source',
					        '|',
					        'bold',
					        'underline',
					        'italic',
					        'strikethrough',
					        'eraser',
					        'forecolor',
					        'bgcolor',
					        '|',
					        'quote',
					        'fontfamily',
					        'fontsize',
					        'head',
					        'unorderlist',
					        'orderlist',
					        'alignleft',
					        'aligncenter',
					        'alignright',
					        '|',
					        'link',
					        'unlink',
					        'table',
					        'emotion',
					        '|',
					        'indent',
					        'img',
					        'video',
					        'location',
					        'insertcode',
					        '|',
					        'undo',
					        'redo',
					        'fullscreen',
					        'stock'
					    ];
		                editor.config.menus = $.map(editor.config.menus, function(item, key) {
							if (item === 'insertcode') {
								return null;
							}
							if (item === 'fullscreen') { //全屏
								return null;
							}
							if(item =='location') return null; //百度地图
							return item;
				      	});

		                var baseCode , suffix;
		                editor.config.uploadImgFns.prvonload = function(base64,filename){
		                	suffix = filename.match(/\w+$/)[0];
		                	baseCode = base64;
		                	 editor.config.uploadParams = {
						        suffix: suffix,
						        baseCode: baseCode.split(',')[1]
						    };
		                }
		                editor.config.uploadImgFns.onload = function (resultText, xhr) {
					        // resultText 服务器端返回的text
					        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持

					        // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
					        var originalName = editor.uploadImgOriginalName || '';  
					        var obj = $.parseJSON(resultText);
					        // 如果 resultText 是图片的url地址，可以这样插入图片：
					        editor.command(null, 'insertHtml', '<img src="' + obj.data.imageUrl + '" alt="' + originalName + '" style="max-width:100%;"/>');
					        // 如果不想要 img 的 max-width 样式，也可以这样插入：
					        // editor.command(null, 'InsertImage', resultText);
					    };
					     // 自定义timeout事件
					    editor.config.uploadImgFns.ontimeout = function (xhr) {
					        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
					        alert('上传超时');
					    };

					    // 自定义error事件
					    editor.config.uploadImgFns.onerror = function (xhr) {
					        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
					        alert('上传错误');
					    };
				      	//上传图片
				      	editor.config.uploadImgUrl = URL.upload.uploadImage;
				      	// 配置自定义参数（举例）
					   
					    // 设置 headers（举例）
					    /*editor.config.uploadHeaders = {
					        'Accept' : 'text/x-json'
					    };*/
					    //editor.config.hideLinkImg = true;
		                	
		                editor.ready(function(){
		                	obj.callback(editor);
		                })
		                editor.create();
		                $scope.editor = editor;
		                window.Editor = editor;
	                	editor.$txt.html('<p>请输入内容</p>');
		            }
			    };
			});
		}
	}
});