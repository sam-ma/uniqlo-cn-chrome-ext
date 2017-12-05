@file:Suppress("INTERFACE_WITH_SUPERCLASS", "OVERRIDING_FINAL_MEMBER", "RETURN_TYPE_MISMATCH_ON_OVERRIDE", "CONFLICTING_OVERLOADS")
@file:JsQualifier("chrome.enterprise.platformKeys")
package chrome.enterprise.platformKeys

import kotlin.js.*
import kotlin.js.Json
import org.khronos.webgl.*
import org.w3c.dom.*
import org.w3c.dom.events.*
import org.w3c.dom.parsing.*
import org.w3c.dom.svg.*
import org.w3c.dom.url.*
import org.w3c.fetch.*
import org.w3c.files.*
import org.w3c.notifications.*
import org.w3c.performance.*
import org.w3c.workers.*
import org.w3c.xhr.*

external interface Token {
    var id: String
//    var subtleCrypto: SubtleCrypto
    var subtleCrypto: Any
}
external fun getToken(callback: (tokens: Array<Token>) -> Unit): Unit = definedExternally
external fun getCertificates(tokenId: String, callback: (certificates: ArrayBuffer) -> Unit): Unit = definedExternally
external fun importCertificate(tokenId: String, certificate: ArrayBuffer, callback: (() -> Unit)? = definedExternally /* null */): Unit = definedExternally
external fun removeCertificate(tokenId: String, certificate: ArrayBuffer, callback: (() -> Unit)? = definedExternally /* null */): Unit = definedExternally
