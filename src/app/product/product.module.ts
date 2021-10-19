import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/reducer/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effect/product.effects';
import { ProductListComponent } from './component/product-list/product-list.component';
import { CreateProductComponent } from './component/create-product/create-product.component';



@NgModule({
  declarations: [
    ProductListComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  exports: [ProductListComponent, CreateProductComponent],
  providers: [ProductService],
  bootstrap: [],
})
export class ProductModule { }
