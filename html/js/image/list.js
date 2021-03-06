define(['require', "app", 'jquery', 'search', './searchForm', '../data/getData', './addForm', , 'formlist', 'fixedNav', 'position', '../moduls/service', '../moduls/factory'], function(require, app, $, search, searchForm, getData, list) {
    app.directive('imageList', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '../template/common/list.html',
            controller: function($scope, pop, $uibModal, $css, GenerateArrList) {
                $scope.title = "图片列表";
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
                        require(['./editImagePop'], function(pop) {
                            function getAddForm(callback) {
                                /*var data = {};
                                data.imageUrl = obj.imageUrl;
                                data.title = obj.imageTitle;
                                data.imagesClassifyId = obj.imagesClassifyId;
                                if (obj.watermark == 0) {
                                    data.watermark = '否';
                                } else {
                                    data.watermark = '是';
                                }
                                data.imageWidth = obj.imageWidthPixel;
                                data.imageHeight = obj.imageHeightPixel;
                                var _data = {
                                    data: data
                                };*/
                                if (obj.watermark == 0) {
                                    obj.watermark = '否';
                                } else {
                                    obj.watermark = '是';
                                }
                                obj.imageWidth = obj.imageWidthPixel;
                                obj.imageHeight = obj.imageHeightPixel;
                                obj.title = obj.imageTitle;
                                callback({data:obj});
                            }
                            pop.init({
                                obj: obj,
                                list: list,
                                $uibModal: $uibModal,
                                updateData: getAddForm,
                                callback: function(list, callback) {
                                    callback(list);
                                }
                            });
                        });
                    },
                    del: function(obj) { //删除
                        layui.use(['layer'], function() {
                            var layer = layui.layer;
                            layer.alert('你确定删除：' + obj.imageTitle, {
                                skin: 'layui-layer-molv newBtn' //样式类名
                                    ,
                                title: '删除',
                                anim: 1 //动画类型
                                    ,
                                btn: ['普通删除', '物理删除', '取消'],
                                shadeClose: true,
                                yes: function(index) {
                                	getData.image.delImage(obj);
                                    layer.close(index);
                                },
                                btn2: function(index) {
                                	getData.image.delImage({
                                		id:obj.id ,
                                		force : 1,
                                		callback : obj.callback
                                	});
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
                        name: '图片ID',
                        key: 'id',
                        width:50
                    }, {
                        name: '图片标题',
                        key: 'imageTitle',
                        width:180
                    }, {
                        name: '图片地址',
                        key: 'imageUrl',
                        width:60
                    }, {
                        name: '预览图',
                        key: 'imageUrl',
                        width: '50'
                    }, {
                        name: '图片宽度',
                        key: 'imageWidthPixel',
                        width:60
                    }, {
                        name: '图片高度',
                        key: 'imageHeightPixel',
                        width:60
                    }, 
                    {name: '创建人', key: 'createUserName' , width:60},
                    {name: '创建时间', key: 'createTimeStr' , width:80},
                    {name: '图片类型', key: 'imagesClassifyName' , width:60},
                    {name: '关键词', key: 'keyword' , width:80},
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
                    $.each($scope.listdata.table.td, function(i, obj) {
                        obj.list[3].image = obj.imageUrl;
                        obj.list[3].name = false;
                    })
                    GenerateArrList.extendChild($scope.listdata.table.td, $scope.listdata.table.edit, 'edit');
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }

                //显示列表
                var page = 1;

                function getDataList() {
                    getData.image.imageslist({
                        page: page,
                        pageSize: 20,
                        callback: setList
                    });
                }
                getDataList();
                //end 显示列表

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
                                var imagesClassifyId = '';
                                $.each(obj.selects,function(){
                                    if(this.title == 'imagesClassifyId'){
                                        imagesClassifyId = this.id;
                                    }
                                });
                                function getSearchList() {
                                    getData.search.searchImages({
                                        "condition": obj.condition,
                                        page: searchPage,
                                        pageSize: 20,
                                        imagesClassifyId: imagesClassifyId,
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