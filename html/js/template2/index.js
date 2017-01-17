define(['head','menu'], function ( ) {
    return ['$scope','$location', function($scope , $location) {
        $scope.$on('$viewContentLoaded',function(){
            $scope.menu = [{name:"模版管理系统",link:"template.list"}];
        });
        $scope.menu = [{name:"模版管理系统",link:"template.list"}]; //栏目
    }];
});