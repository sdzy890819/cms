define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"用户管理系统",link:"user.list"}];
        });
        $scope.menu = [{name:"用户管理系统",link:"user.list"}]; //栏目
    }];
});