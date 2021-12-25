'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-11fc3e5d.js');

/*
 Stencil Client Patch Esm v2.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["uc-side-drawer.cjs",[[1,"uc-side-drawer",{"mainTitle":[513,"main-title"],"opened":[1540],"showContactInfo":[32],"open":[64]}]]],["uc-spinner_3.cjs",[[1,"uc-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]],[1,"uc-spinner"]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
