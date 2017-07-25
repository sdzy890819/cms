define(["app","./addForm","../upload/index","../data/getData","form","position","fixedNav"],function(e,a,i,n){e.directive("userAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e,t,l,o){e.$parent.menu.push({name:"新增用户"}),angular.extend(e,{save:function(a){function i(e,a){layui.use(["layer"],function(){layui.layer.msg(e,{icon:a||5})})}function t(e,a){var i=[],t="";$.each(e.checkboxs,function(){i.push(this.id)}),i.length?($.each(i,function(e,a){t+=a+","}),t=t.substr(0,t.length-1)):t=null,a=a||{imageUrl:""},n.user.createUser({headImage:a.imageUrl,positionIds:t,userName:e.userName,realName:e.realName,idfa:e.idfa,pwd:e.pwd,callback:function(e){layui.use(["layer"],function(){layui.layer.msg(e.message),0==e.code&&o.go("user.list")})}})}if(e.imageInfo){var u=e.imageInfo.name.match(/\w+$/)[0];l.base64DataUrl(e.imageInfo).then(function(e){e?n.upload.uploadImage({baseCode:e.split(",")[1],suffix:u,width:100,callback:function(e){t(a,e.data)}}):e?"yes"!=isSize||"yes"!=selectSize||width?"yes"!=isSize||"no"!=selectSize||height||i("请输入高度"):i("请输入高度"):i("请上传图片")})}else t(a)},cancel:function(e){}}),a(function(a){e.formdata={title:"新增用户",list:a,submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"取消",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]}}),e.$on("formRepeat",function(){$(".layui-upload-button").unbind().click(function(){i.init({data:{obj:{},title:"上传图片",name:"请选择图片",type:"image",event:function(a,i){e.imageInfo=a,l.base64DataUrl(e.imageInfo).then(function(e){var i="<img src='"+a.$ngfDataUrl+"'width='100px' class='thumb'>";$(".imagePre").empty().append(i)}),i.dismiss("cancel")}},$uibModal:t})});var a=$("form.layui-form"),n=(a.find('input[name="isSize"]'),a.find('input[name="selectSize"]').parent().parent()),o=a.find('input[name="imageWidth"]').parent().parent(),u=a.find('input[name="imageHeight"]').parent().parent(),c=!0;u.hide(),layui.use(["form","layedit","laydate"],function(){function e(){0==c?(u.show(),o.hide()):(u.hide(),o.show())}var a=layui.form();layui.layer,layui.layedit,layui.laydate;a.on("radio",function(a){var i=a.elem.name,t=a.value;"isSize"==i?"no"==t?(n.hide(),o.hide(),u.hide()):(n.show(),e()):"selectSize"==i&&(c="no"!=t,e())})})})}}})});