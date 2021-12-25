import { HTMLElement, h, proxyCustomElement } from '@stencil/core/internal/client';

const spinnerCss = ".lds-ring{display:inline-block;position:relative;width:80px;height:80px}.lds-ring div{box-sizing:border-box;display:block;position:absolute;width:64px;height:64px;margin:8px;border:8px solid var(--color-primary, black);border-radius:50%;animation:lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;border-color:var(--color-primary, black) transparent transparent transparent}.lds-ring div:nth-child(1){animation-delay:-0.45s}.lds-ring div:nth-child(2){animation-delay:-0.3s}.lds-ring div:nth-child(3){animation-delay:-0.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

let Spinner = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h("div", { class: "lds-ring" }, h("div", null), h("div", null), h("div", null), h("div", null)));
  }
  static get style() { return spinnerCss; }
};
Spinner = /*@__PURE__*/ proxyCustomElement(Spinner, [1, "uc-spinner"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["uc-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "uc-spinner":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Spinner);
      }
      break;
  } });
}

export { Spinner as S, defineCustomElement as d };
