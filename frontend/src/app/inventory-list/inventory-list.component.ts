import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inventory } from '../api';
import { Store } from '@ngrx/store';
import {
  navigateToInventoryEdit,
  navigateToInventoryNew,
  retrieveInventoryList,
  setActiveInventory,
} from '../state/inventory/inventory.action';
import { Observable } from 'rxjs';
import {
  filterInventories,
  InventoryState,
} from '../state/inventory/inventory.selectors';
import { TranslatePipe } from '@ngx-translate/core';
import { ActiveColor } from '../utils/active-color';

@Component({
  selector: 'app-inventory-list',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css',
})
export class InventoryListComponent implements OnInit {
  private _storeInventory$: Store<InventoryState> = inject(Store);
  protected onlyActive: boolean = true;
  protected inventories$!: Observable<Inventory[]>;

  constructor() {}

  addNewInventory() {
    this._storeInventory$.dispatch(navigateToInventoryNew());
  }

  ngOnInit(): void {
    this._storeInventory$.dispatch(
      setActiveInventory({ active: this.onlyActive })
    );
    this._storeInventory$.dispatch(retrieveInventoryList());
    this.inventories$ = this._storeInventory$.select(filterInventories);
  }

  editInventory(inventory: Inventory) {
    this._storeInventory$.dispatch(navigateToInventoryEdit({ inventory }));
  }

  filterInventories($event: any) {
    this.onlyActive = $event.target.checked;
    this._storeInventory$.dispatch(
      setActiveInventory({ active: this.onlyActive })
    );
    this.inventories$ = this._storeInventory$.select(filterInventories);
  }

  protected readonly ActiveColor = ActiveColor;
}
