if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'testExt_main'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'testExt_main'.");
}
var testExt_main = function (_, Kotlin) {
  'use strict';
  function main(args) {
    alert('Hello JavaScript!');
  }
  _.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('testExt_main', _);
  return _;
}(typeof testExt_main === 'undefined' ? {} : testExt_main, kotlin);

//# sourceMappingURL=testExt_main.js.map
