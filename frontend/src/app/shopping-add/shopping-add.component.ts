import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import { Product, Storage, Unit } from '../api';
import { Store } from '@ngrx/store';
import { getUnitsList, UnitState } from '../state/unit/unit.selectors';
import { retrieveUnitList } from '../state/unit/unit.action';
import { TagInputModule } from 'ngx-chips';
import { StorageState } from '../state/storage/storage.selectors';
import { navigateToShoppingList } from '../state/shopping/shopping.action';
import { saveStorage } from '../state/storage/storage.action';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-shopping-add',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    AsyncPipe,
    TagInputModule,
    NgForOf,
  ],
  animations: [provideNoopAnimations()],
  templateUrl: './shopping-add.component.html',
  styleUrl: './shopping-add.component.css',
})
export class ShoppingAddComponent implements OnInit {
  private _shoppingForm: FormGroup;
  protected _unitsCheckbox$: boolean = false;
  private _storeUnit$: Store<UnitState> = inject(Store);
  private _storeStorage$: Store<StorageState> = inject(Store);
  protected units$!: Observable<Unit[]>;
  placeholder: string;
  public tags: Product[] = [];
  public products: Product[] = [];
  private tagsArray: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.placeholder = this.translate.instant('ADD_TAG');
    this._storeUnit$.dispatch(retrieveUnitList());

    this.units$ = this._storeUnit$.select(getUnitsList);
    this.tagsArray = this.formBuilder.array(this.tags);
    this._shoppingForm = this.formBuilder.group({
      items: [0, Validators.required],
      count: 0,
      idUnit: 0,
      productTags: this.tagsArray,
    });
  }

  get shoppingForm() {
    return this._shoppingForm;
  }

  navigateToShopping() {
    this._storeStorage$.dispatch(navigateToShoppingList());
  }

  saveStorage() {
    this._shoppingForm.value.productTags.forEach((product: Product) => {
      const newStorage: Storage = {
        idProduct: product.idProduct != undefined ? product.idProduct : 0,
        insertDate: '',
        items: this._shoppingForm.value.items,
        optLock: 0,
        price: 0,
        used: 0,
      };
      this._storeStorage$.dispatch(saveStorage({ storage: newStorage }));
    });
  }

  ngOnInit(): void {
    this._storeUnit$.dispatch(retrieveUnitList());
    this.units$ = this._storeUnit$.select(getUnitsList);
  }

  unitsCheckboxChange($event: any) {
    this._unitsCheckbox$ = $event.target.checked;
    if (this._unitsCheckbox$) {
      this._shoppingForm.get('idUnit')?.enable();
      this._shoppingForm.get('count')?.enable();
    } else {
      this._shoppingForm.get('idUnit')?.disable();
      this._shoppingForm.get('count')?.disable();
    }
  }
}
