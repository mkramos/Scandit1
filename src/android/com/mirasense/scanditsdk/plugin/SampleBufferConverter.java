//  Copyright 2018 Scandit AG
//
//  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
//  in compliance with the License. You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software distributed under the
//  License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
//  express or implied. See the License for the specific language governing permissions and
//  limitations under the License.

package com.mirasense.scanditsdk.plugin;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.ImageFormat;
import android.graphics.Rect;
import android.graphics.YuvImage;
import android.util.Base64;

import java.io.ByteArrayOutputStream;

import static android.util.Base64.encodeToString;

public class SampleBufferConverter {

    public static String base64StringFromFrame(byte[] frameBytes, int width, int height) {
        Bitmap jpegBitmap = getBitmapFromYuv(frameBytes, width, height);
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        jpegBitmap.compress(Bitmap.CompressFormat.PNG, 100, outStream);
        String base64String = encodeToString(outStream.toByteArray(), Base64.DEFAULT);

        // Return a String which is easily readable by js side.
        return "data:image/png;base64," + base64String;
    }


    private static Bitmap getBitmapFromYuv(byte[] bytes, int width, int height) {
        YuvImage yuvImage = new YuvImage(bytes, ImageFormat.NV21, width, height, null);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        yuvImage.compressToJpeg(new Rect(0, 0, width, height), 100, outputStream);
        byte[] jpegByteArray = outputStream.toByteArray();
        return BitmapFactory.decodeByteArray(jpegByteArray, 0, jpegByteArray.length);
    }
}
