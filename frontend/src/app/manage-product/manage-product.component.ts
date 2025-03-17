import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Inventory, StorageItem } from '../api';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  filterInventories,
  InventoryState,
} from '../state/inventory/inventory.selectors';
import { retrieveInventoryList } from '../state/inventory/inventory.action';
import {
  getItemsWithInventoryList,
  ItemState,
} from '../state/item/item.selectors';
import {
  retrieveItemsWithoutInventory,
  updateItemByInventory,
} from '../state/item/item.action';

@Component({
  selector: 'app-manage-product',
  imports: [
    TranslatePipe,
    FormsModule,
    NgForOf,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css',
})
export class ManageProductComponent implements OnInit {
  public inventories$!: Observable<Inventory[]>;
  private _storeInventory$: Store<InventoryState> = inject(Store);
  private _storeItem$: Store<ItemState> = inject(Store);
  public items$!: Observable<StorageItem[]>;
  public inventory: any = {};
  private _formGroup: FormGroup;

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      idInventory: [0, [Validators.required, Validators.min(1)]],
      selectedItems: [0, [Validators.required, Validators.min(1)]],
      maxSelected: 0,
      ids: [],
    });
  }

  ngOnInit() {
    this._storeInventory$.dispatch(retrieveInventoryList());
    this.inventories$ = this._storeInventory$.select(filterInventories);
    this._storeItem$.dispatch(retrieveItemsWithoutInventory());
    this.items$ = this._storeItem$.select(getItemsWithInventoryList);
  }

  addAllToInventory() {
    this.items$.subscribe((data) => {
      data.forEach((element) => {
        if (element.idStorage != undefined) {
          element.ids.forEach((idItem) => {
            this.updateInventoryNumber(
              idItem,
              this._formGroup.value.idInventory
            );
          });
        }
      });
    });
    this.ngOnInit();
  }

  selectItemRow(row: StorageItem) {
    this._formGroup.patchValue({
      selectedItems: 0,
      maxSelected: row.ids.length,
      ids: row.ids,
    });
  }

  backToDashboard() {
    this._formGroup.patchValue({ selectedItems: 0, maxSelected: 0 });
  }

  addItemToInventory() {
    if (
      this._formGroup.value.idInventory > 0 &&
      this._formGroup.value.selectedItems <=
        this._formGroup.value.maxSelected &&
      this._formGroup.value.selectedItems > 0
    ) {
      for (let i = 0; i < this._formGroup.value.selectedItems; i++) {
        this.updateInventoryNumber(
          this._formGroup.value.ids[i],
          this.formGroup.value.idInventory
        );
      }

      this.ngOnInit();
    }
  }

  updateInventoryNumber(idItem: number, idInventory: number) {
    this._storeItem$.dispatch(updateItemByInventory({ idItem, idInventory }));
  }
}
