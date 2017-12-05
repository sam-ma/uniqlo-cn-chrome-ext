if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'common'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'common'.");
}
var common = function (_, Kotlin) {
  'use strict';
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  function Action() {
    Action_instance = this;
    this.CLICKED_BROWSER_ACTION = 'clicked_browser_action';
    this.SEARCH_ITEM_ACTION = 'search_item_action';
    this.DISPLAY_SEARCH_RESULT_ACTION = 'display_search_result_action';
  }
  Action.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Action',
    interfaces: []
  };
  var Action_instance = null;
  function Action_getInstance() {
    if (Action_instance === null) {
      new Action();
    }
    return Action_instance;
  }
  function Const() {
    Const_instance = this;
    this.ITEM_CODE_PREFIX = 'ITEM CODE: ';
    this.UQ_PREFIX = 'UQ';
  }
  Const.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Const',
    interfaces: []
  };
  var Const_instance = null;
  function Const_getInstance() {
    if (Const_instance === null) {
      new Const();
    }
    return Const_instance;
  }
  function HttpResponseData() {
  }
  HttpResponseData.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'HttpResponseData',
    interfaces: []
  };
  function CurrencyRate(base, symbol, rate) {
    this.base = base;
    this.symbol = symbol;
    this.rate = rate;
  }
  CurrencyRate.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CurrencyRate',
    interfaces: []
  };
  CurrencyRate.prototype.component1 = function () {
    return this.base;
  };
  CurrencyRate.prototype.component2 = function () {
    return this.symbol;
  };
  CurrencyRate.prototype.component3 = function () {
    return this.rate;
  };
  CurrencyRate.prototype.copy_8uggh2$ = function (base, symbol, rate) {
    return new CurrencyRate(base === void 0 ? this.base : base, symbol === void 0 ? this.symbol : symbol, rate === void 0 ? this.rate : rate);
  };
  CurrencyRate.prototype.toString = function () {
    return 'CurrencyRate(base=' + Kotlin.toString(this.base) + (', symbol=' + Kotlin.toString(this.symbol)) + (', rate=' + Kotlin.toString(this.rate)) + ')';
  };
  CurrencyRate.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.base) | 0;
    result = result * 31 + Kotlin.hashCode(this.symbol) | 0;
    result = result * 31 + Kotlin.hashCode(this.rate) | 0;
    return result;
  };
  CurrencyRate.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.base, other.base) && Kotlin.equals(this.symbol, other.symbol) && Kotlin.equals(this.rate, other.rate)))));
  };
  function Item(itemCode, title, price, link) {
    this.itemCode = itemCode;
    this.title = title;
    this.price = price;
    this.link = link;
  }
  Item.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Item',
    interfaces: []
  };
  Item.prototype.component1 = function () {
    return this.itemCode;
  };
  Item.prototype.component2 = function () {
    return this.title;
  };
  Item.prototype.component3 = function () {
    return this.price;
  };
  Item.prototype.component4 = function () {
    return this.link;
  };
  Item.prototype.copy_w74nik$ = function (itemCode, title, price, link) {
    return new Item(itemCode === void 0 ? this.itemCode : itemCode, title === void 0 ? this.title : title, price === void 0 ? this.price : price, link === void 0 ? this.link : link);
  };
  Item.prototype.toString = function () {
    return 'Item(itemCode=' + Kotlin.toString(this.itemCode) + (', title=' + Kotlin.toString(this.title)) + (', price=' + Kotlin.toString(this.price)) + (', link=' + Kotlin.toString(this.link)) + ')';
  };
  Item.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.itemCode) | 0;
    result = result * 31 + Kotlin.hashCode(this.title) | 0;
    result = result * 31 + Kotlin.hashCode(this.price) | 0;
    result = result * 31 + Kotlin.hashCode(this.link) | 0;
    return result;
  };
  Item.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.itemCode, other.itemCode) && Kotlin.equals(this.title, other.title) && Kotlin.equals(this.price, other.price) && Kotlin.equals(this.link, other.link)))));
  };
  function SearchResponse(items) {
    this.items = items;
  }
  SearchResponse.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SearchResponse',
    interfaces: [HttpResponseData]
  };
  SearchResponse.prototype.component1 = function () {
    return this.items;
  };
  SearchResponse.prototype.copy_ndei6v$ = function (items) {
    return new SearchResponse(items === void 0 ? this.items : items);
  };
  SearchResponse.prototype.toString = function () {
    return 'SearchResponse(items=' + Kotlin.toString(this.items) + ')';
  };
  SearchResponse.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.items) | 0;
    return result;
  };
  SearchResponse.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.items, other.items))));
  };
  var package$testExt = _.testExt || (_.testExt = {});
  var package$common = package$testExt.common || (package$testExt.common = {});
  Object.defineProperty(package$common, 'Action', {
    get: Action_getInstance
  });
  Object.defineProperty(package$common, 'Const', {
    get: Const_getInstance
  });
  var package$testext = _.testext || (_.testext = {});
  var package$model = package$testext.model || (package$testext.model = {});
  package$model.HttpResponseData = HttpResponseData;
  package$model.CurrencyRate = CurrencyRate;
  package$model.Item = Item;
  package$model.SearchResponse = SearchResponse;
  Kotlin.defineModule('common', _);
  return _;
}(typeof common === 'undefined' ? {} : common, kotlin);

//# sourceMappingURL=common.js.map
