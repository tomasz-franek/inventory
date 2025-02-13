import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Product} from '../api';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Features} from '../../features';
import {retrievedProductList, saveProduct} from '../state/product/product.action';
import {ProductState} from '../state/product/product.selectors';

@Component({
  selector: 'app-product-list',
  imports: [
    NgForOf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products$: Product[] = [];


  constructor(private store: Store<ProductState>,
              private router: Router,) {
    this.store.select(Features.products).subscribe((data: any) => {
      this.products$ = data.products;
    });
  }

  addNewProduct() {
    this.router.navigate(['product-add']);
  }

  ngOnInit(): void {
    this.store.dispatch(retrievedProductList());
  }

  updateProduct(product: Product) {
    const updatedProduct: Product = {...product, name: 'Updated Product', active: 1};
    this.store.dispatch(saveProduct({product: updatedProduct}));
  }

  deleteProduct(product: Product) {
    const updatedProduct: Product = {...product, name: 'Updated Product', active: 0};
    if (updatedProduct.id) {
      this.store.dispatch(saveProduct({product: updatedProduct}));
    }
  }
}
