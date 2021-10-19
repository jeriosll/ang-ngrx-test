import { Component, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { productActionTypes } from '../../store/action/product.actions';
import { getAllProducts } from '../../store/selector/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products$ : Observable<Product[]> | any;

  productToBeUpdated: Product | any;

  isUpdateActivated = false;

  constructor(private productService: ProductService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products$ = this.store.select(getAllProducts);
  }

  deleteProduct(productId: string) {
    this.store.dispatch(productActionTypes.deleteProduct({productId}));
  }

  showUpdateForm(product: Product) {
    this.productToBeUpdated = {...product};
    this.isUpdateActivated = true;
  }

  hideUpdateForm() {
    this.productToBeUpdated = null;
    this.isUpdateActivated = false;
  }

  updateProduct(updateForm: any) {
    const update: Update<Product> = {
      id: this.productToBeUpdated.id,
      changes: {
        ...this.productToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(productActionTypes.updateProduct({update}));

    this.isUpdateActivated = false;
    this.productToBeUpdated = null;
  }

}
