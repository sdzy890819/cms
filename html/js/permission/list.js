define(['require', "app", 'jquery', '../data/getData', './form', , 'formlist', 'fixedNav', 'position', '../moduls/service', '../moduls/factory'], function(require, app, $, data, list) {
    app.directive('permissionList', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '../template/common/list.html',
            controller: function($scope, pop, $uibModal, $css, GenerateArrList, $state) {
                $scope.title = "权限列表";
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
                    edit: function(obj, _detail) { //保存
                        require(['../common/editPop'], function(pop) {
                            function getAddForm(callback) {
                                var _data = {
                                    data: obj
                                };
                                callback(_data);
                            }
                            pop.init({
                                obj: obj,
                                list: list,
                                $uibModal: $uibModal,
                                updateData: getAddForm,
                                save: function(obj, _detail) {
                                    var type, showFlag, platform;
                                    if (obj.type == 'BUTTON') {
                                        type = 2;
                                    } else {
                                        type = 1;
                                    }
                                    if (obj.showFlag == 'YES') {
                                        showFlag = 1;
                                    } else {
                                        showFlag = 0;
                                    }
                                    if (obj.platform == 'CMS') {
                                        platform = 1;
                                    } else if (obj.platform == 'APP') {
                                        platform = 2;
                                    }
                                    data.permission.updatePermission({
                                        id: _detail.id,
                                        name: obj.name,
                                        description: obj.description,
                                        type: type,
                                        url: obj.url,
                                        sort: obj.sort,
                                        parentId: obj.parentId,
                                        showFlag: showFlag,
                                        platform: platform,
                                        permission: obj.permission,
                                        callback: function(_data) {
                                            layui.use(['layer'], function() {
                                                var layer = layui.layer;
                                                layer.msg(_data.message);
                                                if (_data.code == 0) {
                                                    $state.reload();
                                                }
                                            });
                                        }
                                    });
                                },
                                close: function() {
                                    $uibModal.dismiss('cancel');
                                },
                                callback: function(list, callback) {
                                    callback(list);
                                }
                            });
                        });
                    },
                    addChildPermission: function(obj, _detail) {
                        require(['../common/editPop'], function(pop) {
                            function getAddForm(callback) {
                                var _data = {
                                    data: {
                                        parentId: obj.id
                                    }
                                }
                                callback(_data);
                            }
                            pop.init({
                                obj: obj,
                                list: list,
                                $uibModal: $uibModal,
                                updateData: getAddForm,
                                save: function(obj, _detail) {
                                    var type, showFlag, platform;
                                    if (obj.type == 'BUTTON') {
                                        type = 2;
                                    } else {
                                        type = 1;
                                    }
                                    if (obj.showFlag == 'YES') {
                                        showFlag = 1;
                                    } else {
                                        showFlag = 0;
                                    }
                                    if (obj.platform == 'CMS') {
                                        platform = 1;
                                    } else if (obj.platform == 'APP') {
                                        platform = 2;
                                    }
                                    data.permission.createPermission({
                                        name: obj.name,
                                        description: obj.description,
                                        type: type,
                                        url: obj.url,
                                        sort: obj.sort,
                                        parentId: obj.parentId,
                                        showFlag: showFlag,
                                        platform: platform,
                                        permission: obj.permission,
                                        callback: function(_data) {
                                            layui.use(['layer'], function() {
                                                var layer = layui.layer;
                                                layer.msg(_data.message);
                                                console.log(_data);
                                                if (_data.code == 0) {
                                                    $state.reload();
                                                }
                                            });
                                        }
                                    });
                                },
                                close: function() {
                                    $uibModal.dismiss('cancel');
                                },
                                callback: function(list, callback) {
                                    callback(list);
                                }
                            });
                        });
                    },
                    del: function(obj) {
                        pop.alert({
                            text: '您确定要删除' + obj.name + '吗',
                            btn: ['确定', '取消'],
                            fn: function() {
                                var _data = data.permission.delPermission(obj)
                            }
                        })
                        obj.callback = function(_data) {
                            layui.use(['layer'], function() {
                                var layer = layui.layer;
                                layer.msg(_data.message);
                                $state.reload();
                            });
                        }
                    },
                    filter: [] //过滤不需要展示的															
                });

                function getDataList() {
                    data.permission.listPermission({
                        callback: function(_data) {
                            var th = [{
                                name: 'ID',
                                key: 'id',
                                width: '200'
                            }, {
                                name: '权限名',
                                key: 'name'
                            }, {
                                name: '父类ID',
                                key: 'parentId'
                            }, {
                                name: '权限代码',
                                key: 'permission'
                            }, {
                                name: '应用设备',
                                key: 'platformStr'
                            }, {
                                name: '类型',
                                key: 'typeStr'
                            }, {
                                name: '操作',
                                width: '200',
                                class: 'center'
                            }];
                            var newData = [];
                            $.each(_data.data, function(index, value) {
                                value.permission.parentId = '';
                                value.permission.typeStr = 'MENU';
                                newData.push(value.permission);
                                $.each(value.permissions, function(i, j) {
                                    j.typeStr = 'BUTTON';
                                    newData.push(j);
                                })
                            })
                            $scope.listdata = { //确认按钮
                                    title: $scope.title,
                                    table: {
                                        select: true,
                                        th: th,
                                        td: GenerateArrList.setArr(newData, th),
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
                            $.each($scope.listdata.table.td, function(i, item) {
                                var arr = [];
                                if (item.typeStr == 'MENU') {
                                    arr.push({
                                        cls: 'add',
                                        name: '新增子权限',
                                        evt: $scope.addChildPermission
                                    });
                                    item.cls = 'special';
                                }
                                arr.push({
                                    cls: 'edit',
                                    name: '编辑',
                                    evt: $scope.edit
                                }, {
                                    cls: 'del',
                                    name: '删除',
                                    evt: $scope.del
                                });
                                item.list.edit = arr;
                            });
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