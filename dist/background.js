if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'background'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'background'.");
}
if (typeof common === 'undefined') {
  throw new Error("Error loading module 'background'. Its dependency 'common' was not found. Please, check whether 'common' is loaded prior to 'background'.");
}
var background = function (_, Kotlin, $module$common) {
  'use strict';
  var ensureNotNull = Kotlin.ensureNotNull;
  var common = $module$common.testExt.common;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var sendMessage = chrome.tabs.sendMessage;
  var Unit = Kotlin.kotlin.Unit;
  var throwCCE = Kotlin.throwCCE;
  var numberToDouble = Kotlin.numberToDouble;
  var take = Kotlin.kotlin.text.take_6ic1pp$;
  var CoroutineImpl = Kotlin.kotlin.coroutines.experimental.CoroutineImpl;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.experimental.intrinsics.COROUTINE_SUSPENDED;
  var getCallableRef = Kotlin.getCallableRef;
  var CurrencyRate = $module$common.testext.model.CurrencyRate;
  var Item = $module$common.testext.model.Item;
  var SearchResponse = $module$common.testext.model.SearchResponse;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var experimental = Kotlin.kotlin.coroutines.experimental;
  var Continuation = Kotlin.kotlin.coroutines.experimental.Continuation;
  var startCoroutine = Kotlin.kotlin.coroutines.experimental.startCoroutine_xtwlez$;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  function main$lambda(tab) {
    sendMessage(ensureNotNull(tab.id), json([to('message', common.Action.CLICKED_BROWSER_ACTION)]));
    return Unit;
  }
  function main$lambda$lambda(closure$price_0, closure$code_0, closure$tabId_0) {
    return function (continuation_0, suspended) {
      var instance = new Coroutine$main$lambda$lambda(closure$price_0, closure$code_0, closure$tabId_0, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$main$lambda$lambda(closure$price_0, closure$code_0, closure$tabId_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$closure$price = closure$price_0;
    this.local$closure$code = closure$code_0;
    this.local$closure$tabId = closure$tabId_0;
    this.local$convertedPrice = void 0;
  }
  Coroutine$main$lambda$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$main$lambda$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$main$lambda$lambda.prototype.constructor = Coroutine$main$lambda$lambda;
  Coroutine$main$lambda$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = getCurrencyRate('AUD', 'CNY', this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 1:
            throw this.exception_0;
          case 2:
            var rate = this.result_0;
            this.local$convertedPrice = numberToDouble(this.local$closure$price) / numberToDouble(rate.rate);
            this.state_0 = 3;
            this.result_0 = search(take(this.local$closure$code, 6), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 3:
            var searchResponse = this.result_0;
            return sendMessage(this.local$closure$tabId, json([to('message', common.Action.DISPLAY_SEARCH_RESULT_ACTION), to('convertedPrice', this.local$convertedPrice), to('result', JSON.stringify(searchResponse))])), Unit;
        }
      }
       catch (e) {
        if (this.state_0 === 1)
          throw e;
        else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function main$lambda_0(request, sender, f) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var message = typeof (tmp$ = request['message']) === 'string' ? tmp$ : throwCCE();
    var code = typeof (tmp$_0 = request['code']) === 'string' ? tmp$_0 : throwCCE();
    var price = Kotlin.isNumber(tmp$_1 = request['price']) ? tmp$_1 : throwCCE();
    var tabId = ensureNotNull((tmp$_2 = sender.tab) != null ? tmp$_2.id : null);
    console.log(message, code);
    if (message === common.Action.SEARCH_ITEM_ACTION) {
      launch(main$lambda$lambda(price, code, tabId));
    }
    return Unit;
  }
  function main(args) {
    console.log('background script started ... ');
    chrome.browserAction.onClicked.addListener(main$lambda);
    chrome.runtime.onMessage.addListener(main$lambda_0);
  }
  function getCurrencyRate(base, symbol, continuation) {
    return getAndParseResult('https://api.fixer.io/latest?base=' + base + '&symbols=' + symbol, null, getCallableRef('parseCurrencyRate', function (httpResponse) {
      return parseCurrencyRate(httpResponse);
    }), continuation);
  }
  function search(itemCode, continuation) {
    return getAndParseResult(wrapCorsProxy('http://www.uniqlo.com/au/store/catalogsearch/result/?q=' + itemCode), null, getCallableRef('parseSearchResponse', function (httpResponse) {
      return parseSearchResponse(httpResponse);
    }), continuation);
  }
  function wrapCorsProxy(url) {
    return 'https://cors-anywhere.herokuapp.com/' + url;
  }
  function parseCurrencyRate(httpResponse) {
    var jsonObj = JSON.parse(httpResponse);
    return new CurrencyRate(jsonObj.base, Object.keys(jsonObj.rates)[0], Object.values(jsonObj.rates)[0]);
  }
  function parseSearchResponse(httpResponse) {
    var jq = jQuery(httpResponse);
    var products = jq.find('#loadhere .products-grid li .product-name a');
    var product = products.eq(0);
    var link = product.attr('href');
    console.log(link);
    var title = product.text();
    console.log(title);
    var price = jq.find('#loadhere .products-grid li #product-price').eq(0).text();
    console.log(price);
    return new SearchResponse([new Item('', title, price, link)]);
  }
  function getAndParseResult(url, body, parse, continuation) {
    return requestAndParseResult('GET', url, body, parse, continuation);
  }
  function requestAndParseResult$ObjectLiteral(closure$method, closure$body) {
    this.method_g0wrnp$_0 = closure$method;
    this.body_qsqrx6$_0 = closure$body;
    this.credentials_htcaro$_0 = 'same-origin';
    this.headers_aojqvi$_0 = json([to('Accept', 'application/json')]);
  }
  Object.defineProperty(requestAndParseResult$ObjectLiteral.prototype, 'method', {
    get: function () {
      return this.method_g0wrnp$_0;
    },
    set: function (method) {
      this.method_g0wrnp$_0 = method;
    }
  });
  Object.defineProperty(requestAndParseResult$ObjectLiteral.prototype, 'body', {
    get: function () {
      return this.body_qsqrx6$_0;
    },
    set: function (body) {
      this.body_qsqrx6$_0 = body;
    }
  });
  Object.defineProperty(requestAndParseResult$ObjectLiteral.prototype, 'credentials', {
    get: function () {
      return this.credentials_htcaro$_0;
    },
    set: function (credentials) {
      this.credentials_htcaro$_0 = credentials;
    }
  });
  Object.defineProperty(requestAndParseResult$ObjectLiteral.prototype, 'headers', {
    get: function () {
      return this.headers_aojqvi$_0;
    },
    set: function (headers) {
      this.headers_aojqvi$_0 = headers;
    }
  });
  requestAndParseResult$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function requestAndParseResult(method_0, url_0, body_0, parse_0, continuation_0, suspended) {
    var instance = new Coroutine$requestAndParseResult(method_0, url_0, body_0, parse_0, continuation_0);
    if (suspended)
      return instance;
    else
      return instance.doResume(null);
  }
  function Coroutine$requestAndParseResult(method_0, url_0, body_0, parse_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$method = method_0;
    this.local$url = url_0;
    this.local$body = body_0;
    this.local$parse = parse_0;
  }
  Coroutine$requestAndParseResult.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$requestAndParseResult.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$requestAndParseResult.prototype.constructor = Coroutine$requestAndParseResult;
  Coroutine$requestAndParseResult.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = await_0(window.fetch(this.local$url, new requestAndParseResult$ObjectLiteral(this.local$method, this.local$body)), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 1:
            throw this.exception_0;
          case 2:
            var response = this.result_0;
            this.state_0 = 3;
            this.result_0 = await_0(response.text(), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 3:
            return this.local$parse(this.result_0);
        }
      }
       catch (e) {
        if (this.state_0 === 1)
          throw e;
        else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function await$lambda$lambda(closure$cont) {
    return function (value) {
      closure$cont.resume_11rb$(value);
      return Unit;
    };
  }
  function await$lambda$lambda_0(closure$cont) {
    return function (exception) {
      closure$cont.resumeWithException_tcv7n7$(exception);
      return Unit;
    };
  }
  function await$lambda(this$await) {
    return function (cont) {
      this$await.then(await$lambda$lambda(cont), await$lambda$lambda_0(cont));
      return Unit;
    };
  }
  var SafeContinuation_init = Kotlin.kotlin.coroutines.experimental.SafeContinuation_init_n4f53e$;
  function suspendCoroutine$lambda(closure$block) {
    return function (c) {
      var safe = SafeContinuation_init(c);
      closure$block(safe);
      return safe.getResult();
    };
  }
  function await_0($receiver, continuation) {
    return suspendCoroutine$lambda(await$lambda($receiver))(continuation.facade);
  }
  function async$lambda$ObjectLiteral(closure$resolve, closure$reject) {
    this.closure$resolve = closure$resolve;
    this.closure$reject = closure$reject;
  }
  Object.defineProperty(async$lambda$ObjectLiteral.prototype, 'context', {
    get: function () {
      return experimental.EmptyCoroutineContext;
    }
  });
  async$lambda$ObjectLiteral.prototype.resume_11rb$ = function (value) {
    this.closure$resolve(value);
  };
  async$lambda$ObjectLiteral.prototype.resumeWithException_tcv7n7$ = function (exception) {
    this.closure$reject(exception);
  };
  async$lambda$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: [Continuation]
  };
  function async$lambda(closure$block) {
    return function (resolve, reject) {
      startCoroutine(closure$block, new async$lambda$ObjectLiteral(resolve, reject));
      return Unit;
    };
  }
  function async(block) {
    return new Promise(async$lambda(block));
  }
  function launch$lambda(exception) {
    console.log('Failed with ' + exception);
    return Unit;
  }
  function launch(block) {
    async(block).catch(launch$lambda);
  }
  var get_chrome = defineInlineFunction('background.get_chrome_nz12v2$', function ($receiver) {
    return $receiver.chrome;
  });
  var set_chrome = defineInlineFunction('background.set_chrome_6gcixr$', function ($receiver, value) {
    $receiver.chrome = value;
  });
  var package$testext = _.testext || (_.testext = {});
  var package$background = package$testext.background || (package$testext.background = {});
  package$background.main_kand9s$ = main;
  package$background.getCurrencyRate_puj7f4$ = getCurrencyRate;
  package$background.search_61zpoe$ = search;
  package$background.getAndParseResult_8iex2c$ = getAndParseResult;
  package$background.requestAndParseResult_7af5f2$ = requestAndParseResult;
  var package$kotlinx = _.kotlinx || (_.kotlinx = {});
  var package$coroutines = package$kotlinx.coroutines || (package$kotlinx.coroutines = {});
  var package$experimental = package$coroutines.experimental || (package$coroutines.experimental = {});
  package$experimental.await_t11jrl$ = await_0;
  package$experimental.async_lnyleu$ = async;
  package$experimental.launch_g2bo5h$ = launch;
  _.get_chrome_nz12v2$ = get_chrome;
  _.set_chrome_6gcixr$ = set_chrome;
  main([]);
  Kotlin.defineModule('background', _);
  return _;
}(typeof background === 'undefined' ? {} : background, kotlin, common);

//# sourceMappingURL=background.js.map
