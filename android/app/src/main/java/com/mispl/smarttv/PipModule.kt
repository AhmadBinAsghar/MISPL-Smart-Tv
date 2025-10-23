package com.iptv

import android.app.Activity
import android.app.PictureInPictureParams
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Rect
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.util.Rational
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class PipModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "PipModule"

    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun enterPipMode() {
        val activity: Activity = currentActivity ?: return

        // Check if PiP is supported and enabled
        if (isPipSupported(activity)) {
            if (isPipEnabled(activity)) {
                // Enter PiP mode
                val aspectRatio = Rational(16, 9) // Default aspect ratio
                val params = PictureInPictureParams.Builder()
                        .setAspectRatio(aspectRatio)
                        .setSourceRectHint(android.graphics.Rect(0, 0, 300, 200))
                        .build()
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    activity.enterPictureInPictureMode(params)
                }
            } else {
                // PiP is not enabled, guide the user to enable it
                openAppSettings(activity)
            }
        } else {
            // PiP is not supported on this device
            println("PiP mode is not supported on this device.")
        }
    }

    @ReactMethod
    fun startVideoPlayer(videoUri: String) {
        val context = reactApplicationContext
        val intent = Intent(context, VideoPlayerActivity::class.java)
        intent.putExtra("videoUri", videoUri)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) // Ensure this flag is set
        context.startActivity(intent)
    }



    @ReactMethod
    fun exitPipMode() {
        currentActivity?.finish()
    }

    @ReactMethod
    fun isInPipMode(callback: Callback) {
        val isPip = currentActivity?.isInPictureInPictureMode ?: false
        callback.invoke(isPip)
    }

    @ReactMethod
    fun isPipSupported(callback: Callback) {
        val activity = currentActivity ?: return callback.invoke(false)
        callback.invoke(isPipSupported(activity))
    }

    @ReactMethod
    fun isPipEnabled(callback: Callback) {
        val activity = currentActivity ?: return callback.invoke(false)
        callback.invoke(isPipEnabled(activity))
    }

    private fun isPipSupported(activity: Activity): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            activity.packageManager.hasSystemFeature(PackageManager.FEATURE_PICTURE_IN_PICTURE)
        } else {
            false
        }
    }

    private fun isPipEnabled(activity: Activity): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Check if PiP is enabled in app settings
            Settings.canDrawOverlays(activity)
        } else {
            false
        }
    }

    private fun openAppSettings(activity: Activity) {
        val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
            data = Uri.fromParts("package", activity.packageName, null)
        }
        activity.startActivity(intent)
    }
}