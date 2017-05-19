package com.cn.cms.utils;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;

public class ImageSpek {
    private static File file = null; // 文件对象
	private static String inputDir; // 输入图路径
	private static String outputDir; // 输出图路径
	private static String inputFileName; // 输入图文件名
	private static String outputFileName; // 输出图文件名
	private static int outputWidth = 115; // 默认输出图片宽
	private static int outputHeight = 90; // 默认输出图片高
	private static boolean proportion = true; // 是否等比缩放标记(默认为等比缩放)

	public ImageSpek() { // 初始化变量
		inputDir = "";
		outputDir = "";
		inputFileName = "";
		outputFileName = "";
		outputWidth = 100;
		outputHeight = 120;
	}

	public void setInputDir(String inputDir) {
		ImageSpek.inputDir = inputDir;
	}

	public void setOutputDir(String outputDir) {
		ImageSpek.outputDir = outputDir;
	}

	public void setInputFileName(String inputFileName) {
		ImageSpek.inputFileName = inputFileName;
	}

	public void setOutputFileName(String outputFileName) {
		ImageSpek.outputFileName = outputFileName;
	}

	public void setOutputWidth(int outputWidth) {
		ImageSpek.outputWidth = outputWidth;
	}

	public void setOutputHeight(int outputHeight) {
		ImageSpek.outputHeight = outputHeight;
	}

	public static void setWidthAndHeight(int width, int height) {
		outputWidth = width;
		outputHeight = height;
	}

	/*
	 * 获得图片大小 传入参数 String path ：图片路径
	 */
	public static long getPicSize(String path) {
		file = new File(path);
		return file.length();
	}

	// 图片处理
	public static String compressPic() {
		try {
			// 获得源文件
			file = new File(inputDir + "\\" + inputFileName);
			if (!file.exists()) {
				return "";
			}
			Image img = ImageIO.read(file);
			// 判断图片格式是否正确
			if (img.getWidth(null) == -1) {
				System.out.println(" can't read,retry!" + "<BR>");
				return "no";
			} else {
				int newWidth;
				int newHeight;
				// 判断是否是等比缩放
				if (proportion == true) {
					// 为等比缩放计算输出的图片宽度及高度
					double rate1 = ((double) img.getWidth(null))
							/ (double) outputWidth * 1.0;
					double rate2 = ((double) img.getHeight(null))
							/ (double) outputHeight * 1.0;
					// 根据缩放比率大的进行缩放控制
					double rate = rate1 > rate2 ? rate1 : rate2;
					newWidth = (int) (((double) img.getWidth(null)) / rate);
					newHeight = (int) (((double) img.getHeight(null)) / rate);
				} else {
					newWidth = outputWidth; // 输出的图片宽度
					newHeight = outputHeight; // 输出的图片高度
				}
				BufferedImage tag = new BufferedImage((int) newWidth,
						(int) newHeight, BufferedImage.TYPE_INT_RGB);

				/*
				 * Image.SCALE_SMOOTH 的缩略算法 生成缩略图片的平滑度的 优先级比速度高 生成的图片质量比较好 但速度慢
				 */
				tag.getGraphics().drawImage(
						img.getScaledInstance(newWidth, newHeight,
								Image.SCALE_SMOOTH), 0, 0, null);
				FileOutputStream out = new FileOutputStream(outputDir + "\\"
						+ outputFileName);
				// JPEGImageEncoder可适用于其他图片类型的转换
				JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
				encoder.encode(tag);
				out.close();
			}
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return "ok";
	}

	public static String compressPic(String inputDir, String outputDir,
			String inputFileName, String outputFileName, int width, int height,
			boolean gp) {
		// 输入图路径
		ImageSpek.inputDir = inputDir;
		// 输出图路径
		ImageSpek.outputDir = outputDir;
		// 输入图文件名
		ImageSpek.inputFileName = inputFileName;
		// 输出图文件名
		ImageSpek.outputFileName = outputFileName;
		// 设置图片长宽
		setWidthAndHeight(width, height);
		// 是否是等比缩放 标记
		proportion = gp;
		return compressPic();
	}

	public static void SpekAfterImage(String DefaultImagePath,
			String SpekImagePath, int SpekWidth, int SpekHeight,
			String ImageFormat) {
		try {
			File fi = new File(DefaultImagePath); // 大图文件
			File fo = new File(SpekImagePath); // 将要转换出的小图文件
			BufferedImage bis = ImageIO.read(fi);
			Image SpekImage = bis.getScaledInstance(SpekWidth, SpekHeight,
					bis.SCALE_SMOOTH);
			AffineTransformOp atf_op = new AffineTransformOp(AffineTransform
					.getScaleInstance((double) SpekWidth / bis.getTileWidth(),
							(double) SpekHeight / bis.getHeight()),
					AffineTransformOp.TYPE_NEAREST_NEIGHBOR);
			SpekImage = atf_op.filter(bis, null);
			ImageIO.write((BufferedImage) SpekImage, ImageFormat, fo);
		} catch (Exception e) {
			throw new RuntimeException("ImageIo.write error in CreatThum.:"
					+ e.getMessage());
		}
	}

	/*
	 * jpgToGif
	 * *********************************************
	 */
	public synchronized static void jpgToGif(String pic[],
			String newPic) {
		try {
			AnimatedGifEncoder e = new AnimatedGifEncoder(); 
			e.setRepeat(0);
			e.start(newPic);
			BufferedImage src[] = new BufferedImage[pic.length];
			for (int i = 0; i < src.length; i++) {
				e.setDelay(200); // 设置播放的延迟时间
				src[i] = ImageIO.read(new File(pic[i])); // 读入需要播放的jpg文件
				e.addFrame(src[i]); // 添加到帧中
			}
			e.finish();//刷新任何未决的数据，并关闭输出文件
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public synchronized static void jpgToGif(java.util.List<byte[]> list,
											 String newPic) {
		try {
			AnimatedGifEncoder e = new AnimatedGifEncoder();
			e.setRepeat(0);
			e.start(newPic);
			BufferedImage src[] = new BufferedImage[list.size()];
			for (int i = 0; i < src.length; i++) {
				e.setDelay(200); // 设置播放的延迟时间
				src[i] = ImageIO.read(new ByteArrayInputStream(list.get(i))); // 读入需要播放的jpg文件
				e.addFrame(src[i]); // 添加到帧中
			}
			e.finish();//刷新任何未决的数据，并关闭输出文件
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	public static boolean delAllFile(String path) {
		boolean flag = false;
		File file = new File(path);
		if (!file.exists()) {
			return flag;
		}
		if (!file.isDirectory()) {
			return flag;
		}
		String[] tempList = file.list();
		File temp = null;
		for (int i = 0; i < tempList.length; i++) {
			if (path.endsWith(File.separator)) {
				temp = new File(path + tempList[i]);
			} else {
				temp = new File(path + File.separator + tempList[i]);
			}
			if (temp.isFile()) {
				temp.delete();
			}
			if (temp.isDirectory()) {
				delAllFile(path + "/" + tempList[i]);// 先删除文件夹里面的文件
				// delFolder(path + "/" + tempList[i]);// 再删除空文件夹
				flag = true;
			}
		}
		return flag;
	}

	public static void delFolder(String folderPath) {
		try {
			delAllFile(folderPath); // 删除完里面所有内容
			String filePath = folderPath;
			filePath = filePath.toString();
			java.io.File myFilePath = new java.io.File(filePath);
			myFilePath.delete(); // 删除空文件夹
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public synchronized static String[] splitGif(String gifName, String path) {
		try {
			GifDecoder decoder = new GifDecoder();
			decoder.read(gifName);
			int n = decoder.getFrameCount(); // 得到frame的个数
			String[] subPic = new String[n];
			for (int i = 0; i < n; i++) {
				BufferedImage frame = decoder.getFrame(i); // 得到帧
				subPic[i] = path + "\\" + String.valueOf(i) + ".jpg";
				FileOutputStream out = new FileOutputStream(subPic[i]);
				ImageIO.write(frame, "jpeg", out);
				JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
				encoder.encode(frame); // 存盘
				out.flush();
				out.close();
			}
			return subPic;
		} catch (Exception e) {
			System.out.println("splitGif Failed!");
			e.printStackTrace();
			return null;
		}
	}

	public synchronized static java.util.List<byte[]> splitGif(byte[] bytes) {
		try {
			GifDecoder decoder = new GifDecoder();
			decoder.read(bytes);
			int n = decoder.getFrameCount(); // 得到frame的个数
			java.util.List<byte[]> list = new ArrayList<>();
			for (int i = 0; i < n; i++) {
				BufferedImage frame = decoder.getFrame(i); // 得到帧
				ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
				ImageIO.write(frame, "jpeg", byteArrayOutputStream);
				JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(byteArrayOutputStream);
				encoder.encode(frame); // 存盘
				byte[] by = byteArrayOutputStream.toByteArray();
				byteArrayOutputStream.flush();
				byteArrayOutputStream.close();
				list.add(by);
			}
			return list;
		} catch (Exception e) {
			System.out.println("splitGif Failed!");
			e.printStackTrace();
			return null;
		}
	}


}