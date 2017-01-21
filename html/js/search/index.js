define(['require',"app",'jquery','./moduls/Tool'
], function ( require , app , $ , Tool  ) {
	app.directive('search',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	    	scope : {
	            list : '=list',
	        },
	        templateUrl : '../template/common/search.html',
	        controller : function($scope,pop,$uibModal , $css , GenerateArrList, $state){
	        }
	        ,link : function($scope , element ){
	        	layui.use(['form', 'layedit', 'laydate'], function(){
					var form = layui.form()
				 		,layer = layui.layer
				  		,layedit = layui.layedit
				  		,laydate = layui.laydate;


				  	angular.extend($scope,{
						selectDate : function( $event ){
							layui.laydate({
								elem: $event.target, 
								istime: true, 
								format: 'YYYY-MM-DD hh:mm:ss',
								festival: true
							});
						},
						formRepeat : function(){ //全局更新
						  	form.render(); //更新全部
						  	//自定义验证规则
							form.verify({
								title: function(value){
								  if(value.length < 1){
								    return '内容至少得1个字符啊';
								  }
								}
								,http : function( value ){
									var reg = /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
									if(value.search(reg)<0){
										return '请输入正确的域名（例：http://www.xy.com）';
									};
								}
								,path : function( value ){
									//var reg = /^\/+([A-Za-z]{1}\/[\w\/]*)?\w+\/{1}[a-zA-Z]+$/;
									var reg = /^[\/|\w|\d]+\/{1}[\w|\d]{1}[\/|\w|\d]+$/;
									if(value.search(reg)<0){
										return '请输入正确的路经（例：xy/xy）';
									};
								}
								,select : function( value , ele){
									if(value.indexOf('请选择')>-1 && ele.parentNode.selectedIndex == 0){
										return value;
									}
								}
								,html : function( value ){
									var reg = /^\w+\.html/;
									if(value.search(reg)<0){
										return '请输入正确文件名（例：index.html）';
									};
								}
								//required（必填项）phone（手机号）email（邮箱）url（网址）number（数字）date（日期）identity（身份证）
							});
							form.on('submit(demo1)', function(data){
								var b = false;
								$.each(data.field,function( key , value ){
									if(value.length && value!='请选择'){
										b = true;
									}
								})
								if(!b){

									return false;
								}
								$scope.list.submit(data.field,data);
							    return false;
						  	});

						  	form.on('select',function( _obj ){ //select点击时，需单独处理，可能会存在多个select
						  		
						  	});

						},
						selectRpeatDone : function(){ //更新 select
							setTimeout(function(){
								form.render('select');
							},100)
						},
						checkboxRpeatDone : function(){ //更新 checkbox
							setTimeout(function(){
								form.render('checkbox');
							},100)
						},
						radioRpeatDone : function(){ //更新 radio
							setTimeout(function(){
								form.render('radio');
							},100)
						}
				  	})
				});
	        }
	    };
	});
});
