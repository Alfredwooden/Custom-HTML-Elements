import { r as registerInstance, h, c as createEvent, g as getElement, H as Host } from './index-835f80cc.js';

const spinnerCss = ".lds-ring{display:inline-block;position:relative;width:80px;height:80px}.lds-ring div{box-sizing:border-box;display:block;position:absolute;width:64px;height:64px;margin:8px;border:8px solid var(--color-primary, black);border-radius:50%;animation:lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;border-color:var(--color-primary, black) transparent transparent transparent}.lds-ring div:nth-child(1){animation-delay:-0.45s}.lds-ring div:nth-child(2){animation-delay:-0.3s}.lds-ring div:nth-child(3){animation-delay:-0.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

let Spinner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "lds-ring" }, h("div", null), h("div", null), h("div", null), h("div", null)));
  }
};
Spinner.style = spinnerCss;

const AV_API_KEY = '14BE6RO33E11BX62';

const stockFinderCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:#3b013b;padding:0.15rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background-color:var(--color-primary, black);color:var(--color-primary-inverse, white);cursor:pointer}button:hover,button:active{background-color:var(--color-primary-highlight, grey);border-color:var(--color-primary-highlight, grey)}form button:disabled{background-color:#cccccc;border:#cccccc;color:var(--color-primary-inverse, white);cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc}li:hover,li:active{cursor:pointer;background-color:var(--color-primary, black);color:var(--color-primary-inverse, white)}";

let StockFinder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
StockFinder.style = stockFinderCss;

const stockPriceCss = ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:red}form input{font:inherit;color:#3b013b;padding:0.15rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background-color:#3b013b;color:white;cursor:pointer}button:hover,button:active{background-color:#750175;border-color:#750175}form button:disabled{background-color:#dddddd;border:#dddddd;color:white;cursor:not-allowed}";

let StockPrice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
StockPrice.style = stockPriceCss;

export { Spinner as uc_spinner, StockFinder as uc_stock_finder, StockPrice as uc_stock_price };
