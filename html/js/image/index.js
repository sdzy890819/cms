define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"图片管理系统",link:"image.list"}];
        });                
        $scope.menu = [{name:"图片管理系统",link:"image.list"}];
    }];
});