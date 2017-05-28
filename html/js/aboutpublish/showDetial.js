define(["app",'jquery','form'],function (app,$) {
    return {
        init : function( obj ){
            var $uibModal = obj.$uibModal,
                getList = obj.list;

            obj.$uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '../template/template/publishinfoPop.html',
                size: 'sm',
                controller: function($scope,$uibModalInstance,$css) {      
                    angular.extend($scope,{
                        data : null,
                        title : '日志详情',
                        titelement : {
                            close : true
                        },
                        close : function () {
                            $uibModalInstance.dismiss('cancel');
                        }
                    });
                    getList(function( data ){
                        $scope.data = data.data;
                        $scope.title_close = true;
                        $scope.$apply();
                    })
                }
            });
        },
    }
});