define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"频道管理列表",link:"column.list"}];
        });
        $scope.menu = [{name:"频道管理列表",link:"column.list"}]; //栏目
    }];
});