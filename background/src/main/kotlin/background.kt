package testext.background

import jQuery
import testExt.common.Action

import kotlinx.coroutines.experimental.await
import kotlinx.coroutines.experimental.launch
import org.w3c.dom.url.*
import org.w3c.fetch.*
import testext.model.CurrencyRate
import testext.model.Item
import testext.model.SearchResponse
import kotlin.browser.*
import kotlin.js.*

fun main(args: Array<String>) {
    console.log("background script started ... ")

    // Called when the user clicks on the browser action.
    chrome.browserAction.onClicked.addListener({ tab ->
        chrome.tabs.sendMessage(tab.id!!,
                json("message" to Action.CLICKED_BROWSER_ACTION)
        )
    })

    chrome.runtime.onMessage.addListener(
        { request, sender, _ ->
            val message = request.asDynamic()["message"] as String
            val code = request.asDynamic()["code"] as String
            val price = request.asDynamic()["price"] as Number
            val tabId = sender.tab?.id!!
            console.log(message, code)
            if( message === Action.SEARCH_ITEM_ACTION ) {
                launch({
                    val rate = getCurrencyRate("AUD", "CNY")
                    val convertedPrice = price.toDouble() / rate.rate.toDouble()
                    val searchResponse = search(code.take(6))   // take the first 6 digits as item code to search
                    // send the search result back to the content script
                    chrome.tabs.sendMessage(tabId,
                            json("message" to Action.DISPLAY_SEARCH_RESULT_ACTION,
                                    "convertedPrice" to convertedPrice,
                                    "result" to JSON.stringify(searchResponse)
                            )
                    )
                })
            }
        }
    )
}

// TODO: cache the rate
suspend fun getCurrencyRate(base: String, symbol: String) : CurrencyRate =
    getAndParseResult("https://exchangeratesapi.io/api/latest?base=${base}&symbols=${symbol}", null, ::parseCurrencyRate)

suspend fun search(itemCode: String) : SearchResponse? =
    getAndParseResult(wrapCorsProxy("http://www.uniqlo.com/au/store/catalogsearch/result/?q=${itemCode}"), null, ::parseSearchResponse)

private fun wrapCorsProxy(url: String) : String = "https://cors-anywhere.herokuapp.com/${url}"

private fun parseCurrencyRate(httpResponse: dynamic) : CurrencyRate {
    val jsonObj: dynamic = JSON.parse(httpResponse)
    return CurrencyRate(jsonObj.base, js("Object").keys(jsonObj.rates)[0], js("Object").values(jsonObj.rates)[0])
}

private fun parseSearchResponse(httpResponse: dynamic) : SearchResponse? {
    val jq = jQuery(html = httpResponse)
    val products = jq.find("#loadhere .products-grid li .product-name a")
//    assert(products.length.toInt() <= 1)
    val product = products.eq(0)
    val link = product.attr("href")
    console.log(link)
    val title = product.text()
    console.log(title)
    val price = jq.find("#loadhere .products-grid li #product-price").eq(0).text()
    console.log(price)
    return SearchResponse(arrayOf(Item("", title, price, link)))
}

suspend fun <T> getAndParseResult(url: String, body: dynamic, parse: (dynamic) -> T): T =
        requestAndParseResult("GET", url, body, parse)

suspend fun <T> requestAndParseResult(method: String, url: String, body: dynamic, parse: (dynamic) -> T): T {
    val response = window.fetch(url, object: RequestInit {
        override var method: String? = method
        override var body: dynamic = body
        override var credentials: RequestCredentials? = "same-origin".asDynamic()
        override var headers: dynamic = json("Accept" to "application/json")
    }).await()
    return parse(response.text().await())
}
