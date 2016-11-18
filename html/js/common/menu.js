define(function (require, exports, module) {
	exports.init = function( obj ){
		require('../plug/jquery-1.9.1.min');
		var $ = jQuery;
			create = require('./createElement'),
			config = {
				app : obj.app , 
				name : 'menuNav' , 
				templateUrl : '../template/menu.html',
				link : function(scope,element){
		        	var $ = jQuery,
		        		submenu = $(element[0]).find('.option li>a') ;

		        	element = $(element[0]);
		        	
		        	function getHeight(){
		        		var height = document.body.scrollHeight-$('#Header').height();
	        			if(element.height()<height){
	        				element.height(height)
	        			}else{
	        				element.height(element.height())
	        			}
		        	}
		        	window.onresize = getHeight;
		        	setTimeout(getHeight,500);
		        	getHeight();
		        	function clearMenu(){
		        		submenu.parent().removeClass('open')
		        			.find('.arrow').removeClass('cur');
		        	}
		        	submenu.each(function( i , ele ){
		        		$(ele).click(function(){
		        			clearMenu();
		        			if(this.parentclas){
		        				this.parentclas = false;
		        				$(this).parent().removeClass('open')
				        			.find('.arrow').removeClass('cur');
		        			}else{
		        				this.parentclas=true;
				        		$(this).parent().addClass('open')
				        			.find('.arrow').addClass('cur');
		        			}


			        	});
		        	});

		        	var tabNav = element.find('.webapp-tab li') , 
		        		option = element.find('.option');
		        	tabNav.each(function( i , ele ){
		        		$(ele).click(function(){
		        			tabNav.removeClass('current')
		        				.eq(i).addClass('current')
		        			option.hide();
		        			option.eq(i).show();
		        		})
		        	})
		        }
			}
		$.extend(config,obj);
		create.init( config );
	}
});