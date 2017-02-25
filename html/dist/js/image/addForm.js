define(function(){var e=[//表单
{title:"title",name:"图片标题",placeholder:"请填写图片标题",type:"text",verify:"imageTitle"},{title:"watermark",name:"是否水印",type:"radio",radio:[{title:"yes",name:"是",checked:!0},{title:"no",name:"否"}]},{title:"isSize",name:"是否等比缩放",type:"radio",radio:[{title:"yes",name:"是",checked:!0},{title:"no",name:"否"}]},{title:"selectSize",name:"等比缩放选择",type:"radio",radio:[{title:"yes",name:"宽",checked:!0},{title:"no",name:"高"}]},{title:"imageWidth",name:"图片宽度",placeholder:"请填写图片宽度",type:"text",//text textarea radio checkbox edit						
verify:"useless"},{title:"imageHeight",name:"图片高度",placeholder:"请填写图片高度",type:"text",//text textarea radio checkbox edit			
verify:"useless"},{title:"imageUrl",name:"上传图片",type:"file",//text textarea radio checkbox edit
typeName:"images",verify:"image"}];
// function getList(callback){
// 	callback(list);
// }
return e});