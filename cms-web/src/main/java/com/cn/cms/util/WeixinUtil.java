package com.cn.cms.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Formatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class WeixinUtil {


    /***
     * 获取界面调用jsapi的所需参数
     * @param jsapi_ticket 凭据
     * @param url 界面请求地址
     * @return V型知识库 www.vxzsk.com
     */
    public static Map<String, String> sign(String jsapi_ticket, String url) {
        Map<String, String> ret = new HashMap<String, String>();
        String nonce_str = create_nonce_str();
        String timestamp = create_timestamp();
        String string1;
        String signature = "";

        //注意这里参数名必须全部小写，且必须有序
        string1 = "jsapi_ticket=" + jsapi_ticket +
                "&noncestr=" + nonce_str +
                "&timestamp=" + timestamp +
                "&url=" + url;
        System.out.println(string1);

        try {
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            crypt.update(string1.getBytes("UTF-8"));
            signature = byteToHex(crypt.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        ret.put("url", url);
        ret.put("jsapi_ticket", jsapi_ticket);
        ret.put("nonceStr", nonce_str);
        ret.put("timestamp", timestamp);
        ret.put("signature", signature);
        System.out.println("signature" + signature);
        return ret;
    }

    private static String byteToHex(final byte[] hash) {
        Formatter formatter = new Formatter();
        for (byte b : hash) {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;
    }

    private static String create_nonce_str() {
        return UUID.randomUUID().toString();
    }

    private static String create_timestamp() {
        return Long.toString(System.currentTimeMillis() / 1000);
    }


    public static void main(String[] args){
        String jsapi_ticket = "kgt8ON7yVITDhtdwci0qebCUwdjyjkYdw9sgb8hwNe_632AI73j6NRPs8MhGdm6hsu6-E684_jRcyqpNOgNXgQ";
        String nonce_str = "1219e7ed-3e10-4137-a0d7-618715d415a7";
        String timestamp = "1510128253";
        String url = "http://120.77.220.11:8080/webapi/test/test_wifi?nsukey=WN7SADIezHovSO7kEKW6wIDWYsH3vwDhKakwG3%2Ff%2BWtTnqUP92TeOfNVpt7c9cL5zf3Vs230DC3gngO6GhfUhPZaFnaa2WQ2eeC%2BMl6HIK0oRh15kBFXQ1uzd%2B5NDs%2F1U0ZcOpQtXRLaiGg8sJVyqTVxYMZ0cZqiLcNyzxVaVE9X8ebRo4uWSeZkDKiV13YYoqNFrdApSbVkSkKflE%2BUPA%3D%3D";
        String string1;
        String signature = "";

        //注意这里参数名必须全部小写，且必须有序
        string1 = "jsapi_ticket=" + jsapi_ticket +
                "&noncestr=" + nonce_str +
                "&timestamp=" + timestamp +
                "&url=" + url;
        System.out.println(string1);

        try {
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            crypt.update(string1.getBytes("UTF-8"));
            signature = byteToHex(crypt.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        System.out.println(signature);
    }
}
