define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"用户组管理系统",link:"userposition.list"}];
        });
        $scope.menu = [{name:"用户组管理系统",link:"userposition.list"}];
    }];
});