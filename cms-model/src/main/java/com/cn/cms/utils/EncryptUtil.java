package com.cn.cms.utils;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import org.apache.commons.codec.digest.DigestUtils;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.Date;
import java.util.Random;

/**
 * 加密、编码
 * Created by zhangyang on 16/11/24.
 */
public class EncryptUtil {

    private static CommonLog log = CommonLogFactory.getLog(EncryptUtil.class);

    private static final String[] str ={"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"};
    private static final String[] str1 = {"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};
    private static final String[] str2 = {"0","1","2","3","4","5","6","7","8","9"};

    public static final String KEY_ALGORITHM = "RSA";

    /**
     * 随时生成length长度的密码串
     * @param length
     * @return
     */
    public static String randomPwd(int length){
        StringBuffer pwd = new StringBuffer();
        Random random = new Random();
        pwd.append(str1[random.nextInt(str.length)]);
        for(int i=1;i<length;i++){
            int tmp = random.nextInt(3);
            switch (tmp){
                case 0 : pwd.append(str[random.nextInt(str.length)]);break;
                case 1 : pwd.append(str1[random.nextInt(str1.length)]);break;
                case 2 : pwd.append(str2[random.nextInt(str2.length)]);break;
                default:break;
            }
        }
        return pwd.toString();
    }


    /**
     * 根据时间戳＋随机数生成用户ID
     * @return
     */
    public static String buildUserId(){
        long a = new Date().getTime();
        return String.valueOf(a).concat(rand(7));
    }


    public static String rand(int length){
        StringBuffer result = new StringBuffer();
        Random random = new Random();
        for(int i=0;i<length;i++){
            result.append(random.nextInt(10));
        }
        return result.toString();
    }

    /**
     * 采用BASE64Encode(MD5)生成密码串
     * @param pwd
     * @return
     */
    public static String encryptPwd(String userName,String pwd){
        String result = md5Base64(userName.concat(pwd));
        log.info("密码串生成：" + result);
        return result;
    }


    /**
     * BASE64Encode(MD5)加密算法
     * @param key
     * @return
     */
    public static String md5Base64(String key){
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            BASE64Encoder base64en = new BASE64Encoder();
            //加密后的字符串
            return base64en.encode(md5.digest(key.getBytes(StaticContants.UTF8)));
        } catch (NoSuchAlgorithmException e) {
            log.error("密码生成异常!",e);
        } catch (UnsupportedEncodingException e) {
            log.error("密码生成异常!",e);
        }
        return "";

    }

    /**
     * Md5加密
     * @param key
     * @return
     */
    public static String md5(String key){
        return DigestUtils.md5Hex(key);
    }

    /**
     * Token生成。采用MD5+Base64Encode
     * @param keys
     * @return
     */
    public static String token(String... keys){
        StringBuffer sbf = new StringBuffer();
        for(int i=0; i<keys.length; i++){
            sbf.append(md5Base64(keys[i]));
        }
        String tmp = sbf.toString();
        int a = keys.length-1;
        int b = tmp.length()/a;
        sbf.delete(0,sbf.length());
        for(int i=0; i<a ;i++){
            if(i+1<a) {
                sbf.append(md5(tmp.substring(i * b, (i + 1) * b)));
            }else{
                sbf.append(md5Base64(tmp.substring(i * b, (i + 1) * b)));
            }
        }
        return sbf.toString();
    }

    public static String base64(byte[] bytes){
        BASE64Encoder base64Encoder = new BASE64Encoder();
        return base64Encoder.encodeBuffer(bytes);
    }

    public static byte[] decode64(String string) throws IOException {
        BASE64Decoder base64Encoder = new BASE64Decoder();
        return base64Encoder.decodeBuffer(string);
    }

    public static void main(String[] args){
        System.out.println(randomPwd(12));
    }




    /**
     * 加载公式
     * @param publicKeyStr
     * @return
     * @throws Exception
     */
    public static RSAPublicKey loadPublicKeyByStr(String publicKeyStr)
            throws Exception {
        try {
            byte[] buffer = decode64(publicKeyStr);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(buffer);
            return (RSAPublicKey) keyFactory.generatePublic(keySpec);
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("无此算法");
        } catch (InvalidKeySpecException e) {
            throw new Exception("公钥非法");
        } catch (NullPointerException e) {
            throw new Exception("公钥数据为空");
        }
    }

    /**
     * RSA加密
     * @param publicKey
     * @param plainTextData
     * @return
     * @throws Exception
     */
    public static byte[] encrypt(RSAPublicKey publicKey, byte[] plainTextData)
            throws Exception {
        if (publicKey == null) {
            throw new Exception("加密公钥为空, 请设置");
        }
        Cipher cipher = null;
        try {
            // 使用默认RSA
            cipher = Cipher.getInstance("RSA");
            // cipher= Cipher.getInstance("RSA", new BouncyCastleProvider());
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);
            byte[] output = cipher.doFinal(plainTextData);
            return output;
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("无此加密算法");
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
            return null;
        } catch (InvalidKeyException e) {
            throw new Exception("加密公钥非法,请检查");
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
            throw new Exception("明文长度非法");
        } catch (BadPaddingException e) {
            throw new Exception("明文数据已损坏");
        }
    }

    /**
     * 加密 通过私钥
     * @param privateKey
     * @param plainTextData
     * @return
     * @throws Exception
     */
    public static byte[] encrypt(RSAPrivateKey privateKey, byte[] plainTextData)
            throws Exception {
        if (privateKey == null) {
            throw new Exception("加密私钥为空, 请设置");
        }
        Cipher cipher = null;
        try {
            // 使用默认RSA
            cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.ENCRYPT_MODE, privateKey);
            byte[] output = cipher.doFinal(plainTextData);
            return output;
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("无此加密算法");
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
            return null;
        } catch (InvalidKeyException e) {
            throw new Exception("加密私钥非法,请检查");
        } catch (IllegalBlockSizeException e) {
            throw new Exception("明文长度非法");
        } catch (BadPaddingException e) {
            throw new Exception("明文数据已损坏");
        }
    }

    /**
     * 获取公钥
     * @param key
     * @return
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     * @throws InvalidKeySpecException
     */
    public static Key getPublicKey(String key) throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeySpecException {
        // 解密由base64编码的公钥
        byte[] keyBytes = Base64.decode(key);

        // 构造X509EncodedKeySpec对象
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);

        // KEY_ALGORITHM 指定的加密算法
        KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);

        // 取公钥匙对象
        return keyFactory.generatePublic(keySpec);
    }

    /**
     * 根据公钥 加密
     * @param data
     * @param publicKey
     * @return
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     * @throws InvalidKeyException
     * @throws SignatureException
     * @throws UnsupportedEncodingException
     * @throws NoSuchPaddingException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     * @throws ShortBufferException
     */
    public static byte[] encryptByPublicKey(byte[] data, Key publicKey) throws NoSuchAlgorithmException, InvalidKeySpecException,
            InvalidKeyException, SignatureException, UnsupportedEncodingException, NoSuchPaddingException,
            IllegalBlockSizeException, BadPaddingException, ShortBufferException {
        // 取得公钥
        KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);

        // 对数据加密
        Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);

        return CipherUtil.process(cipher, 117, data);
    }


    /**
     * AES加密Key.
     * @return
     */
    public static String encryptAESKey(){
        KeyGenerator keyGen = null;//密钥生成器
        try {
            keyGen = KeyGenerator.getInstance("AES");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        keyGen.init(128);
        SecretKey secretKey = keyGen.generateKey();//生成密钥
        byte[] key = secretKey.getEncoded();//密钥字节数组
        try {
            return new String(key, StaticContants.UTF8);
        } catch (UnsupportedEncodingException e) {
            log.error(e);
        }
        return null;
    }

    /**
     * AES
     * @param key
     * @param params
     * @return
     */
    public static String encryptAES(String key, String... params){
        if(params != null && params.length>0){
            StringBuffer sbf = new StringBuffer();
            for( int i = 0; i < params.length; i ++){
                sbf.append(params[i]);
            }
            SecretKey secretKey = new SecretKeySpec(key.getBytes(Charset.forName(StaticContants.UTF8)), "AES");//恢复密钥
            Cipher cipher = null;//Cipher完成加密或解密工作类
            try {
                cipher = Cipher.getInstance("AES");
                cipher.init(Cipher.ENCRYPT_MODE, secretKey);//对Cipher初始化，解密模式
                byte[] cipherByte = cipher.doFinal(sbf.toString().getBytes(Charset.forName(StaticContants.UTF8)));//加密data
                return new String(cipherByte, StaticContants.UTF8);
            } catch (NoSuchAlgorithmException e) {
                log.error(e);
            } catch (NoSuchPaddingException e) {
                log.error(e);
            } catch (InvalidKeyException e) {
                log.error(e);
            } catch (BadPaddingException e) {
                log.error(e);
            } catch (IllegalBlockSizeException e) {
                log.error(e);
            } catch (UnsupportedEncodingException e) {
                log.error(e);
            }

        }
        return null;
    }

    /**
     * AES
     * 解密
     * @param key
     * @param encryptCode
     * @return
     */
    public static String decryptAEC(String key, String encryptCode){
        SecretKey secretKey = new SecretKeySpec(key.getBytes(Charset.forName(StaticContants.UTF8)), "AES");//恢复密钥
        Cipher cipher = null;//Cipher完成加密或解密工作类
        try {
            cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);//对Cipher初始化，解密模式
            byte[] cipherByte = cipher.doFinal(encryptCode.getBytes(Charset.forName(StaticContants.UTF8)));//加密data
            return new String(cipherByte, StaticContants.UTF8);
        } catch (NoSuchAlgorithmException e) {
            log.error(e);
        } catch (NoSuchPaddingException e) {
            log.error(e);
        } catch (InvalidKeyException e) {
            log.error(e);
        } catch (BadPaddingException e) {
            log.error(e);
        } catch (IllegalBlockSizeException e) {
            log.error(e);
        } catch (UnsupportedEncodingException e) {
            log.error(e);
        }
        return null;
    }

}
