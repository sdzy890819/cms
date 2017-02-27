define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"新闻管理",link:"newscolumn.list"}];
        });
        $scope.menu = [{name:"新闻管理",link:"newscolumn.list"}]; //栏目
    }];
});