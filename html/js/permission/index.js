define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"权限管理",link:"permission.list"}];
        });
        $scope.menu = [{name:"权限管理",link:"permission.list"}];
    }];
});