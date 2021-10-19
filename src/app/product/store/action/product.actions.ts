import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Product } from '../../model/product.model';

export const loadProducts = createAction(
  '[Products Collection] Load Products'
);

export const productsLoaded = createAction(
  '[Products Effect] Products Loaded Successfully',
  props<{products: Product[]}>()
);

export const createProduct = createAction(
  '[Products Collection Operation] Create Product',
  props<{product: Product}>()
);

export const deleteProduct = createAction(
  '[Products Collection Operation] Delete Product',
  props<{productId: string}>()
);

export const updateProduct = createAction(
  '[Products Collection Operation] Update Product',
  props<{update: Update<Product>}>()
);

export const productActionTypes = {
  loadProducts,
  productsLoaded,
  createProduct,
  deleteProduct,
  updateProduct
};


