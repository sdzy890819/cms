define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"部门管理系统",link:"department.list"}];
        });
        $scope.menu = [{name:"部门管理系统",link:"department.list"}]; //栏目
    }];
});