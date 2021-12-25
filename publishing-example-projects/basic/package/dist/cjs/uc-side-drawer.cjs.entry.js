'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-11fc3e5d.js');

const sideDrawerCss = "header{padding:1rem;background-color:black;position:relative}header h1{color:white;font-size:1.5rem;margin:0}aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;background-color:#f9f9f9;box-shadow:0 2px 8px rgba(0, 0, 0, 0.26);transition:all 0.3s ease-out;z-index:100}:host([opened]) aside{left:0}header button{position:absolute;top:0;right:0;padding:1rem;color:white;background-color:transparent;font-size:1.5rem;border:none;cursor:pointer}header button:focus{outline:none}#tabs{display:flex;justify-content:center;width:100%;margin:1rem 0}#tabs button{justify-content:center;width:30%;background-color:white;color:black;text-align:center;border:1px solid black;font:inherit;padding:0.15rem 0}#tabs button.active,#tabs button:hover,#tabs button:active{background-color:black;color:white;cursor:pointer}#tabs button:focus{outline:none}#contact-information{padding:0 1rem}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background-color:rgba(0, 0, 0, 0.75);z-index:10;opacity:0;pointer-events:none;transition:opacity 0.3s ease-out}:host([opened]) .backdrop{opacity:1;pointer-events:all}";

let SideDrawer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    let mainContent = index.h("slot", null);
    if (this.showContactInfo) {
      mainContent = (index.h("div", { id: 'contact-information' }, index.h("h2", null, "Contact information"), index.h("p", null, "You can reach us via phone or email"), index.h("ul", null, index.h("li", null, "Phone: 13123123"), index.h("li", null, "Email: ", index.h("a", { href: "mailto:something@something.com" }, "something@something.com")))));
    }
    return [
      index.h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) }),
      index.h("aside", null, index.h("header", null, index.h("h1", null, this.mainTitle), index.h("button", { onClick: this.onCloseDrawer.bind(this) }, "X")), index.h("section", { id: 'tabs' }, index.h("button", { onClick: this.onContentChange.bind(this, 'nav'), class: !this.showContactInfo ? 'active' : '' }, "Navigation"), index.h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onContentChange.bind(this, 'contact') }, "Contact")), index.h("main", null, mainContent))
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
};
SideDrawer.style = sideDrawerCss;

exports.uc_side_drawer = SideDrawer;
