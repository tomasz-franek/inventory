import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inventory } from '../api';
import { Store } from '@ngrx/store';
import {
  navigateToInventoryEdit,
  navigateToInventoryNew,
  retrievedInventoryList,
  setActiveInventory,
} from '../state/inventory/inventory.action';
import { Observable } from 'rxjs';
import {
  filterInventories,
  getInventoriesList,
  InventoryState,
} from '../state/inventory/inventory.selectors';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-inventory-list',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css',
})
export class InventoryListComponent implements OnInit {
  private _store$: Store<InventoryState> = inject(Store);
  protected onlyActive: boolean = true;
  protected inventories$: Observable<Inventory[]> =
    this._store$.select(getInventoriesList);

  constructor() {}

  addNewInventory() {
    this._store$.dispatch(navigateToInventoryNew());
  }

  ngOnInit(): void {
    this._store$.dispatch(setActiveInventory({ active: this.onlyActive }));
    this._store$.dispatch(retrievedInventoryList());
  }

  editInventory(inventory: Inventory) {
    this._store$.dispatch(navigateToInventoryEdit({ inventory }));
  }

  filterInventories($event: any) {
    this.onlyActive = $event.target.checked;
    this._store$.dispatch(setActiveInventory({ active: this.onlyActive }));
    this.inventories$ = this._store$.select(filterInventories);
  }

  activeTextColor(active: boolean) {
    if (!active) {
      return 'text-danger';
    } else {
      return 'text';
    }
  }
}
