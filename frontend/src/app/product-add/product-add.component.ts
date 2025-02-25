import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Category, Product } from '../api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { saveProduct } from '../state/product/product.action';
import { AsyncPipe, NgForOf } from '@angular/common';
import { getCategoriesList } from '../state/category/category.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-add',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    FormsModule,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  protected categories$!: Observable<Category[]>;
  protected product$: Product = {
    idProduct: undefined,
    name: '',
    active: true,
    idCategory: 0,
    optLock: 0,
  };

  constructor(
    private router: Router,
    private store: Store
  ) {}

  backToProducts() {
    this.router.navigate(['products']);
  }

  save() {
    this.store.dispatch(saveProduct({ product: this.product$ }));
    this.router.navigate(['products']);
  }

  ngOnInit(): void {
    this.store.select(getCategoriesList);
  }
}
