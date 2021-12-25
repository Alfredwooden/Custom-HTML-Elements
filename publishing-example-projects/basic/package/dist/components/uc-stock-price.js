import { HTMLElement, h, Host, proxyCustomElement } from '@stencil/core/internal/client';
import { A as AV_API_KEY } from './global.js';
import { d as defineCustomElement$2 } from './spinner.js';

const stockPriceCss = ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:red}form input{font:inherit;color:#3b013b;padding:0.15rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background-color:#3b013b;color:white;cursor:pointer}button:hover,button:active{background-color:#750175;border-color:#750175}form button:disabled{background-color:#dddddd;border:#dddddd;color:white;cursor:not-allowed}";

let StockPrice = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.stockInputValid = false;
    this.loading = false;
  }
  stockSymbolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }
  onUserInput(event) {
    this.stockUserInput = event.target.value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    }
    else {
      this.stockInputValid = false;
    }
  }
  onFetchStockPrice(event) {
    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    this.stockSymbol = this.stockInput.value;
    // this.fetchStockPrice(stockSymbol);
  }
  componentWillLoad() {
    console.log('Component will load');
    console.log(this.stockSymbol);
  }
  componentDidLoad() {
    console.log('Component did load');
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  componentWillUpdate() {
    console.log('Component will update');
  }
  componentDidUpdate() {
    console.log('Component did update');
    // if (this.stockSymbol !== this.initialStockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }
  disconnectedCallback() {
    console.log('Component did unload');
  }
  onStockSymbolSelected(event) {
    console.log('Stock symbol selected: ' + event.detail);
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }
  fetchStockPrice(stockSymbol) {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
      if (res.status !== 200) {
        throw new Error('Invalid!');
      }
      return res.json();
    })
      .then(parseResponse => {
      if (!parseResponse['Global Quote']['05. price']) {
        throw new Error('Invalid symbol');
      }
      this.error = null;
      this.fetchedPrice = +parseResponse['Global Quote']['05. price'];
      this.loading = false;
    })
      .catch(err => {
      this.error = err.message;
      this.fetchedPrice = null;
      this.loading = false;
    });
  }
  hostData() {
    return { class: this.error ? 'error' : '' };
  }
  __stencil_render() {
    let dataContent = h("p", null, "Please enter a symbol!");
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (this.fetchedPrice) {
      dataContent = h("p", null, "Price: $", this.fetchedPrice);
    }
    if (this.loading) {
      dataContent = h("uc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
      h("div", null, dataContent)
    ];
  }
  get el() { return this; }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  static get style() { return stockPriceCss; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
StockPrice = /*@__PURE__*/ proxyCustomElement(StockPrice, [1, "uc-stock-price", {
    "stockSymbol": [1537, "stock-symbol"],
    "fetchedPrice": [32],
    "stockUserInput": [32],
    "stockInputValid": [32],
    "error": [32],
    "loading": [32]
  }, [[16, "ucSymbolSelected", "onStockSymbolSelected"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["uc-stock-price", "uc-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "uc-stock-price":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, StockPrice);
      }
      break;
    case "uc-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const UcStockPrice = StockPrice;
const defineCustomElement = defineCustomElement$1;

export { UcStockPrice, defineCustomElement };
