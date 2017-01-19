package com.cn.cms.utils;

import com.alibaba.fastjson.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

/**
 * Created by zhangyang on 17/1/18.
 */
public class GzipUtils {

    public static final byte[] unGzip(byte[] data) throws IOException {
        GZIPInputStream zin = new GZIPInputStream(new ByteArrayInputStream(data));
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            data = new byte[10240];
            int len;
            while ((len = zin.read(data)) != -1) {
                out.write(data, 0, len);
            }
            return out.toByteArray();
        } finally {
            zin.close();
            out.close();
        }
    }

    public static final byte[] gzip(byte[] data) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        GZIPOutputStream zout = new GZIPOutputStream(out);
        zout.write(data);
        zout.close();
        return out.toByteArray();
    }

    public static final byte[] gzipString(String str) throws IOException {
        byte[] data = str.getBytes("UTF-8");
        return gzip(data);
    }

    public static final String unGzipString(byte[] data) throws IOException {
        data = unGzip(data);
        return new String(data, "UTF-8");
    }

    public static final <T> T readObj(byte[] data, Class<T> valueType) throws IOException {
        GZIPInputStream zin = new GZIPInputStream(new ByteArrayInputStream(data));
        try {
            byte tmp[] = new byte[zin.available()];
            zin.read(tmp);
            return JSONObject.parseObject(tmp, valueType);
        } finally {
            zin.close();
        }
    }

}
