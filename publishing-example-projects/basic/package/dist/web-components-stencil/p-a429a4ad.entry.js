import{r as t,h as o}from"./p-8e2c1a2a.js";let n=class{constructor(o){t(this,o),this.showContactInfo=!1}onCloseDrawer(){this.opened=!1}onContentChange(t){this.showContactInfo="contact"===t}async open(){this.opened=!0}render(){let t=o("slot",null);return this.showContactInfo&&(t=o("div",{id:"contact-information"},o("h2",null,"Contact information"),o("p",null,"You can reach us via phone or email"),o("ul",null,o("li",null,"Phone: 13123123"),o("li",null,"Email: ",o("a",{href:"mailto:something@something.com"},"something@something.com"))))),[o("div",{class:"backdrop",onClick:this.onCloseDrawer.bind(this)}),o("aside",null,o("header",null,o("h1",null,this.mainTitle),o("button",{onClick:this.onCloseDrawer.bind(this)},"X")),o("section",{id:"tabs"},o("button",{onClick:this.onContentChange.bind(this,"nav"),class:this.showContactInfo?"":"active"},"Navigation"),o("button",{class:this.showContactInfo?"active":"",onClick:this.onContentChange.bind(this,"contact")},"Contact")),o("main",null,t))]}};n.style="header{padding:1rem;background-color:black;position:relative}header h1{color:white;font-size:1.5rem;margin:0}aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;background-color:#f9f9f9;box-shadow:0 2px 8px rgba(0, 0, 0, 0.26);transition:all 0.3s ease-out;z-index:100}:host([opened]) aside{left:0}header button{position:absolute;top:0;right:0;padding:1rem;color:white;background-color:transparent;font-size:1.5rem;border:none;cursor:pointer}header button:focus{outline:none}#tabs{display:flex;justify-content:center;width:100%;margin:1rem 0}#tabs button{justify-content:center;width:30%;background-color:white;color:black;text-align:center;border:1px solid black;font:inherit;padding:0.15rem 0}#tabs button.active,#tabs button:hover,#tabs button:active{background-color:black;color:white;cursor:pointer}#tabs button:focus{outline:none}#contact-information{padding:0 1rem}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background-color:rgba(0, 0, 0, 0.75);z-index:10;opacity:0;pointer-events:none;transition:opacity 0.3s ease-out}:host([opened]) .backdrop{opacity:1;pointer-events:all}";export{n as uc_side_drawer}