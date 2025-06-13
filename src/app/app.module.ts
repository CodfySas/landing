import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HeroComponent } from "./components/hero/hero.component";
import { AboutComponent } from "./components/about/about.component";
import { ProductsComponent } from "./components/products/products.component";
import { CustomSoftwareComponent } from "./components/custom-software/custom-software.component";
import { ContactComponent } from "./components/contact/contact.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ProductsComponent,
    CustomSoftwareComponent,
    ContactComponent,
    FooterComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
