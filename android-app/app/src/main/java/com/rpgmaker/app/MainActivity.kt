package com.rpgmaker.app

import android.annotation.SuppressLint
import android.app.Activity
import android.app.AlertDialog
import android.content.ActivityNotFoundException
import android.content.ComponentName
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.text.InputType
import android.view.*
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.widget.EditText
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import com.aura.gamedev.auramz.R


class MainActivity : AppCompatActivity() {
    private lateinit var rpgwebview: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setTheme(R.style.Theme_MyApplication_blank)
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE)
        setContentView(R.layout.activity_main)
        setFullscreen()

        rpgwebview = findViewById(R.id.webview)
        setWebView()
    }

    private fun setFullscreen() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            window.attributes.layoutInDisplayCutoutMode =
                WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.setDecorFitsSystemWindows(false)
            window.insetsController?.apply {
                hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
                systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            }
        } else {
            @Suppress("DEPRECATION")
            window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_FULLSCREEN
                    or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION)
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    var setWebView = {
        val webSettings = rpgwebview.settings
        webSettings.allowFileAccess = true
        webSettings.allowContentAccess = true
        webSettings.domStorageEnabled = true
        webSettings.mediaPlaybackRequiresUserGesture = false
        webSettings.useWideViewPort = true
        webSettings.databaseEnabled = true
        webSettings.loadWithOverviewMode = true
        webSettings.defaultTextEncodingName = "utf-8"
        webSettings.javaScriptCanOpenWindowsAutomatically = true
        webSettings.loadsImagesAutomatically = true
        webSettings.javaScriptEnabled = true
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT
        webSettings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        rpgwebview.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        WebView.setWebContentsDebuggingEnabled(true)
        val assetLoader = WebViewAssetLoader.Builder()
            .setDomain("com.aura.gamedev.auramz")
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()
        rpgwebview.webViewClient = LocalContentWebViewClient(assetLoader)
        val inAppHtmlUrl = "https://com.aura.gamedev.auramz/assets/www/index.html"
        rpgwebview.loadUrl(inAppHtmlUrl)
        rpgwebview.addJavascriptInterface(ExternalStorage(this, JavascriptApp(rpgwebview)), "ExternalStorage");
    }

    inner class LocalContentWebViewClient(private val assetLoader: WebViewAssetLoader) :
        WebViewClientCompat() {
        override fun shouldInterceptRequest(
            view: WebView, request: WebResourceRequest
        ): WebResourceResponse? {
            return assetLoader.shouldInterceptRequest(request.url)
        }

        override fun shouldOverrideUrlLoading(
            view: WebView,
            requests: WebResourceRequest
        ): Boolean {
            val url = requests.url.toString()
            val uri = Uri.parse(url)
            if (uri.scheme == "inapp") {
                if (uri.authority == "rpgmaker") {
                    if (uri.getQueryParameter("action") == "edittext") {
                        showEditDialog(
                            uri.getQueryParameter("title"),
                            uri.getQueryParameter("msg"),
                            uri.getQueryParameter("varld")
                        )
                    }
                    if (uri.getQueryParameter("action") == "exit") {
                        finish()
                    }
                    if (uri.getQueryParameter("action") == "link") {
                        val urls = uri.getQueryParameter("urlargs")
                        try {
                            val i = Intent("android.intent.action.MAIN")
                            i.component =
                                ComponentName.unflattenFromString("com.android.chrome/com.android.chrome.Main")
                            i.addCategory("android.intent.category.LAUNCHER")
                            i.data = Uri.parse(urls)
                            startActivity(i)
                        } catch (e: ActivityNotFoundException) {
                            // Chrome is not installed
                            val i = Intent(Intent.ACTION_VIEW, Uri.parse(urls))
                            startActivity(i)
                        }
                    }
                    //Blocking Capture
                    if (uri.getQueryParameter("action") == "capture") {
                        if (uri.getQueryParameter("state") == "true") {
                            window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
                        } else {
                            window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
                        }
                    }
                }
                return true
            }

            if (url.startsWith("http://") || url.startsWith("https://")) {
                view.context.startActivity(
                    Intent(Intent.ACTION_VIEW, Uri.parse(url))
                )
                return true
            }

            return super.shouldOverrideUrlLoading(view, requests)
        }
    }

    private fun showEditDialog(title: String?, msg: String?, ld: String?) {

        val builder: AlertDialog.Builder = AlertDialog.Builder(this)
        builder.setTitle(title)
        builder.setCancelable(false)
        val input = EditText(this)
        input.hint = msg
        input.inputType = InputType.TYPE_CLASS_TEXT
        builder.setView(input)
        rpgwebview.onPause()
        builder.setPositiveButton(getString(R.string.are_you_Ok)) { _, _ ->
            val edittext = input.text.toString()
            rpgwebview.evaluateJavascript(
                "javascript:Showeditdialog('$edittext','$ld')"
            ) {
            }
            rpgwebview.onResume()
        }
        builder.setNegativeButton(getString(R.string.are_you_Cancel)) { dialog, _ ->
            rpgwebview.onResume()
            dialog.cancel()
        }
        builder.show()
    }

    override fun onDestroy() {
        rpgwebview.loadDataWithBaseURL(null, "", "text/html", "utf-8", null)
        rpgwebview.clearHistory()
        rpgwebview.destroy()
        super.onDestroy()
    }

    override fun onPause() {
        rpgwebview.onPause()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        rpgwebview.onResume()
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            rpgwebview.onPause()
            val builder = AlertDialog.Builder(this)
            builder.setTitle(getString(R.string.are_you_exit_title))
            builder.setCancelable(false)
            builder.setMessage(getString(R.string.are_you_exit_msg))
                .setPositiveButton(
                    getString(R.string.are_you_exit_yes)
                ) { _, _ ->
                    finish()
                }
                .setNegativeButton(
                    getString(R.string.are_you_exit_no)
                ) { dialog, _ ->
                    rpgwebview.onResume()
                    dialog.cancel()
                }
            // Create the AlertDialog object and return it
            val alert = builder.create()
            alert.show()
            return false
        }
        return super.onKeyDown(keyCode, event)
    }
}