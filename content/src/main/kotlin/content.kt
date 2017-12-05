package testext.content

import jQuery
import testExt.common.Action
import testExt.common.Const
import testext.model.SearchResponse
import kotlin.js.json

fun main(args: Array<String>) {
    console.log("content script started ... ")

    chrome.runtime.onMessage.addListener(
         { request, _, _ ->
             when (request.asDynamic()["message"]) {
                 Action.CLICKED_BROWSER_ACTION -> {
                     //
                     if (jQuery(`object` = "#J_StrPrice_fromAU").length.toInt() > 0) {
                         return@addListener
                     } else {
                         jQuery(`object` = "<li id='J_StrPriceModBox_AU' class='detail-price clearfix'><span>澳大利亚：</span><strong id='J_StrPrice_fromAU'>Loading ...</strong></li>").insertAfter("#J_StrPriceModBox")
                     }
                     // screen scrape from uniqlo CN site
                     val regex = Regex("\\s*(UQ)?\\d{6,}")
                     val attributes = jQuery(`object` = "#attributes li").filter { index, element -> regex.matches(element.getAttribute("title")!!) }
                     val itemCode = attributes.eq(0).attr("title").trim().removePrefix(Const.UQ_PREFIX)
                     val price = jQuery(`object` = "#J_StrPrice").text().toDouble()
                     // send the search job to background script
                     chrome.runtime.sendMessage(json(
                             "message" to Action.SEARCH_ITEM_ACTION,
                             "code" to itemCode,
                             "price" to price
                     ))
                 }
                 Action.DISPLAY_SEARCH_RESULT_ACTION -> {
                     val convertedPrice = request.asDynamic()["convertedPrice"].toFixed(2)
                     console.log(convertedPrice)
                     val searchResponse = JSON.parse<SearchResponse>(request.asDynamic()["result"])
                     console.log(searchResponse)
                     if (searchResponse.items.size > 0) {
                         jQuery(`object` = "#J_StrPrice").append("(AUD$${convertedPrice})")
                         jQuery(`object` = "#J_StrPrice_fromAU").html("<a href='${searchResponse.items[0].link}'>${searchResponse.items[0].price}</a>")
                     }
                 }
             }
        }
    )
}

external fun alert(message: Any?)