import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { MapLocatorComponent } from './map-locator/map-locator.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  
  {path:"login",component:LoginComponent},
  {path:"placed",component:PlaceOrderComponent},
  {path:"product-list",component:ProductListComponent},
  {path:"productDetail/:Id",component:ProductDetailsComponent},
  {path:"cart",component:CartComponent},
  {path:"store",component:StoreComponent},
  {path:"map-locator",component:MapLocatorComponent},
  { path: '', redirectTo: '/login', pathMatch:'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
