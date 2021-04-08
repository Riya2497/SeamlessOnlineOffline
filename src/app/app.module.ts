import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { StoreComponent } from './store/store.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import "firebase/firestore";
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import { environment } from 'src/environments/environment';
import { QRCodeModule } from 'angular2-qrcode';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapLocatorComponent } from './map-locator/map-locator.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list'
import { CommonModule } from '@angular/common';
const firebase = require("firebase");
@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    PlaceOrderComponent,
    ProductDetailsComponent,
    ProductListComponent,
    CartComponent,
    LoginComponent,
    MapLocatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    firebase.initializeApp(environment.firebaseConfig),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnQ-IeTONB3_oTf_WQYuUxSc0hDB3qXh0',
      libraries: ['places']
    }),
    QRCodeModule,
    MatSidenavModule,
    MatButtonModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
  ],
  exports: [
  	MatSidenavModule,
  	MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
