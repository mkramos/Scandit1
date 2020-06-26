package com.mirasense.scanditsdk.plugin;

import android.content.Context;
import android.util.AttributeSet;

import com.scandit.barcodepicker.BarcodePicker;
import com.scandit.barcodepicker.ScanSettings;

import org.json.JSONObject;

import java.util.Map;

public class BaseBarcodePicker extends BarcodePicker {

    public BaseBarcodePicker(Context context) {
        super(context);
    }

    public BaseBarcodePicker(Context context, ScanSettings settings) {
        super(context, settings);
    }

    public BaseBarcodePicker(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public BaseBarcodePicker(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }


    protected void setTrackedCodeStates(Map<Long, JSONObject> trackedCodeStates) {
        // Override this for extensions that need access to custom matrix scan data.
    }
}
