define(function(){
    var list = [ //表单
        {
            title : 'classifyName',
            name : '图片分类',
            placeholder : '请填写图片分类标题',
            type : 'text',
            verify : 'imageTitle'
        }    
    ];

    // function getList(callback){
    //  callback(list);
    // }
    return list;
})