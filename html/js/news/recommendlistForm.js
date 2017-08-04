define(['../data/getData','../moduls/Tool'],function(getData,Tool){
    var list = [ //表单
        {
            title : 'recommendColumnId',
            selectName : [
                'recommendColumnId'
            ],
            name : '选择推荐栏目',
            type : 'select',
            verify : 'select',
            select : [
                [
                    {name:'请选择推荐栏目',title:'recommendColumnId'}
                ]
            ]
        }
    ];
    
    function getList(callback,obj){
        getData.news.recommendColumnlist({//部门
			obj : obj,
            callback:function(_data){
                $.each(list,function(i , obj){
                    if(obj.type=='select'){
                        if(obj.select[0][0].title=='recommendColumnId'){
                            obj.select[0] = [obj.select[0][0]];
                            obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'columnName',newName:'name'}]));

                            callback(list);
                        }
                    }
                })
            }
        });
    }
    return getList;
})