import { HTMLElement, h, proxyCustomElement } from '@stencil/core/internal/client';

const sideDrawerCss = "header{padding:1rem;background-color:black;position:relative}header h1{color:white;font-size:1.5rem;margin:0}aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;background-color:#f9f9f9;box-shadow:0 2px 8px rgba(0, 0, 0, 0.26);transition:all 0.3s ease-out;z-index:100}:host([opened]) aside{left:0}header button{position:absolute;top:0;right:0;padding:1rem;color:white;background-color:transparent;font-size:1.5rem;border:none;cursor:pointer}header button:focus{outline:none}#tabs{display:flex;justify-content:center;width:100%;margin:1rem 0}#tabs button{justify-content:center;width:30%;background-color:white;color:black;text-align:center;border:1px solid black;font:inherit;padding:0.15rem 0}#tabs button.active,#tabs button:hover,#tabs button:active{background-color:black;color:white;cursor:pointer}#tabs button:focus{outline:none}#contact-information{padding:0 1rem}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background-color:rgba(0, 0, 0, 0.75);z-index:10;opacity:0;pointer-events:none;transition:opacity 0.3s ease-out}:host([opened]) .backdrop{opacity:1;pointer-events:all}";

let SideDrawer = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.showContactInfo = false;
  }
  onCloseDrawer() {
    this.opened = false;
  }
  onContentChange(content) {
    this.showContactInfo = content === 'contact';
  }
  async open() {
    this.opened = true;
  }
  render() {
    let mainContent = h("slot", null);
    if (this.showContactInfo) {
      mainContent = (h("div", { id: 'contact-information' }, h("h2", null, "Contact information"), h("p", null, "You can reach us via phone or email"), h("ul", null, h("li", null, "Phone: 13123123"), h("li", null, "Email: ", h("a", { href: "mailto:something@something.com" }, "something@something.com")))));
    }
    return [
      h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) }),
      h("aside", null, h("header", null, h("h1", null, this.mainTitle), h("button", { onClick: this.onCloseDrawer.bind(this) }, "X")), h("section", { id: 'tabs' }, h("button", { onClick: this.onContentChange.bind(this, 'nav'), class: !this.showContactInfo ? 'active' : '' }, "Navigation"), h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onContentChange.bind(this, 'contact') }, "Contact")), h("main", null, mainContent))
    ];
    // let content = null;
    // if (this.open) {
    //   content = (
    //     <aside>
    //       <header>
    //         <h1>{this.title}</h1>
    //       </header>
    //       <main>
    //         <slot />
    //       </main>
    //     </aside>
    //   );
    // }
  }
  static get style() { return sideDrawerCss; }
};
SideDrawer = /*@__PURE__*/ proxyCustomElement(SideDrawer, [1, "uc-side-drawer", {
    "mainTitle": [513, "main-title"],
    "opened": [1540],
    "showContactInfo": [32],
    "open": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["uc-side-drawer"];
  components.forEach(tagName => { switch (tagName) {
    case "uc-side-drawer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SideDrawer);
      }
      break;
  } });
}

const UcSideDrawer = SideDrawer;
const defineCustomElement = defineCustomElement$1;

export { UcSideDrawer, defineCustomElement };
