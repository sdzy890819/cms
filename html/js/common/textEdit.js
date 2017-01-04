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
		    
		                // 创建编辑器
		                $scope.editor = new wangEditor(element);

		                $scope.editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
							if (item === 'insertcode') {
								return null;
							}
							if (item === 'fullscreen') {
								return null;
							}
							if(item =='location') return null;
							return item;
				      	});
		                $scope.editor.create();
		                $scope.editor.$txt.html('<p>请输入内容</p>');
		            }
			    };
			});
		}
	}
});