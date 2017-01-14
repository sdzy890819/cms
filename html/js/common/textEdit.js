define(["app",'jquery','require','wangEditor'], function ( app,$,require ) {
	return {
		init : function( $scope ){
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
		    			/*[ //所有的
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
					        'img',
					        'video',
					        'location',
					        'insertcode',
					        '|',
					        'undo',
					        'redo',
					        'fullscreen'
					    ];*/
		                // 创建编辑器
		                var editor = new wangEditor(element);
		                $scope.editor = editor;

		                editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
							if (item === 'insertcode') {
								return null;
							}
							if (item === 'fullscreen') { //全屏
								return null;
							}
							if(item =='location') return null; //百度地图
							return item;
				      	});

				      	//上传图片
				      	editor.config.uploadImgUrl = '/upload';
				      	// 配置自定义参数（举例）
					    editor.config.uploadParams = {
					        token: 'abcdefg',
					        user: 'wangfupeng1988'
					    };
					    // 设置 headers（举例）
					    editor.config.uploadHeaders = {
					        'Accept' : 'text/x-json'
					    };
					    //editor.config.hideLinkImg = true;


		                editor.create();
		                editor.$txt.html('<p>请输入内容</p>');
		            }
			    };
			});
		}
	}
});