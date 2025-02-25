import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Category, Product } from '../api';
import { ActivatedRoute } from '@angular/router';
import {
  loadProductAction,
  navigateToProductList,
  saveProduct,
} from '../state/product/product.action';
import { AsyncPipe, NgForOf } from '@angular/common';
import {
  CategoryState,
  getCategoriesList,
} from '../state/category/category.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  editProductSelector,
  newProductSelector,
  ProductState,
} from '../state/product/product.selectors';
import { retrievedCategoryList } from '../state/category/category.action';

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
  protected _storeCategory$: Store<CategoryState> = inject(Store);
  private _storeProducts$: Store<ProductState> = inject(Store);
  private _productForm: FormGroup;
  protected categories$!: Observable<Category[]>;
  protected product$: Product = {
    idProduct: undefined,
    name: '',
    active: true,
    fragile: false,
    idCategory: 0,
    optLock: 0,
    limitMax: 0,
    limitMed: 0,
    limitMin: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this._productForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(1)],
      active: [1, Validators.required],
      fragile: [0, Validators.required],
      idCategory: [0, Validators.min(1)],
      limitMin: [0, Validators.min(0)],
      limitMed: [0, Validators.min(0)],
      limitMax: [0, Validators.min(0)],
      id: [],
      optLock: [],
    });
    this._storeCategory$.dispatch(retrievedCategoryList());
    this.categories$ = this._storeCategory$.select(getCategoriesList);
  }

  backToProducts() {
    this._storeProducts$.dispatch(navigateToProductList());
  }

  save() {
    const updatedProduct: Product = {
      ...this.product$,
      name: this._productForm.value.name,
      active: this._productForm.value.active,
      idCategory: this._productForm.value.idCategory,
      idProduct: this._productForm.value.id,
      fragile: this._productForm.value.fragile,
      optLock: this._productForm.value.optLock,
      limitMed: this._productForm.value.limitMed,
      limitMax: this._productForm.value.limitMax,
      limitMin: this._productForm.value.limitMin,
    };
    if (this._productForm.value.id !== undefined) {
      this._storeProducts$.dispatch(saveProduct({ product: updatedProduct }));
    }
  }

  ngOnInit(): void {
    this._storeCategory$.select(getCategoriesList);
    const id = this.routerId;
    if (id === null) {
      this._storeProducts$.select(newProductSelector).subscribe((product) => {
        this.product$ = product;
        this._productForm = this.formBuilder.group({
          id: undefined,
          name: ['', Validators.required],
          idCategory: [0, Validators.min(1)],
          fragile: [0, Validators.required],
          limitMin: [0, Validators.min(0)],
          limitMed: [0, Validators.min(0)],
          limitMax: [0, Validators.min(0)],
          active: [true, Validators.required],
          optLock: [0],
        });
      });
    } else {
      this._storeProducts$.dispatch(loadProductAction({ id: Number(id) }));
      this._storeProducts$.select(editProductSelector).subscribe((product) => {
        this.product$ = product;
        this._productForm = this.formBuilder.group({
          id: this.product$.idProduct,
          idCategory: this.product$.idCategory,
          name: [this.product$.name, Validators.required],
          active: [this.product$.active, Validators.required],
          fragile: [this.product$.fragile, Validators.required],
          limitMin: [this.product$.limitMin, Validators.min(0)],
          limitMed: [this.product$.limitMed, Validators.min(0)],
          limitMax: [this.product$.limitMax, Validators.min(0)],
          optLock: [this.product$.optLock],
        });
      });
    }
  }

  get routerId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  get productForm(): FormGroup {
    return this._productForm;
  }
}
