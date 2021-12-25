import { Component, h, Method, Prop, State } from '@stencil/core';
export class SideDrawer {
  constructor() {
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
      mainContent = (h("div", { id: 'contact-information' },
        h("h2", null, "Contact information"),
        h("p", null, "You can reach us via phone or email"),
        h("ul", null,
          h("li", null, "Phone: 13123123"),
          h("li", null,
            "Email: ",
            h("a", { href: "mailto:something@something.com" }, "something@something.com")))));
    }
    return [
      h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) }),
      h("aside", null,
        h("header", null,
          h("h1", null, this.mainTitle),
          h("button", { onClick: this.onCloseDrawer.bind(this) }, "X")),
        h("section", { id: 'tabs' },
          h("button", { onClick: this.onContentChange.bind(this, 'nav'), class: !this.showContactInfo ? 'active' : '' }, "Navigation"),
          h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onContentChange.bind(this, 'contact') }, "Contact")),
        h("main", null, mainContent))
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
  static get is() { return "uc-side-drawer"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./side-drawer.css"]
  }; }
  static get styleUrls() { return {
    "$": ["side-drawer.css"]
  }; }
  static get properties() { return {
    "mainTitle": {
      "type": "string",
      "mutable": false,
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
      "attribute": "main-title",
      "reflect": true
    },
    "opened": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "opened",
      "reflect": true
    }
  }; }
  static get states() { return {
    "showContactInfo": {}
  }; }
  static get methods() { return {
    "open": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
}
