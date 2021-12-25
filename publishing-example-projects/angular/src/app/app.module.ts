import { BrowserModule } from '@angular/platform-browser';
// WEB COMPONENTS IMPORTS -> CUSTOM_ELEMENTS_SCHEMA
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // WEB COMPONENTS IMPORTS -> SCHEMAS -> CUSTOM_ELEMENTS_SCHEMA
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
