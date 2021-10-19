import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CreateProductComponent } from './product/component/create-product/create-product.component';
import { ProductListComponent } from './product/component/product-list/product-list.component';
import { ProductResolver } from './product/product.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductModule } from './product/product.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

const routes = [
  {
    path: 'products',
    component: ProductListComponent,
    resolve: {
      products: ProductResolver
    }
  }, 
  {
    path: 'create-product', component: CreateProductComponent
  }, 
  {
    path: '**', redirectTo: 'products'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProductModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [ProductResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
