package com.cn.cms.utils;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.WatermarkEnum;
import sun.misc.BASE64Decoder;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * Created by zhangyang on 16/11/30.
 */
public class FileUtil {

    /**
     * 图片Base64解码、
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
        Map<String, Object> map = new HashMap<String, Object>();
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
     * 获取相对路径。
     * @param basePath
     * @param suffix
     * @return
     */
    public static String getRelativePath(String basePath, String suffix){
        Calendar calendar = Calendar.getInstance();
        int month = calendar.get(Calendar.MONTH) + 1;
        int year = calendar.get(Calendar.YEAR);
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        long time = calendar.getTimeInMillis();
        String timeFile = String.valueOf(time).substring(3);
        Random random = new Random();
        ;
        String fileName = StaticContants.QUANJING_RESOURCE_FILENAME.concat(timeFile).
                concat(String.valueOf(random.nextInt(10))).concat(String.valueOf(random.nextInt(10)))
                .concat(".").concat(suffix.startsWith(".")?suffix.substring(1):suffix);

        String relativePath = StringUtils.concatUrl(String.valueOf(year),
                String.valueOf(month), String.valueOf(day));

        String filePath = StringUtils.concatUrl(basePath,relativePath);

        File file = new File(filePath);
        if(!file.canRead() || !file.canWrite()){
            file.mkdirs();
        }
        return StringUtils.concatUrl(relativePath, fileName);
    }

}
