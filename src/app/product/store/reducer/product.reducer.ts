import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../../model/product.model';
import { productActionTypes, productsLoaded } from '../action/product.actions';


export const productFeatureKey = 'product';

export interface ProductState extends EntityState<Product> {
  productsLoaded: boolean;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = adapter.getInitialState({
  productsLoaded: false
});


export const productReducer = createReducer(
  initialState,

  on(productActionTypes.productsLoaded, (state, action) => {
    return adapter.setAll(
      action.products,
      {...state, productsLoaded: true}
    );
  }),

  on(productActionTypes.createProduct, (state, action) => {
    return adapter.addOne(action.product, state);
  }),

  on(productActionTypes.deleteProduct, (state, action) => {
    return adapter.removeOne(action.productId, state);
  }),

  on(productActionTypes.updateProduct, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
