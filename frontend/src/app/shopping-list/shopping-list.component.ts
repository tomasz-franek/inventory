import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Property, Shopping, Unit } from '../api';
import {
  navigateToShoppingEdit,
  navigateToShoppingNew,
  retrievedShoppingList,
} from '../state/shopping/shopping.action';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  getShoppingList,
  ShoppingState,
} from '../state/shopping/shopping.selectors';
import {
  getUnitsList,
  selectUnitById,
  UnitState,
} from '../state/unit/unit.selectors';
import { retrieveUnitList } from '../state/unit/unit.action';
import { DownloadFileComponent } from '../download-file/download-file.component';

@Component({
  selector: 'app-shopping-list',
  imports: [
    NgForOf,
    TranslatePipe,
    AsyncPipe,
    DecimalPipe,
    NgIf,
    DownloadFileComponent,
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  private _storeShopping$: Store<ShoppingState> = inject(Store);
  private _storeUnit$: Store<UnitState> = inject(Store);

  public shoppingList$!: Observable<Shopping[]>;
  public units$!: Observable<Unit[]>;
  public properties: Property = {
    currency: '',
    idProperty: 0,
    language: '',
    idUser: 0,
  };

  ngOnInit(): void {
    this._storeShopping$.dispatch(retrievedShoppingList());
    this.shoppingList$ = this._storeShopping$.select(getShoppingList);
    this._storeUnit$.dispatch(retrieveUnitList());
    this.units$ = this._storeUnit$.select(getUnitsList);
  }

  addShopping() {
    this._storeShopping$.dispatch(navigateToShoppingNew());
  }

  unitName(idUnit: number | undefined): Observable<Unit | undefined> {
    if (idUnit === undefined) {
      return of(undefined);
    } else {
      return this._storeUnit$.select(selectUnitById(idUnit));
    }
  }

  edit(shopping: Shopping) {
    this._storeShopping$.dispatch(navigateToShoppingEdit({ shopping }));
  }

  deleteShopping(row: Shopping) {}
}
