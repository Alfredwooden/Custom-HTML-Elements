import { Component, h, State, Element, Prop, Watch, Listen } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";
export class StockPrice {
  constructor() {
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
  render() {
    let dataContent = h("p", null, "Please enter a symbol!");
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (this.fetchedPrice) {
      dataContent = h("p", null,
        "Price: $",
        this.fetchedPrice);
    }
    if (this.loading) {
      dataContent = h("uc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) },
        h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), value: this.stockUserInput, onInput: this.onUserInput.bind(this) }),
        h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
      h("div", null, dataContent)
    ];
  }
  static get is() { return "uc-stock-price"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./stock-price.css"]
  }; }
  static get styleUrls() { return {
    "$": ["stock-price.css"]
  }; }
  static get properties() { return {
    "stockSymbol": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "stock-symbol",
      "reflect": true
    }
  }; }
  static get states() { return {
    "fetchedPrice": {},
    "stockUserInput": {},
    "stockInputValid": {},
    "error": {},
    "loading": {}
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "stockSymbol",
      "methodName": "stockSymbolChanged"
    }]; }
  static get listeners() { return [{
      "name": "ucSymbolSelected",
      "method": "onStockSymbolSelected",
      "target": "body",
      "capture": false,
      "passive": false
    }]; }
}
