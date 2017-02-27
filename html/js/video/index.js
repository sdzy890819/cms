define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"视频管理系统",link:"video.list"}];
        });
        $scope.menu = [{name:"视频管理系统",link:"video.list"}]; //栏目
    }];
});