package testext.model

interface HttpResponseData

data class CurrencyRate(val base: String, val symbol: String, val rate: Number)
data class Item(val itemCode: String, val title: String, val price: String, val link: String)
data class SearchResponse(val items: Array<Item>) : HttpResponseData