package com.cn.cms.enums.serializer;

import com.alibaba.fastjson.serializer.EnumSerializer;
import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.SerializeWriter;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Type;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/12/20.
 */
public class JSONEnumSerializer<T extends Enum> extends EnumSerializer {

    @Override
    public void write(JSONSerializer serializer, Object object, Object fieldName, Type fieldType, int features) throws IOException {
        Class clazz = object.getClass();
        SerializeWriter out = serializer.getWriter();
        if (object == null) {
            serializer.getWriter().writeNull();
            return;
        }
        Field[] fields = object.getClass().getDeclaredFields();
        out.write("{");
        boolean bool = false;
        for(int i=0;i<fields.length;i++){
            Field field = fields[i];
            if(!field.getGenericType().getTypeName().startsWith(clazz.getName())) {
                try {
                    Method method = clazz.getMethod("get" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1));
                    if(bool) {
                        out.write(",");
                        Object tmp = method.invoke(object);
                        serializer.write(field.getName());
                        out.write(":");
                        serializer.write(tmp);
                    }else{
                        Object tmp = method.invoke(object);
                        serializer.write(field.getName());
                        out.write(":");
                        serializer.write(tmp);
                        bool = true;
                    }
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
        out.write("}");
    }

}
