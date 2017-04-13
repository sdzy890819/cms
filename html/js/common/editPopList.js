define(["app",'jquery','form'],function (app,$) {
    return {
        init : function( obj ){
            var $uibModal = obj.$uibModal,
                getList = obj.list;

            obj.$uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '../template/common/formlist.html',
                size: obj.size || 'lg',
                controller: function($scope,$uibModalInstance,$css) {
                    $scope.data = null;             
                    angular.extend($scope,{
                        titelement : {
                            close : true
                        },
                        save : function( arr ){ //保存
                            obj.save(arr,$scope.data)
                                $uibModalInstance.dismiss('cancel');
                        },
                        submit : function(evt,obj,$event){
                            evt(obj,$event);
                        },
                        cancel : function( arr ){ //取消
                            obj.cancel(arr,$scope.data)
                        },
                        close : function () {
                            $uibModalInstance.dismiss('cancel');
                        }
                    });
                    getList(function( data , list){
                        $scope.data = list;
                        $scope.title_close = true;
                        $scope.$apply();
                    })
                }
            });
        },
    }
});