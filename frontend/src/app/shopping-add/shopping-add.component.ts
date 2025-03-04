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
import { Product, Storage, Unit } from '../api';
import { Store } from '@ngrx/store';
import { getUnitsList, UnitState } from '../state/unit/unit.selectors';
import { retrieveUnitList } from '../state/unit/unit.action';
import { TagInputModule } from 'ngx-chips';
import { StorageState } from '../state/storage/storage.selectors';
import {
  loadShoppingAction,
  navigateToShoppingList,
} from '../state/shopping/shopping.action';
import { saveStorage } from '../state/storage/storage.action';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { editShoppingSelector } from '../state/shopping/shopping.selectors';

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
  private _formGroup: FormGroup;
  protected _unitsCheckbox$: boolean = false;
  private _storeUnit$: Store<UnitState> = inject(Store);
  private _storeStorage$: Store<StorageState> = inject(Store);
  protected units$!: Observable<Unit[]>;
  placeholder: string;
  public tags: Product[] = [];
  public products: Product[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
    this.placeholder = this.translate.instant('ADD_TAG');
    this._formGroup = this.formBuilder.group({
      items: [0, Validators.required],
      count: 0,
      idUnit: 0,
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  navigateToShopping() {
    this._storeStorage$.dispatch(navigateToShoppingList());
  }

  saveStorage() {
    this._formGroup.value.productTags.forEach((product: Product) => {
      const newStorage: Storage = {
        idProduct: product.idProduct != undefined ? product.idProduct : 0,
        insertDate: '',
        items: this._formGroup.value.items,
        optLock: 0,
        price: 0,
        used: 0,
      };
      this._storeStorage$.dispatch(saveStorage({ storage: newStorage }));
    });
  }

  ngOnInit(): void {
    const id = this.routerId;
    if (id === null) {
      this._storeUnit$.dispatch(retrieveUnitList());
      this.units$ = this._storeUnit$.select(getUnitsList);
    } else {
      this._storeUnit$.dispatch(loadShoppingAction({ id: Number(id) }));
      this._storeUnit$.select(editShoppingSelector).subscribe((shopping) => {
        this._formGroup = this.formBuilder.group({
          items: [shopping.items, Validators.required],
          count: shopping.count,
          idUnit: shopping.idUnit,
        });
      });
    }
  }

  unitsCheckboxChange($event: any) {
    this._unitsCheckbox$ = $event.target.checked;
    if (this._unitsCheckbox$) {
      this._formGroup.get('idUnit')?.enable();
      this._formGroup.get('count')?.enable();
    } else {
      this._formGroup.get('idUnit')?.disable();
      this._formGroup.get('count')?.disable();
    }
  }

  get routerId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
