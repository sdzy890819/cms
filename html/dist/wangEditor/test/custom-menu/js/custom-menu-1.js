// 行高 菜单插件
!function(E,$){E.createMenu(function(check){var menuId="lineheight";if(check(menuId)){var editor=this;editor.commandHooks.lineHeight=function(value){var rangeElem=editor.getRangeElem(),targetElem=editor.getSelfOrParentByName(rangeElem,"p,h1,h2,h3,h4,h5,pre");targetElem&&$(targetElem).css("line-height",value+"")};var menu=new E.Menu({editor:editor,id:menuId,title:"行高",commandName:"lineHeight",$domNormal:$('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-arrows-v"></i></a>'),$domSelected:$('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-arrows-v"></i></a>')}),data={"1.0":"1.0倍",1.5:"1.5倍",1.8:"1.8倍","2.0":"2.0倍",2.5:"2.5倍","3.0":"3.0倍"},tpl='<span style="line-height:{#commandValue}">{#title}</span>';menu.dropList=new E.DropList(editor,menu,{data:data,tpl:tpl}),editor.menus[menuId]=menu}})}(window.wangEditor,window.jQuery);