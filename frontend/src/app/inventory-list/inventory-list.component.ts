import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inventory } from '../api';
import { ApiService } from '../services/api.service';
import { Store } from '@ngrx/store';
import {
  retrievedInventoryList,
  saveInventory,
} from '../state/inventory/inventory.action';
import { Observable } from 'rxjs';
import {
  getInventoriesList,
  InventoryState,
} from '../state/inventory/inventory.selectors';

@Component({
  selector: 'app-inventory-list',
  imports: [CommonModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css',
})
export class InventoryListComponent implements OnInit {
  private _store$: Store = inject(Store);
  protected inventories$: Observable<Inventory[]> =
    this._store$.select(getInventoriesList);

  constructor(
    private apiService: ApiService,
    private store: Store<InventoryState>
  ) {}

  addNewInventory() {
    const newInventory: Inventory = {
      name: 'New Inventory',
      active: 1,
      optLock: 0,
    };
    this.store.dispatch(saveInventory({ inventory: newInventory }));
    this.store.dispatch(retrievedInventoryList());
  }

  ngOnInit(): void {
    this.store.dispatch(retrievedInventoryList());
  }

  updateInventory(inventory: Inventory) {
    const updatedInventory: Inventory = {
      ...inventory,
      name: 'Updated Inventory',
      active: 1,
    };
    this.store.dispatch(saveInventory({ inventory: updatedInventory }));
  }

  deleteInventory(inventory: Inventory) {
    const updatedInventory: Inventory = {
      ...inventory,
      name: 'Updated Inventory',
      active: 0,
    };
    if (updatedInventory.idInventory) {
      this.store.dispatch(saveInventory({ inventory: updatedInventory }));
    }
  }
}
