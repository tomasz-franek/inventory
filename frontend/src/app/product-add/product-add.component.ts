import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      active: new FormControl(1, [Validators.required]),
      fragile: new FormControl(0, [Validators.required]),
      idCategory: new FormControl(0, [Validators.required, Validators.min(1)]),
      limitMin: new FormControl('', [Validators.required, Validators.min(1)]),
      limitMed: new FormControl('', [Validators.required, Validators.min(1)]),
      limitMax: new FormControl('', [Validators.required, Validators.min(1)]),
      id: new FormControl(undefined, []),
      optLock: new FormControl(0, []),
    });
    this._storeCategory$.dispatch(retrieveCategoryList());
    this.categories$ = this._storeCategory$.select(getCategoriesList);
    this._formGroup.setValidators(this.limitsValidator());
  }

  public limitsValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      const controlMin = this._formGroup.get('limitMin')?.value;
      const controlMed = this._formGroup.get('limitMed')?.value;
      const controlMax = this._formGroup.get('limitMax')?.value;
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
      name: this._formGroup.get('name')?.value,
      active: this._formGroup.get('active')?.value,
      idCategory: this._formGroup.get('idCategory')?.value,
      idProduct: this._formGroup.get('id')?.value,
      fragile: this._formGroup.get('fragile')?.value,
      optLock: this._formGroup.get('optLock')?.value,
      limitMed: this._formGroup.get('limitMed')?.value,
      limitMax: this._formGroup.get('limitMax')?.value,
      limitMin: this._formGroup.get('limitMin')?.value,
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
        this._formGroup.patchValue({
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
