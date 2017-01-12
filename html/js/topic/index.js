define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"专题管理系统",link:"topic.list"}];
        });
        $scope.menu = [{name:"专题管理系统",link:"topic.list"}]; //栏目
    }];
});