import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from '@angular/common';
import {Product} from '../api';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {retrievedProductList, saveProduct} from '../state/product/product.action';
import {Observable} from 'rxjs';
import {getProductsList} from '../state/product/product.selectors';

@Component({
  selector: 'app-product-list',
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;


  constructor(private store: Store,
              private router: Router,) {
  }

  addNewProduct() {
    this.router.navigate(['product-add']);
  }

  ngOnInit(): void {
    this.store.dispatch(retrievedProductList())
    this.products$ = this.store.select(getProductsList);
  }

  updateProduct(product: Product) {
    const updatedProduct: Product = {...product, name: 'Updated Product', active: 1};
    this.store.dispatch(saveProduct({product: updatedProduct}));
  }

  deleteProduct(product: Product) {
    const updatedProduct: Product = {...product, name: 'Updated Product', active: 0};
    if (updatedProduct.idProduct) {
      this.store.dispatch(saveProduct({product: updatedProduct}));
    }
  }
}
