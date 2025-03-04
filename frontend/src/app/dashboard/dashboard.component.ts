import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import {
  LastUsedData,
  NextDayExpiredData,
  Property,
  PurchasesData,
  Shopping,
  Unit,
} from '../api';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
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
import {
  getLastUsedList,
  getNextDaysExpiredList,
  getPurchasesData,
  ReportState,
} from '../state/report/report.selectors';
import {
  retrieveLastUsedReportData,
  retrieveListPurchases,
  retrieveNexDaysExpiredData,
} from '../state/report/report.action';
import { getUnitsList, UnitState } from '../state/unit/unit.selectors';
import { retrieveUnitList } from '../state/unit/unit.action';

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
  public units$!: Observable<Unit[]>;
  public shopping$!: Observable<Shopping[]>;
  private _storeShopping$: Store<ShoppingState> = inject(Store);
  private _storeUnit$: Store<UnitState> = inject(Store);
  private _storeReport$: Store<ReportState> = inject(Store);
  private _events$: any = [];
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

  constructor() {}

  ngOnInit(): void {
    this._storeShopping$.dispatch(retrievedShoppingList());
    this.shopping$ = this._storeShopping$.select(getShoppingList);

    this._storeUnit$.dispatch(retrieveUnitList());
    this.units$ = this._storeUnit$.select(getUnitsList);

    this._storeReport$.dispatch(retrieveNexDaysExpiredData({ days: 180 }));
    this._storeReport$
      .select(getNextDaysExpiredList)
      .subscribe((data: NextDayExpiredData[]) => {
        this.loadListNextDayExpired(data);
      });

    this._storeReport$.dispatch(retrieveLastUsedReportData({ idInventory: 1 }));
    this._storeReport$
      .select(getLastUsedList)
      .subscribe((data: LastUsedData[]) => {
        this.loadListLastUsed(data);
      });

    this._storeReport$.dispatch(
      retrieveListPurchases({ days: 120, idInventory: 1 })
    );
    this._storeReport$
      .select(getPurchasesData)
      .subscribe((data: PurchasesData[]) => {
        this.loadListPurchases(data);
      });
    this.initCalendar();
  }

  initCalendar() {
    this.calendarOptions.events = this._events$;
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

  unit(shopping: Shopping): String {
    // if (!!shopping.idUnit) {
    //   this._storeUnit$.select(getUnitsList).subscribe((data: Unit[]) => {
    //     let selectedUnit = data.find((unit: Unit) => {
    //       return unit.idUnit === shopping.idUnit;
    //     });
    //     if (!!selectedUnit && !!selectedUnit.symbol) {
    //       return shopping.count + ' ' + selectedUnit.symbol;
    //     }
    //   });
    // }
    return '';
  }

  loadListPurchases(data: PurchasesData[]) {
    if (data) {
      data.forEach((row: PurchasesData) => {
        this._events$.push({
          start: row.insertDate,
          title: row.items + ' x ' + row.productName,
          tooltip:
            'Bought ' +
            row.productName +
            ' ' +
            row.items +
            ' x ' +
            row.price +
            ' ' +
            this.properties.currency +
            ' = ' +
            row.priceSum +
            ' ' +
            this.properties.currency,
          color: 'green',
        });
      });
    }
  }

  loadListExpired(data: NextDayExpiredData[]) {
    // if (data) {
    //   data.forEach((row: NextDayExpiredData) => {
    //     if (row.validList) {
    //       row.validList.forEach((element: any) => {
    //         this.events.push({
    //           start: element.validDate,
    //           title: element.count + ' x ' + row.name,
    //           tooltip: 'Expired ' + element.count + ' x ' + row.name,
    //           color: 'brown',
    //         });
    //       });
    //     }
    //   });
    // }
  }

  loadListNextDayExpired(data: NextDayExpiredData[]) {
    if (data) {
      data.forEach((row: NextDayExpiredData) => {
        this._events$.push({
          start: row.validDate,
          title: '1 x ' + row.productName + ' used ' + row.used + ' %',
          tooltip:
            'Will be expired 1 x ' +
            row.productName +
            ' used ' +
            row.used +
            ' %',
          color: 'red',
        });
      });
    }
  }

  loadListLastUsed(data: LastUsedData[]) {
    if (data) {
      data.forEach((row: LastUsedData) => {
        this._events$.push({
          start: row.endDate,
          title: row.productName,
          tooltip: 'Used ' + row.productName,
          color: '#F3921A',
        });
      });
    }
  }
}
