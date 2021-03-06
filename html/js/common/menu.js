define(["app",'jquery','./data/getData','./moduls/directive'], function ( app,$,getData ) {
	app.directive('menuNav',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/menu.html',
	        compile : function( tEle,tAttrs,transcludeFn ){ //获取数据
	        	return {
	        		pre : function(scope, iElement, iAttrs, controller){
	        			getData.permission.currentMenuPermission({
			        		callback : function( _data ){
			        			scope.Nav = _data.data;
			        			scope.$apply();
			        		}
			        	})
	        		},
	        		post : function(scope, element, iAttrs, controller){
	        			scope.$on('columnDone',function(){
		        			var state = scope.state,
				        		name = state.current.name,
				        		column = $(element[0]).find('.option >ul >li >a') , 
				        		submenu = $(element[0]).find('.sub-menu a');

				        	$('.sub-menu li a').click(function(){ //刷新
				        		var myhref = $(this).attr('ui-sref') , 
				        			href = window.location.href.match(/\#[\w|\/]+/);

				        		try{
				        			href = href[0].replace('#/','');
				        			href = href.replace(/\//g,'.');
				        			if(href == myhref){
				        				location.reload();
				        			}
				        		}catch(e){

				        		}
				        		
				        	});

				        	element = $(element[0]);
				        	function getHeight(){
				        		var body = $('body'),
				        			bodyHeight = document.body.scrollHeight,
				        			menuHeight = element.find('.menubar').height() + 70,
				        			height = bodyHeight-$('#Header').height();
			        			if(menuHeight<height){
			        				element.height(height)
			        			}else{
			        				element.height(menuHeight);
			        			}
				        	}
				        	window.onresize = getHeight;
				        	getHeight();
				        	setTimeout(getHeight, 1000);
				        	function clearMenu( num ){
				        		column.parent().removeClass('open')
				        			.find('.arrow').removeClass('cur');
				        		column.each(function( i ){
				        			if(i!=num){
				        				$(this).removeClass('cur').next().slideUp("fast");
				        			}
				        		});
				        	}
				        	scope.menuClick = function(  i , obj , $event ){
			        			var tag = $event.currentTarget,
			        				self = $(tag);
			        			clearMenu( i );
			        			if(tag.parentclas){
			        				tag.parentclas = false;
			        				self.parent().removeClass('open')
					        		self.find('.arrow').removeClass('cur');
					        		self.next().slideUp("fast");
			        			}else{
			        				tag.parentclas=true;
					        		self.parent().addClass('open')
					        		self.find('.arrow').addClass('cur');
					        		self.next().slideDown("fast");
			        			}
				        		setTimeout(getHeight,500);
				        	}


				        	function showMenu(){
				        		var name = state.current.name;
					        	submenu.each(function( i ){ //展开当前页
					        		var aName = $(this).attr('ui-sref'),
					        			nameAr = name.split('.'),
					        			len = nameAr.length-1,  //总长度
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
				        		setTimeout(function(){
				        			element.css({height:'auto'});
				        			getHeight();
				        			showMenu();
				        		}, 500);
				        	});

				        	//收缩菜单
				        	(function(){
				        		var menu = $('.sidebar-menu') , 
				        			right = $('#Container'),
				        			jian = $('.sidebar-menu .jian') , 
				        			open = true;

				        		jian.click(function(){
				        			open = !open;
				        			if(open){
				        				jian.removeClass('cur').html('&lt;');
				        				menu.removeClass('cur');
				        				right.removeClass('cur');
				        			}else{
				        				jian.addClass('cur').html('&gt;');
				        				menu.addClass('cur');
				        				right.addClass('cur');
				        			}
				        		})
				        	})();
	        			})
			        }
	        	}
	        },
			controller : function($scope,$state){
				$scope.state = $state;
			}
	    };
	});
});
