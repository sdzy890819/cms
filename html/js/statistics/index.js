define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"百度统计",link:"statistics.list"}];
        });
        $scope.menu = [{name:"百度统计",link:"statistics.list"}];
    }];
});