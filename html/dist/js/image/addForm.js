define(function(){var list=[{title:"title",name:"图片标题",placeholder:"请填写图片标题",type:"text",verify:"imageTitle"},{title:"watermark",name:"是否水印",type:"radio",radio:[{title:"yes",name:"是",checked:!0},{title:"no",name:"否"}]},{title:"isSize",name:"是否等比缩放",type:"radio",radio:[{title:"yes",name:"是",checked:!0},{title:"no",name:"否"}]},{title:"selectSize",name:"等比缩放选择",type:"radio",radio:[{title:"yes",name:"宽",checked:!0},{title:"no",name:"高"}]},{title:"imageWidth",name:"图片宽度",placeholder:"请填写图片宽度",type:"text",verify:"useless"},{title:"imageHeight",name:"图片高度",placeholder:"请填写图片高度",type:"text",verify:"useless"},{title:"imageUrl",name:"上传图片",type:"file",typeName:"images",verify:"image"}];return list});