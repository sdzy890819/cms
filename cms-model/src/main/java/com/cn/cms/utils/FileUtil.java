package com.cn.cms.utils;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.WatermarkEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import sun.misc.BASE64Decoder;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.*;

/**
 * Created by zhangyang on 16/11/30.
 */
public class FileUtil {

    private static final CommonLog log = CommonLogFactory.getLog(FragmentUtil.class);

    /**
     * Base64解码、
     * @param baseCode
     * @return
     */
    public static byte[] base64Upload(String baseCode){
        BASE64Decoder base64Decoder = new BASE64Decoder();
        byte[] bytes = null;
        try {
            bytes = base64Decoder.decodeBuffer(baseCode);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bytes;
    }


    /**
     * 文件上传
     * @param bytes
     * @param filePath
     */
    public static void fileUpload(byte[] bytes, String filePath) throws BizException{
        File file = new File(filePath);
        if(!file.exists()){
            file.mkdirs();
        }
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            fileOutputStream.write(bytes);
            fileOutputStream.flush();
            fileOutputStream.close();
        } catch (FileNotFoundException e) {
            throw new BizException(StaticContants.ERROR_TEMPLATE_UPLOAD_OPEN, e);
        } catch (IOException e) {
            throw new BizException(StaticContants.ERROR_TEMPLATE_UPLOAD_WRITE, e);
        }
    }

    /**
     * 文件下载
     * @param outputStream
     * @param filePath
     * @throws BizException
     */
    public static void fileDownload(OutputStream outputStream,String filePath) throws BizException {
        File file = new File(filePath);
        try {
            FileInputStream fileInputStream = new FileInputStream(file);
            byte[] bytes = new byte[1024];
            int read = 0 ;
            while( (read = fileInputStream.read(bytes)) > 0){
                outputStream.write(bytes, 0, read);
            }
            outputStream.flush();
            outputStream.close();
            fileInputStream.close();
        } catch (FileNotFoundException e) {
            throw new BizException(StaticContants.ERROR_TEMPLATE_DOWNLOAD_NOT_FOUND, e);
        } catch (IOException e) {
            throw new BizException(StaticContants.ERROR_TEMPLATE_DOWNLOAD_FILE_EX, e);
        }
    }

    /**
     * 压缩、水印。
     * 优先以width进行等比压缩。
     * 如果width ＝ 0 走height压缩
     * 如果width ＝ 0 && height ＝ 0 不压缩。
     * @param bytes
     * @param width
     * @param height
     * @param filePath
     * @param watermark
     * @return
     */
    public static Map<String,Object> compressAndWatermark(byte[] bytes, int width, int height, String filePath, int watermark){
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
        Map<String, Object> map = new HashMap<>();
        try {
            Image image = ImageIO.read(byteArrayInputStream);
            int w = image.getWidth(null);
            int h = image.getHeight(null);
            map.put("orgWidthPixel", w);
            map.put("orgHeightPixel", h);
            double bili = 0D;
            if(width == 0 && height == 0){
                width = w;
                height = h;
            }else {
                if (width > 0) {
                    bili = width / (double) w;
                    height = (int) (h * bili);
                } else {
                    if (height > 0) {
                        bili = height / (double) h;
                        width = (int) (w * bili);
                    }
                }
            }
            map.put("imageWidthPixel", width);
            map.put("imageHeightPixel", height);
            String suffix = "jpg";
            suffix = filePath.substring(filePath.lastIndexOf(".")+1);
            BufferedImage buffImg = null;
            if(suffix.equals("png")){
                buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
            }else{
                buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            }
            Graphics2D graphics = buffImg.createGraphics();
            graphics.setBackground(new Color(255,255,255));
            graphics.setColor(new Color(255,255,255));
            graphics.fillRect(0, 0, width, height);

            //-----水印
            if(watermark == WatermarkEnum.watermark.getType()) {
                int x = width / 2;
                int y = height / 2;
                graphics.setColor(Color.white);
                graphics.drawString(StaticContants.WATERMARK_TEXT, x, y);
            }
            //-----水印结束

            graphics.drawImage(image.getScaledInstance(width, height, Image.SCALE_SMOOTH), 0, 0, null);

            ImageIO.write(buffImg, suffix, new File(filePath));

        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }


    /**
     * 图片自动生成相对路径并返回。
     * @param basePath
     * @param suffix
     * @return
     */
    public static String getRelativePath(String basePath, String suffix){
        String relativePath = getDatePath();
        String filePath = StringUtils.concatUrl(basePath,relativePath);
        String fileName = getFileName(suffix);
        File file = new File(filePath);
        mkdir(file, false);
        return StringUtils.concatUrl(relativePath, fileName);
    }

    /**
     * 按照后缀生成随即文件名
     * @param suffix
     * @return
     */
    public static String getFileName(String suffix){
        long time = new Date().getTime();
        String timeFile = String.valueOf(time).substring(3);
        Random random = new Random();
        String fileName = StaticContants.QUANJING_RESOURCE_FILENAME.concat(timeFile).
                concat(String.valueOf(random.nextInt(10))).concat(String.valueOf(random.nextInt(10)))
                .concat(".").concat(suffix.startsWith(".")?suffix.substring(1):suffix);
        return fileName;
    }

    /**
     *
     * 获取日期路径
     * @return
     */
    public static String getDatePath(){
        Calendar calendar = Calendar.getInstance();
        int month = calendar.get(Calendar.MONTH) + 1;
        int year = calendar.get(Calendar.YEAR);
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        String relativePath = StringUtils.concatUrl(String.valueOf(year),
                String.valueOf(month), String.valueOf(day));
        return relativePath;
    }

    /**
     * 创建文件夹,默认的时候认为是文件
     * @param file
     * @param isFile true 文件 false 文件夹
     * @return
     */
    public static void mkdir(File file, boolean... isFile){
        if(isFile.length>0) {
            if(isFile[0]){
                File tmp = new File(file.getParent());
                if(!tmp.exists()){
                    tmp.mkdirs();
                }
            }else{
                if(!file.exists()){
                    file.mkdirs();
                }
            }
        }else {
            File tmp = new File(file.getParent());
            if(!tmp.exists()){
                tmp.mkdirs();
            }
        }
    }

    /**
     * 分页获取文件名，
     * @param fileName 必须事XXX.xxx格式
     * @param page
     * @return
     */
    public static String getFileNameByPage(String fileName, Integer page){
        if(page != null && page > 1){
            String[] arr = fileName.split("\\.");
            fileName = arr[0].concat(StaticContants.UNDER_LINE).concat(String.valueOf(page)).concat(arr[1]);
        }
        return fileName;
    }


    public static void copyFile(String fromFile, String toFile) {
        try {
            FileReader fileReader = new FileReader(new File(fromFile));
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            StringBuffer stringBuffer = new StringBuffer();
            String tmp ;
            while((tmp = bufferedReader.readLine())!=null){
                stringBuffer.append(tmp);
            }

            File file = new File(toFile);
            mkdir(file);
            FileWriter fileWriter = new FileWriter(file);
            fileWriter.write(stringBuffer.toString());
            fileWriter.flush();
            fileWriter.close();
        } catch (FileNotFoundException e) {
            log.error(e);
        } catch (IOException e) {
            log.error(e);
        }
    }


    public static void writeFile(String content, String toFile) {
        try {
            File file = new File(toFile);
            mkdir(file);
            FileWriter fileWriter = new FileWriter(file);
            fileWriter.write(content);
            fileWriter.flush();
            fileWriter.close();
        } catch (IOException e) {
            log.error(e);
        }
    }

    public static String readFile(String fromFile){
        try {
            FileReader fileReader = new FileReader(new File(fromFile));
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            StringBuffer stringBuffer = new StringBuffer();
            String tmp ;
            while((tmp = bufferedReader.readLine())!=null){
                stringBuffer.append(tmp);
            }
            return stringBuffer.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }



}
