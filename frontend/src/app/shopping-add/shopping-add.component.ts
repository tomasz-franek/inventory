import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import { Product, Shopping, Unit } from '../api';
import { Store } from '@ngrx/store';
import { getUnitsList, UnitState } from '../state/unit/unit.selectors';
import { retrieveUnitList } from '../state/unit/unit.action';
import { StorageState } from '../state/storage/storage.selectors';
import {
  loadShoppingAction,
  navigateToShoppingList,
  saveShopping,
} from '../state/shopping/shopping.action';
import { ActivatedRoute } from '@angular/router';
import { editShoppingSelector } from '../state/shopping/shopping.selectors';
import {
  filterProducts,
  ProductState,
} from '../state/product/product.selectors';
import { retrieveProductList } from '../state/product/product.action';

@Component({
  selector: 'app-shopping-add',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    AsyncPipe,
    NgForOf,
  ],
  templateUrl: './shopping-add.component.html',
  styleUrl: './shopping-add.component.css',
})
export class ShoppingAddComponent implements OnInit {
  private _formGroup: FormGroup;
  private _storeUnit$: Store<UnitState> = inject(Store);
  private _storeStorage$: Store<StorageState> = inject(Store);
  private _storeProduct$: Store<ProductState> = inject(Store);
  protected units$!: Observable<Unit[]>;
  placeholder: string;
  protected _products$!: Observable<Product[]>;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
    this.placeholder = this.translate.instant('ADD_TAG');
    this._formGroup = this.formBuilder.group({
      items: [0, [Validators.required, Validators.min(1)]],
      count: 0,
      idUnit: 0,
      unitsCheckbox: false,
      productName: '',
      idProduct: undefined,
      idShopping: undefined,
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  navigateToShopping() {
    this._storeStorage$.dispatch(navigateToShoppingList());
  }

  saveStorage() {
    if (this._formGroup.value.idProduct != null) {
      const count: number = this._formGroup.value.count;
      const idUnit: number | undefined =
        Number(this._formGroup.value.idUnit) || undefined;
      const newShopping: Shopping = {
        idProduct: Number(this._formGroup.value.idProduct),
        name: this._formGroup.value.productName,
        items: this._formGroup.value.items,
        idUnit: this._formGroup.value.unitsCheckbox ? idUnit : undefined,
        count: this._formGroup.value.unitsCheckbox ? count : 0,
        optLock: 0,
        idShopping:
          this._formGroup.value.idShopping != undefined
            ? this._formGroup.value.idShopping
            : undefined,
      };
      this._storeStorage$.dispatch(saveShopping({ shopping: newShopping }));
    }
  }

  ngOnInit(): void {
    const id = this.routerId;
    this._storeUnit$.dispatch(retrieveUnitList());
    this.units$ = this._storeUnit$.select(getUnitsList);
    this._storeProduct$.dispatch(retrieveProductList());
    this._products$ = this._storeProduct$.select(filterProducts);

    if (id === null) {
      this._formGroup.patchValue({
        items: 0,
        count: '',
        idUnit: 0,
        unitsCheckbox: false,
        idProduct: 0,
        idShopping: undefined,
      });
    } else {
      this._storeUnit$.dispatch(loadShoppingAction({ id: Number(id) }));
      this._storeUnit$.select(editShoppingSelector).subscribe((shopping) => {
        this._formGroup.patchValue({
          items: shopping.items,
          count: shopping.count,
          idUnit: shopping.idUnit,
          unitsCheckbox: shopping.idUnit != undefined && shopping.idUnit > 0,
          productName: shopping.name,
          idProduct: shopping.idProduct,
          idShopping: shopping.idShopping,
        });
        document.getElementById('idProduct')?.setAttribute('disabled', 'true');
      });
    }
    this.unitsCheckboxChange();
  }

  unitsCheckboxChange() {
    if (this._formGroup.value.unitsCheckbox) {
      this._formGroup.get('idUnit')?.enable();
      this._formGroup.get('count')?.enable();
      this._formGroup
        .get('idUnit')
        ?.setValidators([Validators.required, Validators.min(1)]);
      this._formGroup
        .get('count')
        ?.setValidators([Validators.required, Validators.min(0.0001)]);
    } else {
      this._formGroup.get('idUnit')?.disable();
      this._formGroup.get('count')?.disable();
      this._formGroup.get('idUnit')?.setValidators(null);
      this._formGroup.get('count')?.setValidators(null);
    }
    this._formGroup.get('idUnit')?.updateValueAndValidity();
    this._formGroup.get('count')?.updateValueAndValidity();
  }

  get routerId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
