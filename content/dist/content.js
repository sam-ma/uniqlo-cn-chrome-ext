if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'content'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'content'.");
}
if (typeof common === 'undefined') {
  throw new Error("Error loading module 'content'. Its dependency 'common' was not found. Please, check whether 'common' is loaded prior to 'content'.");
}
var content = function (_, Kotlin, $module$common) {
  'use strict';
  var numberToInt = Kotlin.numberToInt;
  var Regex = Kotlin.kotlin.text.Regex_61zpoe$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var common = $module$common.testExt.common;
  var removePrefix = Kotlin.kotlin.text.removePrefix_gsj5wt$;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var sendMessage = chrome.runtime.sendMessage;
  var equals = Kotlin.equals;
  var Unit = Kotlin.kotlin.Unit;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  function main$lambda$lambda(closure$regex) {
    return function (index, element) {
      return closure$regex.matches_6bul2c$(ensureNotNull(element.getAttribute('title')));
    };
  }
  var throwCCE = Kotlin.throwCCE;
  var trim = Kotlin.kotlin.text.trim_gw00vp$;
  function main$lambda(request, f, f_0) {
    var tmp$;
    tmp$ = request['message'];
    if (equals(tmp$, common.Action.CLICKED_BROWSER_ACTION)) {
      if (numberToInt(jQuery('#J_StrPrice_fromAU').length) > 0) {
        return;
      }
       else {
        jQuery("<li id='J_StrPriceModBox_AU' class='detail-price clearfix'><span>\u6FB3\u5927\u5229\u4E9A\uFF1A<\/span><strong id='J_StrPrice_fromAU'>Loading ...<\/strong><\/li>").insertAfter('#J_StrPriceModBox');
      }
      var regex = Regex('\\s*(UQ)?\\d{6,}');
      var attributes = jQuery('#attributes li').filter(main$lambda$lambda(regex));
      var $receiver = attributes.eq(0).attr('title');
      var tmp$_0;
      var itemCode = removePrefix(trim(Kotlin.isCharSequence(tmp$_0 = $receiver) ? tmp$_0 : throwCCE()).toString(), common.Const.UQ_PREFIX);
      var price = toDouble(jQuery('#J_StrPrice').text());
      sendMessage(json([to('message', common.Action.SEARCH_ITEM_ACTION), to('code', itemCode), to('price', price)]));
    }
     else if (equals(tmp$, common.Action.DISPLAY_SEARCH_RESULT_ACTION)) {
      var convertedPrice = request['convertedPrice'].toFixed(2);
      console.log(convertedPrice);
      var searchResponse = JSON.parse(request['result']);
      console.log(searchResponse);
      if (searchResponse.items.length > 0) {
        jQuery('#J_StrPrice').append('(AUD' + '$' + convertedPrice + ')');
        jQuery('#J_StrPrice_fromAU').html("<a href='" + searchResponse.items[0].link + "'>" + searchResponse.items[0].price + '<\/a>');
      }
    }
    return Unit;
  }
  function main(args) {
    console.log('content script started ... ');
    chrome.runtime.onMessage.addListener(main$lambda);
  }
  var get_chrome = defineInlineFunction('content.get_chrome_nz12v2$', function ($receiver) {
    return $receiver.chrome;
  });
  var set_chrome = defineInlineFunction('content.set_chrome_6gcixr$', function ($receiver, value) {
    $receiver.chrome = value;
  });
  var package$testext = _.testext || (_.testext = {});
  var package$content = package$testext.content || (package$testext.content = {});
  package$content.main_kand9s$ = main;
  _.get_chrome_nz12v2$ = get_chrome;
  _.set_chrome_6gcixr$ = set_chrome;
  main([]);
  Kotlin.defineModule('content', _);
  return _;
}(typeof content === 'undefined' ? {} : content, kotlin, common);

//# sourceMappingURL=content.js.map
