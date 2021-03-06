define(["app", 'require', '../data/getData', 'head', 'menu', '../plug/highcharts'], function(app, require, getData) {
    app.directive('statisticsList', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '../template/home/index.html',
            controller: function($scope, $uibModal, $css) {
                getData.index.index({
                    callback: function(_data) {
                        var data = _data.data;
                        $scope.sumIp = data.sumIp;
                        $scope.sumPv = data.sumPv;
                        $scope.sumUv = data.sumUv;
                        $scope.newSumUv = data.newSumUv;
                        $scope.todayIp = data.todayIp;
                        $scope.todayNewUv = data.todayNewUv;
                        $scope.todayPv = data.todayPv;
                        $scope.todayUv = data.todayUv;
                        $scope.$apply();
                        $('#ip-container').highcharts({
                            title: {
                                text: 'IP访问量',
                                x: -20
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: data.key
                            },
                            yAxis: {
                                title: {
                                    text: ''
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                valueSuffix: ''
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            },
                            series: [{
                                name: '',
                                data: data.ipArray
                            }]
                        });
                        $('#pv-container').highcharts({
                            title: {
                                text: 'PV访问量',
                                x: -20
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: data.key
                            },
                            yAxis: {
                                title: {
                                    text: ''
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                valueSuffix: ''
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            },
                            series: [{
                                name: '',
                                data: data.pvArray
                            }]
                        });
                        $('#nuv-container').highcharts({
                            title: {
                                text: 'NUV访问量',
                                x: -20
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: data.key
                            },
                            yAxis: {
                                title: {
                                    text: ''
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                valueSuffix: ''
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            },
                            series: [{
                                name: '',
                                data: data.nuvArray
                            }]
                        });
                        $('#uv-container').highcharts({
                            title: {
                                text: 'UV访问量',
                                x: -20
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: data.key
                            },
                            yAxis: {
                                title: {
                                    text: ''
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                valueSuffix: ''
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            },
                            series: [{
                                name: '',
                                data: data.uvArray
                            }]
                        });
                    }
                })
            }
        };
    });
    return ["$uibModal", function($uibModal) {
        /*$uibModal.open({
	      animation: true,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      template: 'myModalContent.html',
	    });*/
    }];
});