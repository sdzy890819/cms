package com.cn.cms.utils;

import org.apache.commons.lang.ArrayUtils;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.ShortBufferException;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/19.
 */
public class CipherUtil {

    private static final int OUTPUT_SIZE = 8 * 1024;

    public static byte[] process(Cipher cipher, int blockSize, byte[] input) throws IllegalBlockSizeException, BadPaddingException, ShortBufferException {
        if (input.length <= blockSize) {
            return cipher.doFinal(input);
        }
        byte[] output = new byte[OUTPUT_SIZE];
        int outputSize = 0;
        for (int i = 0; ;i += blockSize) {
            if (i + blockSize < input.length)
                outputSize += cipher.doFinal(input, i, blockSize, output, outputSize);
            else {
                outputSize += cipher.doFinal(input, i, input.length - i, output, outputSize);
                break;
            }
        }
        return ArrayUtils.subarray(output, 0, outputSize);
    }

}
