import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
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

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this._formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      active: [1, Validators.required],
      fragile: [0, Validators.required],
      idCategory: [0, [Validators.required, Validators.min(1)]],
      limitMin: ['', [Validators.required, Validators.min(1)]],
      limitMed: ['', [Validators.required, Validators.min(1)]],
      limitMax: ['', [Validators.required, Validators.min(1)]],
      id: undefined,
      optLock: 0,
    });
    this._storeCategory$.dispatch(retrieveCategoryList());
    this.categories$ = this._storeCategory$.select(getCategoriesList);
    this._formGroup.setValidators(this.limitsValidator());
  }

  public limitsValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      const controlMin = this._formGroup.controls['limitMin'].value;
      const controlMed = this._formGroup.controls['limitMed'].value;
      const controlMax = this._formGroup.controls['limitMax'].value;
      if (controlMin > controlMed) {
        return { valueWrong: true };
      }
      if (controlMed > controlMax) {
        return { valueWrong: true };
      }
      return null;
    };
  }
  backToProducts() {
    this._storeProduct$.dispatch(navigateToProductList());
  }

  save() {
    const updatedProduct: Product = {
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
    this._storeProduct$.dispatch(saveProduct({ product: updatedProduct }));
  }

  ngOnInit(): void {
    this._storeCategory$.select(getCategoriesList);
    const id = this.routerId;
    if (id === null) {
      this._storeProduct$.select(newProductSelector).subscribe(() => {
        this._formGroup.patchValue({
          id: undefined,
          name: '',
          idCategory: 0,
          fragile: 0,
          limitMin: 0,
          limitMed: 0,
          limitMax: 0,
          active: true,
          optLock: 0,
        });
      });
    } else {
      this._storeProduct$.dispatch(loadProductAction({ id: Number(id) }));
      this._storeProduct$.select(editProductSelector).subscribe((product) => {
        this._formGroup = this.formBuilder.group({
          id: product.idProduct,
          idCategory: product.idCategory,
          name: product.name,
          active: product.active,
          fragile: product.fragile,
          limitMin: product.limitMin,
          limitMed: product.limitMed,
          limitMax: product.limitMax,
          optLock: product.optLock,
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
