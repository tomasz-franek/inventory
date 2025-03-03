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
import { retrieveCategoryList } from '../state/category/category.action';

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
  private _storeProduct$: Store<ProductState> = inject(Store);
  private _formGroup: FormGroup;
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
    this._formGroup = this.formBuilder.group({
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
    this._storeCategory$.dispatch(retrieveCategoryList());
    this.categories$ = this._storeCategory$.select(getCategoriesList);
  }

  backToProducts() {
    this._storeProduct$.dispatch(navigateToProductList());
  }

  save() {
    const updatedProduct: Product = {
      ...this.product$,
      name: this._formGroup.value.name,
      active: this._formGroup.value.active,
      idCategory: this._formGroup.value.idCategory,
      idProduct: this._formGroup.value.id,
      fragile: this._formGroup.value.fragile,
      optLock: this._formGroup.value.optLock,
      limitMed: this._formGroup.value.limitMed,
      limitMax: this._formGroup.value.limitMax,
      limitMin: this._formGroup.value.limitMin,
    };
    if (this._formGroup.value.id !== undefined) {
      this._storeProduct$.dispatch(saveProduct({ product: updatedProduct }));
    }
  }

  ngOnInit(): void {
    this._storeCategory$.select(getCategoriesList);
    const id = this.routerId;
    if (id === null) {
      this._storeProduct$.select(newProductSelector).subscribe((product) => {
        this.product$ = product;
        this._formGroup = this.formBuilder.group({
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
      this._storeProduct$.dispatch(loadProductAction({ id: Number(id) }));
      this._storeProduct$.select(editProductSelector).subscribe((product) => {
        this.product$ = product;
        this._formGroup = this.formBuilder.group({
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

  get formGroup(): FormGroup {
    return this._formGroup;
  }
}
