import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Inventory} from '../api';
import {ApiService} from '../services/api.service';
import {Store} from '@ngrx/store';
import {Features} from '../../features';
import {retrievedInventoryList, saveInventory} from '../state/inventory/inventory.action';
import {AppState} from '../state/category/category.reducer';

@Component({
  selector: 'app-inventory-list',
  imports: [
    CommonModule,
  ],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent implements OnInit {
  inventories$: Inventory[] = [];


  constructor(private apiService: ApiService,
              private store: Store<AppState>) {
    this.store.select(Features.inventories).subscribe((data:any) => {
      this.inventories$ = data.inventories;});
  }

  addNewInventory() {
    const newInventory: Inventory = {
      name: 'New Inventory',
      active: 1,
      optLock: 0
    };
    this.store.dispatch(saveInventory({inventory:newInventory}));
    this.store.dispatch(retrievedInventoryList());

  }

  ngOnInit(): void {
    this.store.dispatch(retrievedInventoryList());
  }

  updateInventory(inventory: Inventory) {
    const updatedInventory: Inventory = { ...inventory, name: 'Updated Inventory', active: 1};
    this.store.dispatch(saveInventory({ inventory:updatedInventory }));
  }

  deleteInventory(inventory: Inventory) {
    const updatedInventory: Inventory = { ...inventory, name: 'Updated Inventory', active: 0};
    if(updatedInventory.id) {
      this.store.dispatch(saveInventory({inventory:updatedInventory}));
    }
  }
}

