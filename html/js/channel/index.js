define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"频道管理系统",link:"channel.list"}];
        });
        $scope.menu = [{name:"频道管理系统",link:"channel.list"}]; //栏目
    }];
});