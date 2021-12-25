import { HTMLElement, createEvent, h, proxyCustomElement } from '@stencil/core/internal/client';
import { A as AV_API_KEY } from './global.js';
import { d as defineCustomElement$2 } from './spinner.js';

const stockFinderCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:#3b013b;padding:0.15rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background-color:var(--color-primary, black);color:var(--color-primary-inverse, white);cursor:pointer}button:hover,button:active{background-color:var(--color-primary-highlight, grey);border-color:var(--color-primary-highlight, grey)}form button:disabled{background-color:#cccccc;border:#cccccc;color:var(--color-primary-inverse, white);cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc}li:hover,li:active{cursor:pointer;background-color:var(--color-primary, black);color:var(--color-primary-inverse, white)}";

let StockFinder = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.ucSymbolSelected = createEvent(this, "ucSymbolSelected", 7);
    this.searchResults = [];
    this.loading = false;
  }
  onFindStocks(event) {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsedRes => {
      this.searchResults = parsedRes['bestMatches'].map(match => {
        return { name: match['2. name'], symbol: match['1. symbol'] };
      });
      console.log(this.searchResults);
      this.loading = false;
    })
      .catch(err => {
      console.log(err);
      this.loading = false;
    });
  }
  onSelectSymbol(symbol) {
    this.ucSymbolSelected.emit(symbol);
  }
  render() {
    let content = (h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), " - ", result.name)))));
    if (this.loading) {
      console.log('asd');
      content = h("uc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el) }), h("button", { type: "submit" }, "Find")),
      content
    ];
  }
  static get style() { return stockFinderCss; }
};
StockFinder = /*@__PURE__*/ proxyCustomElement(StockFinder, [1, "uc-stock-finder", {
    "searchResults": [32],
    "loading": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["uc-stock-finder", "uc-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "uc-stock-finder":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, StockFinder);
      }
      break;
    case "uc-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const UcStockFinder = StockFinder;
const defineCustomElement = defineCustomElement$1;

export { UcStockFinder, defineCustomElement };
