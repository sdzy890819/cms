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
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by ADMIN on 16/11/30.
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
        FileUtil.mkdir(file);
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
    public static void compressAndWatermark(byte[] bytes, int width, int height, String filePath, int watermark) throws BizException{

        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
        Map<String, Object> map = new HashMap<>();
        try {
            Image image = ImageIO.read(byteArrayInputStream);
            String suffix = filePath.substring(filePath.lastIndexOf(".") + 1).toLowerCase();
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
            graphics.drawImage(image.getScaledInstance(width, height, Image.SCALE_SMOOTH), 0, 0, null);

            //-----水印
            if(watermark == WatermarkEnum.watermark.getType()) {
                //---文字水印
//                int x = width - 10 * 5;
//                int y = height - 10 * 2;
//                int x1 = width - 10 * 7;
//                int y1 = height - 10 ;
//                graphics.setColor(Color.BLACK);
//                graphics.setFont(new Font("Serif", Font.PLAIN ,10));
//                graphics.drawString(StaticContants.WATERMARK_TEXT_EN, x, y);
//                graphics.drawString(StaticContants.WATERMARK_TEXT_URL, x1, y1);

                //-----图片水印
                Image img = ImageIO.read(FileUtil.class.getResourceAsStream(StaticContants.LOGO_NAME));
                float alpha = 0.5f; // 透明度
                graphics.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha));
                int y2 = height - img.getHeight(null);
                int x2 = width - img.getWidth(null);
                graphics.drawImage(img, x2, y2, null);
                graphics.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER));
                graphics.dispose();

            }
            //-----水印结束

            ImageIO.write(buffImg, suffix, new File(filePath));

        } catch (IOException e) {
            log.error("图片压缩出现错误", e);
            throw new BizException("图片压缩出现错误");
        }
    }


    public static byte[] compressAndWatermark(byte[] bytes, int width, int height, int watermark){
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
        try {
            Image image = ImageIO.read(byteArrayInputStream);

            BufferedImage buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics2D graphics = buffImg.createGraphics();
            graphics.setBackground(new Color(255,255,255));
            graphics.setColor(new Color(255,255,255));
            graphics.fillRect(0, 0, width, height);

            graphics.drawImage(image.getScaledInstance(width, height, Image.SCALE_SMOOTH), 0, 0, null);
            //-----水印
            if(watermark == WatermarkEnum.watermark.getType()) {
//                int y = height - 10 * 2;
//                int x = width - 10 * 5;
//                int x1 = width - 10 * 7;
//                int y1 = height - 10 ;
//                graphics.setColor(Color.BLACK);
//                graphics.setFont(new Font("Serif", Font.PLAIN ,10));
//                graphics.drawString(StaticContants.WATERMARK_TEXT_EN, x, y);
//                graphics.drawString(StaticContants.WATERMARK_TEXT_URL, x1, y1);

                //-----图片水印
                Image img = ImageIO.read(FileUtil.class.getResourceAsStream(StaticContants.LOGO_NAME));
                float alpha = 0.5f; // 透明度
                graphics.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha));
                int x2 = width - img.getWidth(null);
                int y2 = height - img.getHeight(null);
                graphics.drawImage(img, x2, y2, null);
                graphics.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER));
                graphics.dispose();
            }
            //-----水印结束
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            ImageIO.write(buffImg, "jpeg", out);
            byte[] result = out.toByteArray();
            return result;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static Map<String,Object> compress(byte[] bytes, int width, int height, String filePath, int watermark)throws BizException{
        Map<String, Object> map = new HashMap<>();
        try {
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
            Image image = ImageIO.read(byteArrayInputStream);
            int w = image.getWidth(null);
            int h = image.getHeight(null);
            map.put("orgWidthPixel", w);
            map.put("orgHeightPixel", h);
            double bili = 0D;
            boolean isZip = true;
            if((width == 0 && height == 0) || width > w || height > h){
                height = h;
                width = w;
                isZip = false;
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
            if(!isZip && watermark == WatermarkEnum.notwatermark.getType()){
                fileUpload(bytes, filePath);
            }else {
                String suffix = filePath.substring(filePath.lastIndexOf(".") + 1).toLowerCase();
                if ("gif".equals(suffix)) {
                    compressGif(bytes, width, height, filePath, watermark);
                } else {
                    compressAndWatermark(bytes, width, height, filePath, watermark);
                }
            }
            return map;
        }catch (Exception e){
            log.error("压缩出现错误", e);
            throw new BizException("压缩错误问题."+e.getMessage());
        }

    }


    public synchronized static void compressGif(byte[] bytes, int width, int height, String filePath, int watermark) throws BizException{
        try {
            GifDecoder decoder = new GifDecoder();
            decoder.read(bytes);
            int n = decoder.getFrameCount();
            //-----jpg结合
            AnimatedGifEncoder e = new AnimatedGifEncoder();
            e.setRepeat(0);
            e.start(filePath);
            //------
            for (int i = 0; i < n; i++) {
                BufferedImage frame = decoder.getFrame(i);
                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                ImageIO.write(frame, "jpeg", byteArrayOutputStream);
//                JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(byteArrayOutputStream);
//                encoder.encode(frame);
                e.setDelay(decoder.getDelay(i));
                e.addFrame(ImageIO.read(new ByteArrayInputStream(compressAndWatermark(byteArrayOutputStream.toByteArray(), width, height, watermark)))); // 添加到帧中
            }
            e.finish();//刷新任何未决的数据，并关闭输出文件
        } catch (Exception e) {
            log.error("splitGif Failed!", e);
            throw new BizException("splitGif Failed!");
        }
    }



    /**
     * 图片自动生成相对路径并返回。
     * @param basePath
     * @param suffix
     * @return
     */
    public static String getRelativePath(String basePath, String suffix){
        String relativePath = getDatePath(null);
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
    public static String getDatePath(Date createTime){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String relativePath = "";
        if(createTime!=null) {
            relativePath = sdf.format(createTime).concat("/");

        }else{
            Calendar calendar = Calendar.getInstance();
            relativePath = sdf.format(calendar.getTime()).concat("/");
        }
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
            fileName = arr[0].concat(StaticContants.CONNECT_LINE).concat(String.valueOf(page)).concat(".").concat(arr[1]);
        }
        return fileName;
    }

    /**
     * 获取文件名前缀
     * @param fileName
     * @return
     */
    public static String getFileNamePrefix(String fileName){
        String tmp = null;
        if(StringUtils.isNotBlank(fileName) && fileName.indexOf(".")> -1){
            String[] arr = fileName.split("\\.");
            tmp = arr[0];
            if(tmp.indexOf("/")>-1){
                tmp =  tmp.substring(tmp.lastIndexOf("/")+1);
            }else if(tmp.indexOf("\\") > -1) {
                tmp = tmp.substring(tmp.lastIndexOf("\\")+1);
            }
            if(tmp.indexOf("-")>-1){
                tmp = tmp.substring(0, tmp.indexOf("-"));
            }
        }
        return tmp;
    }

    /**
     * 获取文件名后缀
     * @param fileName
     * @return
     */
    public static String getFileNameSuffix(String fileName){
        if(StringUtils.isNotBlank(fileName) && fileName.indexOf(".") > -1){
            String[] arr = fileName.split("\\.");
            return arr[1];
        }
        return null;
    }

    /**
     * 分页获取文件名，
     * @param fileName
     * @param page
     * @return
     */
    public static String getFileNameByPageLine(String fileName, Integer page){
        if(page != null && page > 1){
            String[] arr = fileName.split("\\.");
            fileName = arr[0].concat(StaticContants.UNDER_LINE).concat(String.valueOf(page)).concat(".").concat(arr[1]);
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



    public static void main(String[] args) throws IOException, BizException {
//        File file = new File("/Users/zhangyang/Documents/gif.gif");
//        File newFile = new File("/Users/zhangyang/Documents/gif_zipaa.gif");
//        FileInputStream fileInputStream = new FileInputStream(file);
//        byte[] bytes = new byte[fileInputStream.available()];
//        fileInputStream.read(bytes);
//
//        Map<String, Object> map = compress(bytes, 200, 0, "/Users/zhangyang/Documents/gif_zip.gif", 1);
//        System.out.println(JSONObject.toJSONString(map));

        //Image img = ImageIO.read(FileUtil.class.getClassLoader().getResourceAsStream(StaticContants.LOGO_NAME));
        //System.out.println(img.getHeight(null));
    }

    /**
     * 给域名添加后缀 ／
     * @param url
     * @return
     */
    public static String addSuffix(String url){
        if(StringUtils.isNotBlank(url) && !url.endsWith("/") && !url.endsWith("\\")){
            url = url + "/";
        }
        return url;
    }

    /**
     * 去掉相对路径的前缀 /
     * @param url
     * @return
     */
    public static String delPrefix(String url){
        if(StringUtils.isNotBlank(url) && (url.startsWith("/") || url.startsWith("\\"))){
            url = url.substring(1, url.length());
        }
        return url;
    }

}
