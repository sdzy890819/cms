define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"碎片管理系统",link:"fragment.list"}];
        });
        $scope.menu = [{name:"碎片管理系统",link:"fragment.list"}]; //碎片
    }];
});