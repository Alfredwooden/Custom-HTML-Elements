import { p as promiseResolve, b as bootstrapLazy } from './index-835f80cc.js';

/*
 Stencil Client Patch Browser v2.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["uc-side-drawer",[[1,"uc-side-drawer",{"mainTitle":[513,"main-title"],"opened":[1540],"showContactInfo":[32],"open":[64]}]]],["uc-spinner_3",[[1,"uc-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]],[1,"uc-spinner"]]]], options);
});
