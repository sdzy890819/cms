define(['require', "app", 'jquery', '../data/getData', './addForm', 'search', './searchForm', '../common/editPop', '../upload/index', 'formlist', 'position', 'fixedNav', '../moduls/service', '../moduls/factory'], function(require, app, $, getData, list, search, searchForm, editPop, upload) {
    app.directive('userList', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '../template/common/list.html',
            controller: function($scope, pop, $uibModal, $css, GenerateArrList, Upload) {
                $scope.title = '用户列表';
                $scope.$parent.menu.push({
                    name: $scope.title
                }); //栏目
                $.extend($scope, {
                    add: function(id) { //保存
                        pop.alert({
                            text: '你的ID为：' + id,
                            btn: ['确定', '取消'],
                            fn: function(index) { //确定
                                layer.close(index)
                            }
                        })
                    },
                    editUserChannel: function(obj) {
                        require(['./channelPop'], function(pop) {
                            pop.init({
                                obj: obj,
                                $uibModal: $uibModal
                            });
                        });
                    },
                    editUserPosition: function(obj) {
                        require(['./positionPop'], function(pop) {
                            pop.init({
                                obj: obj,
                                $uibModal: $uibModal
                            });
                        });
                    },
                    edit: function(obj) {
                        var imageInfo = null;

                        function getAddForm(callback, formList) { //填充数据
                            getData.user.detail({
                                userId: obj.userId,
                                callback: function(_data) {
                                    _data.pwd = '';
                                    _data.userName = obj.userName;
                                    if (formList) { //发果有1条以上的字段则显示
                                    } else {
                                        callback(_data);
                                    }
                                }
                            })
                        }
                        editPop.init({
                            obj: obj,
                            list: list,
                            updateData: getAddForm,
                            save: function(obj, _detail) { //保存 新增 确认 等
                                getData.user.updateUser2({
                                    //id:_detail.id,
                                    userId: _detail.userId,
                                    userName: obj.userName,
                                    realName: obj.realName,
                                    pwd: obj.pwd,
                                    headImage: (imageInfo ? imageInfo.imageUrl : _detail.headImage),
                                    idfa: obj.idfa,
                                    callback: function(_data) {
                                        layui.use(['layer'], function() {
                                            var layer = layui.layer;
                                            layer.msg(_data.message);
                                            getDataList();
                                            /*setTimeout(function(){
                                            	$state.reload();
                                            },300);*/
                                        });
                                    }
                                });
                            },
                            callback: function(list, callback) { //返回获取的数据 用于操作  	
                                callback(list);
                                $.each(list, function(i, obj) {
                                    if (obj.type == 'password') {
                                        obj.verify = null;
                                    }
                                })

                                function go() {
                                    var checkbox = $('.layui-form-checkbox').parent().parent();
                                    if (checkbox.length) {
                                        checkbox.remove();
                                    } else {
                                        setTimeout(go, 1000 / 60);
                                    }
                                }
                                go();
                                setTimeout(function() {
                                    $('.layui-upload-button').unbind().click(function() {
                                        upload.init({
                                            data: {
                                                obj: {},
                                                title: '上传图片',
                                                name: '请选择图片',
                                                type: 'image',
                                                event: function(file, $uibModalInstance) {
                                                    $scope.imageInfo = file;

                                                    function alert(content) {
                                                        layui.use(['layer'], function() {
                                                            var layer = layui.layer;
                                                            layer.msg(content, {
                                                                icon: 5
                                                            });
                                                        })
                                                    }
                                                    var suffix = $scope.imageInfo.name.match(/\w+$/)[0];
                                                    Upload.base64DataUrl($scope.imageInfo).then(function(urls) {
                                                        var image = "<img src='" + file.$ngfDataUrl + "'width='100px' class='thumb'>";
                                                        // $('.layui-upload-button').empty().append(image);												
                                                        $('.imagePre').empty().append(image);
                                                        if (urls) {
                                                            getData.upload.uploadImage({
                                                                "baseCode": urls.split(',')[1],
                                                                "suffix": suffix, //"文件后缀png|jpg"
                                                                "width": 100,
                                                                callback: function(_data) {
                                                                    imageInfo = _data.data;
                                                                    alert(_data.message)
                                                                }
                                                            })
                                                        } else if (!urls) {
                                                            alert('请上传图片')
                                                        } else if (isSize == 'yes' && selectSize == 'yes' && !width) {
                                                            alert('请输入高度')
                                                        } else if (isSize == 'yes' && selectSize == 'no' && !height) {
                                                            alert('请输入高度')
                                                        }
                                                    });
                                                    $uibModalInstance.dismiss('cancel');
                                                }
                                            },
                                            $uibModal: $uibModal
                                        });
                                    });
                                }, 300)
                            },
                            $uibModal: $uibModal
                        });
                    },
                    del: function(obj) { //删除
                        pop.alert({
                            text: '你确定删除：' + obj.realName,
                            btn: ['确定', '取消'],
                            fn: function(index) { //确定
                                getData.user.delUser(obj);
                            }
                        })
                        obj.callback = function(_data) {
                            layui.use(['layer'], function() {
                                var layer = layui.layer;
                                layer.msg(_data.message);
                                if (_data.code == 0) {
                                    $('table').find("tr[data-id=" + obj.id + "]").hide();
                                }
                            });
                        }
                    },
                    filter: [ //过滤不需要展示的
                        'id', 'userId', 'lastModifyUserId'
                    ],
                    changeTypeName: [{
                        name: 'headImage',
                        newName: 'image'
                    }]
                });

                function setList(_data) {
                    var th = [{
                        name: '头像',
                        key: 'headImage',
                        width: '50'
                    }, {
                        name: '真实名称',
                        key: 'realName'
                    }, {
                        name: '用户名',
                        key: 'userName'
                    }, {
                        name: 'IDFA(MAC)',
                        key: 'idfa'
                    }, {
                        name: '用户ID',
                        key: 'userId'
                    }, {
                        name: '创建人',
                        key: 'createUserName',
                        width: 60
                    }, {
                        name: '创建时间',
                        key: 'createTimeStr',
                        width: 80
                    }, {
                        name: '修改人',
                        key: 'lastModifyUserName',
                        width: 60
                    }, {
                        name: '修改时间',
                        key: 'updateTimeStr',
                        width: 80
                    }, {
                        name: '操作',
                        width: '100',
                        class: 'center'
                    }];
                    $.each(_data.data.list, function(i, a) {
                        if (!a.idfa) {
                            a.idfa = '';
                        }
                    });
                    $scope.listdata = { //确认按钮
                        title: $scope.title,
                        table: {
                            select: true,
                            th: th,
                            td: GenerateArrList.setArr(_data.data.list, th),
                            edit: [{
                                cls: 'edit',
                                name: '所属频道',
                                evt: $scope.editUserChannel
                            }, {
                                cls: 'edit',
                                name: '用户组',
                                evt: $scope.editUserPosition
                            }, {
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
                    GenerateArrList.changeTypeName($scope.listdata.table.td, [{
                        name: 'headImage',
                        newName: 'image'
                    }]);
                    $.each($scope.listdata.table.td, function(i, obj) {
                        obj.list[0].image = obj.headImage;
                        obj.list[0].name = false;
                    })
                    GenerateArrList.extendChild($scope.listdata.table.td, $scope.listdata.table.edit, 'edit');
                    $scope.$apply();
                }
                var page = 1;

                function getDataList() {
                    getData.user.userlist({
                        page: page,
                        pageSize: 20,
                        callback: function(_data) {
                            //分页
                            $scope.page = _data.data.page;
                            $scope.page.jump = function(obj) {
                                if (page != obj.curr) {
                                    page = obj.curr;
                                    getDataList();
                                }
                            }
                            setList(_data);
                        }
                    })
                }
                getDataList();
                //搜索
                function search() {
                    var searchPage = 1;
                    searchForm(function(data) {
                        $scope.searchform = {
                            list: data,
                            return: function() { //返回列表
                                $scope.searchform.search = null;
                                page = 1;
                                searchPage = 1;
                                $scope.$$childHead.current = 1;
                                getDataList();
                            },
                            submit: function(obj, data) {
                                function getSearchList() {
                                    getData.search.searchUser({
                                        "condition": obj.condition,
                                        page: searchPage,
                                        pageSize: 20,
                                        callback: function(_data) {
                                            //分页
                                            $scope.page = _data.data.page;
                                            $scope.page.jump = function(obj) {
                                                if (searchPage != obj.curr) {
                                                    searchPage = obj.curr;
                                                    getSearchList();
                                                }
                                            }
                                            $scope.searchform.search = {
                                                count: _data.data.page.count,
                                                name: obj.condition
                                            }
                                            if (_data.data.list == undefined) {
                                                _data.data.list = [];
                                            }
                                            setList(_data);
                                        }
                                    })
                                };
                                getSearchList();
                            }
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
                }
                search();
                //end 搜索					
            },
            link: function($scope, element) {}
        };
    });
});