import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../model/product.model';
import { createProduct } from '../../store/action/product.actions';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmit(submittedForm : any) {
    console.log('form', submittedForm.value);

    if(submittedForm.invalid) {
      return;
    }

    const product: Product = {id: uuidv4(), name: submittedForm.value.name, description: submittedForm.value.description }
    this.store.dispatch(createProduct({product}));
  }
}
