define(['require', "app", 'jquery', '../data/getData', './addForm', , 'formlist', 'fixedNav', 'position', '../moduls/service', '../moduls/factory'], function(require, app, $, data, list) {
    app.directive('userchannelList', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '../template/common/list.html',
            controller: function($scope, pop, $uibModal, $css, GenerateArrList) {
                $scope.title = "频道列表";
                $scope.$parent.menu.push({
                    name: $scope.title
                }); //栏目
                angular.extend($scope, {
                    add: function(id) { //保存
                        pop.alert({
                            text: '你的ID为：' + id,
                            btn: ['确定', '取消'],
                            fn: function(index) { //确定
                                layer.close(index)
                            }
                        })
                    },
                    edit: function(obj) { //保存
                        require(['../common/editPop'], function(pop) {
                            pop.init({
                                obj: obj,
                                list: list,
                                $uibModal: $uibModal
                            });
                        });
                    },
                    del: function(id) { //删除
                        pop.alert({
                            text: '你的ID为：' + id,
                            btn: ['确定', '取消'],
                            fn: function(index) { //确定
                                layer.close(index)
                            }
                        })
                    },
                    filter: [ //过滤不需要展示的
                        'id', 'categoryId'
                    ]
                });

                function getDataList() {
                    data.channel.listChannel({
                        callback: function(_data) {
                            var th = [{
                                name: '频道名称',
                                key: 'channelName',
                                width: '200'
                            }, {
                                name: '频道域名',
                                key: 'channelUrl'
                            }, {
                                name: '频道绝对路径',
                                key: 'channelPath'
                            }, {
                                name: '模版位置',
                                key: 'templatePath'
                            }, {
                                name: '频道说明',
                                key: 'channelDesc'
                            }, {
                                name: '操作',
                                width: '120',
                                class: 'center'
                            }];
                            $scope.listdata = { //确认按钮
                                    title: $scope.title,
                                    table: {
                                        select: true,
                                        th: th,
                                        td: GenerateArrList.setArr(_data.data, th),
                                        edit: [{
                                            cls: 'edit',
                                            name: '编辑',
                                            evt: $scope.edit
                                        }, {
                                            cls: 'del',
                                            name: '删除',
                                            evt: $scope.del
                                        }]
                                    }
                                }
                                // GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
                            GenerateArrList.extendChild($scope.listdata.table.td, $scope.listdata.table.edit, 'edit');
                            $scope.$apply();
                        }
                    });
                };
                getDataList();
            },
            link: function($scope, element) {}
        };
    });
});