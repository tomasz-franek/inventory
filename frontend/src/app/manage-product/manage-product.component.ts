import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {Inventory, Item} from '../api';

@Component({
  selector: 'app-manage-product',
  imports: [
    TranslatePipe,
    FormsModule,
    NgForOf
  ],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {
  public inventories: Inventory[] = [];
  public items: Item[] = [];
  public idInventory: number = 0;
  public storage: any = {selectedItems: 0, ids: []};
  public rowIdInventory: number = 0;
  public inventory: any = {};

  constructor() {
  }
  ngOnInit(): void {
  }

  moveCancel() {

  }

  addItemToInventory() {

  }

  selectItemRow() {

  }

  onSorted($event: any) {

  }

  addAllToInventory() {

  }


}
