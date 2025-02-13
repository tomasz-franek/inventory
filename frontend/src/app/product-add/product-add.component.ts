import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {Category, Product} from '../api';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {saveProduct} from '../state/product/product.action';
import {retrievedCategoryList} from '../state/category/category.action';
import {ProductState} from '../state/product/product.selectors';
import {Features} from '../../features';
import {CategoryState} from '../state/category/category.selectors';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-product-add',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    FormsModule,
    NgForOf
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {
  protected categories$: Category[] = [];
  protected product$: Product = {
    id: undefined,
    name: '',
    active: 1,
    idCategory:0,
    optLock: 0
  };

  constructor(private router: Router,
              private storeProduct: Store<ProductState>,
              private storeCategory: Store<CategoryState>) {
    this.storeCategory.select(Features.categories).subscribe((data:any) => {
      this.categories$ = data.categories;});
  }

  backToProducts() {
    this.router.navigate(['products']);
  }

  save() {
    this.storeProduct.dispatch(saveProduct({product:this.product$}));
    this.router.navigate(['products']);
  }

  ngOnInit(): void {
    this.storeCategory.dispatch(retrievedCategoryList());
  }
}
