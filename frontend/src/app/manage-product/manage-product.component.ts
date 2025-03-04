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
import { Inventory, Item } from '../api';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  getInventoriesList,
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
  public items$!: Observable<Item[]>;
  public storage: any = { selectedItems: 0, ids: [] };
  public rowIdInventory: number = 0;
  public inventory: any = {};
  private _formGroup: FormGroup;

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      idInventory: [0, Validators.required],
    });
  }

  ngOnInit() {
    this._storeInventory$.dispatch(retrieveInventoryList());
    this.inventories$ = this._storeInventory$.select(getInventoriesList);
    this._storeItem$.dispatch(retrieveItemsWithoutInventory());
    this.items$ = this._storeItem$.select(getItemsWithInventoryList);
  }

  addAllToInventory() {
    this.items$.subscribe((data) => {
      data.forEach((element) => {
        if (element.idItem != undefined) {
          this.updateInventoryNumber(
            element.idItem,
            this._formGroup.value.idInventory
          );
        }
      });
    });
  }

  selectItemRow(row: any) {
    this.storage = row;
    this.storage.selectedItems = 1;
  }

  backToDashboard() {
    this.storage = { selectedItems: 0, ids: [] };
  }

  addItemToInventory() {
    if (
      this.rowIdInventory != 0 &&
      this.storage.selectedItems >= 1 &&
      this.storage.selectedItems <= this.storage.ids.length &&
      this.storage.selectedItems > 0
    ) {
      //this.updateInventoryNumber(this.storage.ids[i], this.rowIdInventory);
      this.ngOnInit();
    }
  }

  updateInventoryNumber(idItem: number, idInventory: number) {
    this._storeItem$.dispatch(updateItemByInventory({ idItem, idInventory }));
  }
}
