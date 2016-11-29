define(["app",'jquery'], function ( app,$ ) {
	app.directive('menuNav',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/menu.html',
			controller : function($scope,$state){
				$scope.state = $state;
			},
			link : function(scope,element){
	        	var state = scope.state,
	        		name = state.current.name,
	        		column = $(element[0]).find('.option >ul >li >a') , 
	        		submenu = $(element[0]).find('.sub-menu a');

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
	        	getHeight();
	        	function clearMenu( num ){
	        		column.parent().removeClass('open')
	        			.find('.arrow').removeClass('cur');
	        		column.each(function( i ){
	        			if(i!=num){
	        				$(this).removeClass('cur').next().slideUp("fast");
	        			}
	        		});
	        	}
	        	column.each(function( i , ele ){
	        		$(ele).click(function(){
	        			clearMenu( i );
	        			var self = $(this);
	        			if(this.parentclas){
	        				this.parentclas = false;
	        				$(this).parent().removeClass('open')
			        			.find('.arrow').removeClass('cur');
			        		self.next().slideUp("fast");
	        			}else{
	        				this.parentclas=true;
			        		$(this).parent().addClass('open')
			        			.find('.arrow').addClass('cur');
			        		self.next().slideDown("fast");
	        			}
		        	});
	        	});

	        	function showMenu(){
	        		var name = state.current.name;
		        	submenu.each(function( i ){ //展开当前页
		        		var aName = $(this).attr('ui-sref'),
		        			nameAr = name.split('.'),
		        			len = nameAr.length-1,
		        			parent = $(this).parent();

		        		parent.removeClass('cur');
		        		
		        		if(aName == name){
		        			$(this).parent().addClass('cur');
		        			$.each(nameAr,function( i ){
		        				parent = parent.parent();
		        				if(i==len){
		        					parent = parent.find('>a');
		        					parent.parent().addClass('open')
				        			.find('.arrow').addClass('cur');
				        			parent.next().css({display:'block'});
		        					parent[0].parentclas = false;
				        			parent.click();
		        				}
		        			})
		        		}
		        	});
	        	}
	        	showMenu();

	        	var tabNav = element.find('.webapp-tab li') , 
	        		option = element.find('.option');
	        	tabNav.each(function( i , ele ){
	        		$(ele).click(function(){
	        			tabNav.removeClass('current')
	        				.eq(i).addClass('current')
	        			option.fadeOut();
	        			option.eq(i).fadeIn();
	        		})
	        	});
	        	scope.$on('$viewContentLoaded',function(){
	        		setTimeout(showMenu, 300);
	        	});
	        }
	    };
	});
});
