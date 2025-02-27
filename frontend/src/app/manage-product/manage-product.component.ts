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
import { retrievedInventoryList } from '../state/inventory/inventory.action';
import {
  getItemsWithInventoryList,
  ItemState,
} from '../state/item/item.selectors';
import { retrievedItemsWithoutInventory } from '../state/item/item.action';

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
  private _manageProduct: FormGroup;

  get manageProduct(): FormGroup {
    return this._manageProduct;
  }

  constructor(private formBuilder: FormBuilder) {
    this._manageProduct = this.formBuilder.group({
      idInventory: [0, Validators.required],
    });
  }

  ngOnInit() {
    this._storeInventory$.dispatch(retrievedInventoryList());
    this.inventories$ = this._storeInventory$.select(getInventoriesList);
    this._storeItem$.dispatch(retrievedItemsWithoutInventory());
    this.items$ = this._storeItem$.select(getItemsWithInventoryList);
  }

  addAllToInventory() {
    // if (this.inventoryForm.value.idInventory != 0 && this.items$.size > 0) {
    //   this.inventoryForm.value.items.forEach((item) => {
    //     if (item.ids !== undefined) {
    //       item.ids.forEach((id) => {
    //         this.updateInventoryNumber(
    //           id,
    //           this.inventoryForm.value.idInventory
    //         );
    //       });
    //     }
    //   });
    this.ngOnInit();
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
      let step = 1 / this.storage.selectedItems;
      for (let i = 0; i < this.storage.selectedItems; i++) {
        this.updateInventoryNumber(
          this.storage.ids[i],
          this.rowIdInventory,
          step
        );
      }
      this.ngOnInit();
    }
  }

  updateInventoryNumber(item: number, inventory: number, _step: number = 0) {
    // this.startProgress();
    // this.dataService.updateInventoryNumber(item, inventory).subscribe({
    //   next: (data) => {
    //     if (data instanceof HttpResponse) {
    //       this.alertService.success(data.statusText);
    //     }
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.alertService.error(error.statusText);
    //   },
    //   complete: () => {
    //     this.completeProgress();
    //   },
    // });
  }

  // onSorted(event: any) {
  //   //this.sortService.sortArray(this.items, event);
  // }
}
