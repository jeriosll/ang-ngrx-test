import { ProductState } from "../reducer/product.reducer";
import { Product } from '../../model/product.model';
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { selectAll, selectIds } from "../reducer/product.reducer";

export const productFeatureSelector = createFeatureSelector<ProductState>('products');

export const getAllProducts = createSelector(
    productFeatureSelector,
    selectAll
);

export const areProductsLoaded = createSelector(
    productFeatureSelector,
    state => state.productsLoaded
);