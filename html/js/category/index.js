define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"部门管理系统",link:"category.list"}];
        });
        $scope.menu = [{name:"部门管理系统",link:"category.list"}]; //栏目
    }];
});