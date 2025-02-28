import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { Item, Property, Shopping, Unit } from '../api';
import { CalendarOptions } from '@fullcalendar/core';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ItemState } from '../state/item/item.selectors';
import {
  getShoppingList,
  ShoppingState,
} from '../state/shopping/shopping.selectors';
import {
  deleteShopping,
  navigateToShoppingEdit,
  navigateToShoppingNew,
  retrievedShoppingList,
} from '../state/shopping/shopping.action';

@Component({
  selector: 'app-dashboard',
  imports: [
    FullCalendarModule,
    TranslatePipe,
    NgForOf,
    DecimalPipe,
    NgIf,
    AsyncPipe,
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public items$!: Observable<Item[]>;
  public shopping$!: Observable<Shopping[]>;
  private _storeShopping$: Store<ShoppingState> = inject(Store);
  private _storeItem$: Store<ItemState> = inject(Store);
  public events: any = [];
  public units!: Unit[];
  private properties: Property = { idProperty: 0, idUser: 0 };
  public calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek',
    },
    plugins: [dayGridPlugin],
    locale: this.properties.language,
    firstDay: 1,
    initialView: 'dayGridMonth',
  };
  private _item: any = { price: 0 };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this._storeShopping$.dispatch(retrievedShoppingList());
    this.shopping$ = this._storeShopping$.select(getShoppingList);
  }

  addShopping() {
    this._storeShopping$.dispatch(navigateToShoppingNew());
  }

  confirmDelete(idShopping: number | undefined) {
    if (idShopping != undefined) {
      this._storeShopping$.dispatch(deleteShopping({ idShopping }));
      this._storeShopping$.dispatch(retrievedShoppingList());
      this.shopping$ = this._storeShopping$.select(getShoppingList);
    }
  }

  editShopping(shopping: Shopping) {
    this._storeShopping$.dispatch(navigateToShoppingEdit({ shopping }));
  }

  unit(item: Shopping) {
    return '';
  }
}
