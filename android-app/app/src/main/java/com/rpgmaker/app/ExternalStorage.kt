package com.rpgmaker.app

import android.app.Activity
import android.content.ContentValues.TAG
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Base64
import android.util.Log
import android.webkit.JavascriptInterface
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.documentfile.provider.DocumentFile
import com.aura.gamedev.auramz.R
import com.google.gson.Gson
import java.util.concurrent.Executors


class ExternalStorage (private val activity: AppCompatActivity, private val javascriptApp: JavascriptApp) {
	private lateinit var callbackId: String
	private var cachedExternalSaveDirectoryFile: DocumentFile? = null
	private var executor = Executors.newSingleThreadExecutor()

	private val launcher =
		activity.registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
			if (result.resultCode == Activity.RESULT_OK) {
				val data: Intent? = result.data
				val uri = data?.data
				val externalSaveDirectory = uri.toString()

				// Save the selected folder in the app local preferences
				val sharedPref = activity.getPreferences(Context.MODE_PRIVATE)
				if (sharedPref != null) {
					with (sharedPref.edit()) {
						putString(activity.getString(R.string.external_save_directory), externalSaveDirectory)
						apply()
					}
				}

				// Invalidate cache
				cachedExternalSaveDirectoryFile = null

				// Persist permissions
				val takeFlags: Int = result.data?.flags?.and(Intent.FLAG_GRANT_READ_URI_PERMISSION) ?: 0
				takeFlags.or(result.data?.flags?.and(Intent.FLAG_GRANT_WRITE_URI_PERMISSION) ?: 0)
				activity.contentResolver.takePersistableUriPermission(uri!!, takeFlags)

				javascriptApp.invokeCallback(callbackId, externalSaveDirectory)
			} else if (result.resultCode == Activity.RESULT_CANCELED) {
				javascriptApp.invokeCallback(callbackId, null)
			}
		}

	@JavascriptInterface
	fun selectExternalStorageDirectory(callbackId: String) {
		this.callbackId = callbackId
		val intent = Intent(Intent.ACTION_OPEN_DOCUMENT_TREE)
		intent.addFlags(
			Intent.FLAG_GRANT_READ_URI_PERMISSION
					or Intent.FLAG_GRANT_WRITE_URI_PERMISSION
					or Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION
					or Intent.FLAG_GRANT_PREFIX_URI_PERMISSION
		)
		launcher.launch(intent)
	}

	private fun getDocumentFile() : DocumentFile? {
		if (cachedExternalSaveDirectoryFile == null) {
			val sharedPref = activity.getPreferences(Context.MODE_PRIVATE)
			val externalSaveDirectory = sharedPref?.getString(activity.getString(R.string.external_save_directory), null)
			if (externalSaveDirectory != null) {
				val uri = Uri.parse(externalSaveDirectory)
				cachedExternalSaveDirectoryFile = DocumentFile.fromTreeUri(activity, uri)
			}
		}

		return cachedExternalSaveDirectoryFile
	}

	private fun findFile(fileName: String) : DocumentFile? {
		val document = getDocumentFile()
		if (document != null) {
			val uri = Uri.parse(document.uri.toString() + "%2F$fileName")
			val file = DocumentFile.fromTreeUri(activity, uri)
			return if (file?.exists() == true) file else null
		}

		return null
	}

	@JavascriptInterface
	fun writeFile(callbackId: String, fileName: String, data: String, overwrite: Boolean) {
		executor.run {
			// If the file already exists, android will not overwrite it when doing createFile
			// but instead create a new file with a new URI as if it was a copied file
			// so to overwrite an existing file we first have to check if it already exists
			val existingFile = findFile(fileName)
			if (existingFile == null || overwrite) {
				val documentFile = getDocumentFile()
				try {
					val file = existingFile ?: documentFile?.createFile(
						"application/octet-stream",
						fileName
					)
					if (file != null) {
						activity.contentResolver.openOutputStream(file.uri).use { outputStream ->
							outputStream?.write(data.toByteArray())
						}
					}
				} catch (e: Exception) {
					Log.e(TAG, "Exception: " + Log.getStackTraceString(e));
				}
			}
			// No return value so just invoke callback with null
			javascriptApp.invokeCallback(callbackId, null)
		}
	}

	@JavascriptInterface
	fun readFile(callbackId: String, fileName: String) {
		executor.run {
			val file = findFile(fileName)
			var invokedCallback = false
			if (file != null) {
				activity.contentResolver.openInputStream(file.uri).use { inputStream ->
					if (inputStream != null) {
						val data = inputStream.readBytes()
						val encodedData = Base64.encodeToString(data, Base64.NO_WRAP)
						javascriptApp.invokeCallback(callbackId, encodedData)
						invokedCallback = true
					}
				}
			}

			if (!invokedCallback) {
				// Something went wrong, return null
				javascriptApp.invokeCallback(callbackId, null)
			}
		}
	}

	@JavascriptInterface
	fun existsFile(callbackId: String, fileName: String) {
		executor.run {
			val document = findFile(fileName)
			val exists = document != null && document.exists()
			javascriptApp.invokeCallback(callbackId, exists.toString())
		}
	}

	@JavascriptInterface
	fun removeFile(callbackId: String, fileName: String) {
		executor.run {
			findFile(fileName)?.delete()

			// No return value so just return null
			javascriptApp.invokeCallback(callbackId, null)
		}
	}

	@JavascriptInterface
	fun listFiles(callbackId: String) {
		executor.run {
			val documentFile = getDocumentFile()
			val gson = Gson()
			val files = documentFile?.listFiles()?.map { file -> file.name }
			val json: String = gson.toJson(files ?: ArrayList<DocumentFile>())

			// No return value so just return null
			javascriptApp.invokeCallback(callbackId, json)
		}
	}

	@JavascriptInterface
	fun removeExternalStorageDirectory(callbackId: String) {
		executor.run {
			val documentFile = getDocumentFile()
			if (documentFile != null) {
				// Remove the selected external save directory from the preferences
				val sharedPref = activity.getPreferences(Context.MODE_PRIVATE)
				if (sharedPref != null) {
					with(sharedPref.edit()) {
						putString(activity.getString(R.string.external_save_directory), null)
						apply()
					}
				}
			}

			// No return value so just invoke callback with null
			javascriptApp.invokeCallback(callbackId, null)
		}
	}
}