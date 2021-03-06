define(['require', "app", 'jquery', '../data/getData', './addForm', '../moduls/Tool', '../common/editPop', '../template/relationPop', '../upload/index', 'search', './searchForm', 'formlist', 'fixedNav', 'position', '../moduls/service', '../moduls/factory'], function(require, app, $, getData, list, Tool, editPop, relationPop, upload, search, searchForm) {
    app.directive('template2List', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '../template/common/list.html',
            controller: function($scope, pop, $uibModal, $css, GenerateArrList, Upload, $state) {
                $scope.title = "第二套模版列表";
                $scope.$parent.menu.push({
                    name: $scope.title
                }); //栏目
                /*$scope.navEdit = { //导航操作按钮
                	nav : [{
                		name : '下载模版',
                		event : function(obj , scope , evt){
                			scope.getOneSelect($scope.down);
                		},
                		cls : 'down'
                	}],
                	list : [
                		{
                			name : '模版关联',
                			event : function(obj , scope , evt){
                				scope.getOneSelect($scope.relation);
                			},
                			cls : 'plus'
                		},
                		{
                			name : '删除',
                			event : function(obj , scope , evt){
                				scope.getOneSelect($scope.del);
                			},
                			cls : 'del'
                		}
                	]
                }*/
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
                        function updateData(callback) { //填充数据
                            getData.template.template2Info({
                                id: obj.id,
                                callback: function(_data) {
                                    //_data.data.releaseTime = new Date(_data.data.releaseTime).format('yyyy-MM-dd h:m:s');
                                    callback(_data);
                                }
                            })
                        }
                        editPop.init({
                            obj: obj,
                            list: list,
                            updateData: updateData,
                            save: function(obj, _detail) { //保存 新增 确认 等
                                var templateClassify, channelId;
                                $.each(obj.selects, function() {
                                    if (this.title == 'templateClassify') {
                                        templateClassify = this.type;
                                    }
                                });
                                getData.template.updateTemplate2({
                                    id: _detail.id,
                                    "templateName": obj.templateName,
                                    "filename": obj.filename,
                                    "path": obj.path,
                                    "templateClassify": templateClassify,
                                    "encoded": obj.encoded,
                                    callback: function(_data) {
                                        layui.use(['layer'], function() {
                                            var layer = layui.layer;
                                            layer.msg(_data.message);
                                            setTimeout(function() {
                                                getDataList();
                                            }, 300)
                                        });
                                    }
                                });
                            },
                            callback: function(list, callback) { //返回获取的数据 用于操作
                                callback(list);
                            },
                            $uibModal: $uibModal
                        });
                    },
                    del: function(obj) { //删除
                        obj.callback = function(_data) { //删除成功
                            layui.use(['layer'], function() {
                                var layer = layui.layer;
                                layer.msg(_data.message);
                                if (_data.code == 0) {
                                    $('table').find("tr[data-id=" + obj.id + "]").hide();
                                }
                            });
                        };
                        pop.alert({
                            text: '您确定要删除"' + obj.templateName + '"吗',
                            btn: ['确定', '取消'],
                            fn: function() {
                                getData.template.delTemplate2(obj);
                            }
                        })
                    },
                    down: function(obj) {
                        getData.template.downTemplate2({
                            id: obj.id,
                            callback: function() {}
                        })
                    },
                    upload: function(obj) {
                        upload.init({
                            obj: obj,
                            data: {
                                title: '上传文件',
                                name: '请选择文件',
                                type: 'file',
                                event: function(file, $uibModalInstance) {
                                    Upload.base64DataUrl(file).then(function(urls) {
                                        urls = urls.split(',')[1];
                                        getData.template.uploadTemplate2({
                                            baseCode: urls,
                                            id: obj.id,
                                            callback: function(_data) {
                                                layui.use(['layer'], function() {
                                                    var layer = layui.layer;
                                                    layer.msg(_data.message);
                                                });
                                                setTimeout(function() {
                                                    getDataList();
                                                    $uibModalInstance.dismiss('cancel');
                                                }, 400)
                                            }
                                        })
                                    });
                                }
                            },
                            $uibModal: $uibModal
                        });
                    },
                    relation: function(obj) { //关联
                        relationPop.init({
                            obj: obj,
                            callback: function(list, callback) { //返回获取的数据 用于操作
                                callback(list);
                            },
                            $uibModal: $uibModal
                        });
                    }
                });

                function setList(_data) {
                    $.each(_data.data.list, function(i, obj) { //时间格示化
                        obj.releaseTime = new Date(obj.releaseTime).format('yyyy-MM-dd h:m:s');
                        if (obj.publish == 1) { //需要加链接 把topicUrl值 复制到 href 生成新的 href
                            Tool.changeObjectName(_data.data.list, [{
                                name: 'topicUrl',
                                newName: 'href'
                            }])
                        }
                    });
                    var th = [{
                            name: 'id',
                            key: 'id',
                            width: '50'
                        }, {
                            name: '模版名称',
                            key: 'templateName'
                        },
                        //{name:'模版说明' , key:'templateDesc' },
                        //{name:'文件名',width:'90' , key:'filename'},
                        //{name:'发布目录',width:'100' , key:'path'},
                        {
                            name: '模版分类',
                            width: '200',
                            key: 'templateClassifyStr',
                            width: 80
                        }, {
                            name: '编码',
                            width: '80',
                            class: 'center',
                            key: 'encoded',
                            width: 60
                        },
                        //{name:'排序值', width:'90',class:'center' , key:'sortNum'},
                        {
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
                            width: 100,
                            class: 'center'
                        }
                    ];
                    $scope.listdata = { //确认按钮
                        title: $scope.title,
                        table: {
                            select: true,
                            th: th,
                            td: GenerateArrList.setArr(_data.data.list, th),
                            edit: [{
                                    cls: 'down',
                                    name: '下载',
                                    evt: $scope.down
                                }, {
                                    cls: 'upload',
                                    name: '上传',
                                    evt: $scope.upload
                                }, //'exe|dmg'
                                // {cls : 'add', name : '关联',evt:$scope.relation},
                                {
                                    cls: 'edit',
                                    name: '编辑',
                                    evt: $scope.edit
                                }, {
                                    cls: 'del',
                                    name: '删除',
                                    evt: $scope.del
                                }
                            ]
                        }
                    }
                    GenerateArrList.extendType($scope.listdata.table.td, $scope.listdata.table.th, ['width', 'name']); //把TH 中的出name属性以外的属性合传给td
                    GenerateArrList.extendChild($scope.listdata.table.td, $scope.listdata.table.edit, 'edit');
                    $.each($scope.listdata.table.td, function(i, item) {
                        // if(item.upload==1){//1是上传过。0是未上传
                        // 	var arr = [];
                        // 	$.each(item.list.edit,function( j , obj ){
                        // 		if(obj.name!='下载'){
                        // 			arr.push(obj);
                        // 		}
                        // 	});
                        // 	item.list.edit = arr;
                        // }
                        var arr = [];
                        $.each(item.list.edit, function(j, obj) {
                            if ((obj.name == '关联' && item.job == 1) || (obj.name == '下载' && item.upload == 0)) {} else {
                                arr.push(obj);
                            }
                        });
                        item.list.edit = arr;
                        // if(item.job==1){//1是定时生成。0是触发生成
                        // 	var arr = [];
                        // 	$.each(item.list.edit,function( j , obj ){
                        // 		if(obj.name!='关联'){
                        // 			arr.push(obj);
                        // 		}
                        // 	});
                        // 	item.list.edit = arr;
                        // }
                    });
                    $scope.$apply();
                }
                var page = 1

                function getDataList() {
                    getData.template.listTemplate2({
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
                    });
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
                                        getData.search.searchTemplate2({
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
                            // $scope.$apply();
                    });
                }
                search();
                //end 搜索
            },
            link: function($scope, element, attr) {}
        };
    });
});