package com.mirasense.scanditsdk.plugin;

import com.mirasense.scanditsdk.plugin.BarcodePickerWithSearchBar.Constraints;

/**
 * @author Robert Nawrot
 */
public interface ResizeScannerInterface {

    void scannerResized(Constraints portrait, Constraints landscape, int animationDuration);
    void scannerShown(Constraints portrait, Constraints landscape);
    void scannerDismissed();
}
