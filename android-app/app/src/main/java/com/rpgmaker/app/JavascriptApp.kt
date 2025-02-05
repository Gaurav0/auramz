package com.rpgmaker.app

import android.webkit.WebView

class JavascriptApp (private val webview: WebView) {
	fun invokeCallback(callbackId: String, result: String?) {
		webview.post {
			webview.evaluateJavascript("window.AuraMZ.Mobile.callbacks['$callbackId']('$result')", null)
		}
	}
}