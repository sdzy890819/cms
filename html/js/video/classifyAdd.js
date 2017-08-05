define(["app",'./classfyForm','../upload/index','../data/getData','form','position','fixedNav'], function ( app , list , upload , getData ) {
    app.directive('videoClassifyAdd',function(){
        return {
            restrict : 'E',
            replace : true,
            transclude : true,
            templateUrl : '../template/common/addAndEdit.html',
            controller : function($scope,Upload,$uibModal, $state){
                $scope.title = '新增视频分类';
                $scope.$parent.menu.push({name:$scope.title});
                angular.extend($scope,{
                    save : function( obj ){ //保存
                        getData.video.createVideoClassify({
                            classifyName : obj.classifyName,
                            callback : function(_data){
                                layui.use(['layer'], function(){
                                    var layer = layui.layer;
                                    layer.msg(_data.message);

                                    if (_data.code == 0) {
                                        $state.go('video.classifyList');
                                    }
                                }); 
                            }
                        })
                    }
                });
                $scope.formdata = { //确认按钮
                    title : $scope.title,
                    list : list,
                    submit : [
                        {
                            name : '保存',
                            evt : 'save',
                            icon_cls : 'save'
                        },
                        {
                            name:'取消',
                            evt : 'cancel',
                            icon_cls : 'cancel',
                            cls : 'cancel'
                        }
                    ]
                }
            }
        };
    });
});