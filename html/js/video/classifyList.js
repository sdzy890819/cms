define(['require', "app", 'jquery', 'search','../data/getData', './classfyForm', , 'formlist', 'fixedNav', 'position', '../moduls/service', '../moduls/factory'], function(require, app, $, search, getData, list) {
    app.directive('videoClassifyList', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '../template/common/list.html',
            controller: function($scope, pop, $uibModal, $css, GenerateArrList) {
                $scope.title = "视频分类列表";
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
                            function getAddForm(callback) {
                               getData.video.videoclassify({
                                    id : obj.id,
                                    callback : function( _data ){
                                        callback(_data);
                                    }
                                });
                            }
                            pop.init({
                                obj: obj,
                                list: list,
                                $uibModal: $uibModal,
                                updateData: getAddForm,
                                callback: function(list, callback) {
                                    callback(list);
                                },
                                save : function( obj , _data ){
                                    getData.video.updateVideoClassify({
                                        classifyName:obj.classifyName,
                                        id:_data.id,
                                        callback: function(_data) {
                                            layui.use(['layer'], function(){
                                                var layer = layui.layer;
                                                layer.msg(_data.message);
                                                getDataList();
                                            }); 
                                        }
                                    })
                                }
                            });
                        });
                    },
                    del: function(obj) { //删除
                        layui.use(['layer'], function() {
                            var layer = layui.layer;
                            layer.alert('你确定删除：' + obj.classifyName, {
                                skin: 'layui-layer-molv newBtn' //样式类名
                                    ,
                                title: '删除',
                                anim: 1 //动画类型
                                    ,
                                btn: ['确定', '取消'],
                                shadeClose: true,
                                yes: function(index) {
                                    getData.image.delImagesClassify(obj);
                                    layer.close(index);
                                }
                            });
                        });
                        /*pop.alert({
                             text:'你确定删除：'+ obj.imageTitle
                            ,btn : ['普通删除','物理删除','取消']
                            ,fn : function(index){//确定
                                alert(1)
                                //getData.image.delImage(obj);
                            },fn1 : function(index){
                                alert(2)
                            }
                        })*/
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
                        'id', 'uploadUserId'
                    ]
                });

                function setList(_data) { //设置要显示的列表
                    $scope.page = _data.data.page;
                    $scope.page.jump = function(obj) {
                        if (page != obj.curr) {
                            page = obj.curr;
                            getDataList();
                        }
                    }
                    var th = [{
                        name: '分类ID',
                        key: 'id',
                        width:50
                    }, {
                        name: '视频分类名称',
                        key: 'classifyName',
                        width:180
                    }, {
                        name: '创建人名',
                        key: 'createUserName',
                        width:60
                    }, {
                        name: '创建时间',
                        key: 'createTimeStr',
                        width: '50'
                    }, {
                        name: '修改人',
                        key: 'lastModifyUserName',
                        width:60
                    }, {
                        name: '修改时间',
                        key: 'updateTimeStr',
                        width:60
                    }, 
                    {
                        name: '操作',
                        width: '100',
                        class: 'center'
                    }];
                    $scope.listdata = { //确认按钮
                            title: $scope.title,
                            table: {
                                select: true,
                                th: th,
                                td: GenerateArrList.setArr(_data.data.list, th),
                                edit: [{
                                    cls: 'edit',
                                    name: '修改',
                                    evt: $scope.edit
                                }, {
                                    cls: 'del',
                                    name: '删除',
                                    evt: $scope.del
                                }]
                            }
                        }
                    GenerateArrList.extendChild($scope.listdata.table.td, $scope.listdata.table.edit, 'edit');
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
                //显示列表
                var page = 1;

                function getDataList() {
                    getData.video.videoclassifylist({
                        page: page,
                        pageSize: 20,
                        callback: setList
                    });
                }
                getDataList();
                //end 显示列表
            },
            link: function($scope, element) {}
        };
    });
});