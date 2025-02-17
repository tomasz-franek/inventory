import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {Properties, Shopping, Unit} from '../api';

@Component({
  selector: 'app-shopping-prepare',
  imports: [
    NgForOf,
    TranslatePipe
  ],
  templateUrl: './shopping-prepare.component.html',
  styleUrl: './shopping-prepare.component.css'
})
export class ShoppingPrepareComponent {
  public shoppingList: Shopping[] = [];
  public units: Unit[] = [];
  public properties: Properties = {idUser: 0};
  private progress: number = 0;
  addShopping() {

  }

  unitName(idUnit: any) {
    return "";
  }

  edit(row: any) {

  }

  confirmDelete(row: any) {

  }
}
