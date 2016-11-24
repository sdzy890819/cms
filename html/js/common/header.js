define(function (require, exports, module) {
	exports.init = function( obj ){
		var $ = jQuery,
			create = require('./createElement'),
			config = {
				app : obj.app , 
				name : 'headerNav' , 
				templateUrl : '../template/common/header.html',
				link : function($scope , element ){
					var ele = $(element[0])
						,list = ele.find('.dropdown-menu')
						,timer = 0;
					ele.find('.myInfo').mouseenter(function(){
						list.show();
						setTimeout(function(){
							list.addClass('cur')
						},20);
						clearTimeout(timer)
					})
					.mouseleave(function(){
						list.removeClass('cur');
						timer = setTimeout(function(){
							list.hide();
						},520);
					})
				}
			}
		$.extend(config,obj);
		create.init( config );
	}
});