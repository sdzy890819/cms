define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"发布日志",link:"publishinfo.list"}];
        });
        $scope.menu = [{name:"发布日志",link:"publishinfo.list"}]; //栏目
    }];
});