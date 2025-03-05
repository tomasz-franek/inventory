import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import {
  ExpiredReportData,
  LastUsedData,
  NextDayExpiredData,
  Property,
  PurchasesData,
  Shopping,
  Unit,
} from '../api';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
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
  getExpiredProductList,
  getLastUsedList,
  getNextDaysExpiredList,
  getPurchasesData,
  ReportState,
} from '../state/report/report.selectors';
import {
  retrieveExpiredInventoryReportData,
  retrieveLastUsedReportData,
  retrieveListPurchases,
  retrieveNexDaysExpiredData,
} from '../state/report/report.action';
import {
  getUnitsList,
  selectUnitById,
  UnitState,
} from '../state/unit/unit.selectors';
import { retrieveUnitList } from '../state/unit/unit.action';
import {
  CalendarState,
  getEventsList,
} from '../state/calendar/calendar.selectors';
import { createEvent } from '../state/calendar/calendar.action';

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
  private _storeCalendar$: Store<CalendarState> = inject(Store);
  private properties: Property = { idProperty: 0, idUser: 0 };
  protected _events$!: Observable<EventInput[]>;
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
    this._events$ = this._storeCalendar$.select(getEventsList);

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
    this._storeReport$.select(getLastUsedList).subscribe((data) => {
      this.loadListLastUsed(data);
    });

    this._storeReport$.dispatch(
      retrieveListPurchases({ days: 120, idInventory: 1 })
    );
    this._storeReport$.select(getPurchasesData).subscribe((data) => {
      this.loadListPurchases(data);
    });

    this._storeReport$.dispatch(
      retrieveExpiredInventoryReportData({ idInventory: undefined })
    );
    this._storeReport$.select(getExpiredProductList).subscribe((data) => {
      this.loadListExpired(data);
    });
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

  unit(shopping: Shopping): string {
    if (!!shopping.idUnit) {
      this._storeUnit$
        .select(selectUnitById(shopping.idUnit))
        .subscribe((data: Unit | undefined) => {
          if (data != undefined) {
            let retValue = shopping.count + ' ' + data.symbol;
            console.log(retValue);
            return retValue;
          }
          return '';
        });
    }
    return '';
  }

  loadListPurchases(data: PurchasesData[]) {
    if (data) {
      data.forEach((row: PurchasesData) => {
        const event: EventInput = {
          allDay: true,
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
        };
        this._storeCalendar$.dispatch(createEvent({ event }));
      });
    }
  }

  loadListExpired(data: ExpiredReportData[]) {
    if (data) {
      data.forEach((row: ExpiredReportData) => {
        if (row.validList) {
          row.validList.forEach((element: any) => {
            const event: EventInput = {
              allDay: true,
              start: element.insertDate,
              title: element.count + ' x ' + row.productName,
              tooltip: 'Expired ' + element.count + ' x ' + row.productName,
              color: 'brown',
            };
            this._storeCalendar$.dispatch(createEvent({ event }));
          });
        }
      });
    }
  }

  loadListNextDayExpired(data: NextDayExpiredData[]) {
    if (data) {
      data.forEach((row: NextDayExpiredData) => {
        const event: EventInput = {
          allDay: true,
          start: row.validDate,
          title: '1 x ' + row.productName + ' used ' + row.used + ' %',
          tooltip:
            'Will be expired 1 x ' +
            row.productName +
            ' used ' +
            row.used +
            ' %',
          color: 'red',
        };
        this._storeCalendar$.dispatch(createEvent({ event }));
      });
    }
  }

  loadListLastUsed(data: LastUsedData[]) {
    if (data != undefined) {
      data.forEach((row: LastUsedData) => {
        const event: EventInput = {
          allDay: true,
          start: row.endDate,
          title: row.productName,
          tooltip: 'Used ' + row.productName,
          color: '#F3921A',
        };
        this._storeCalendar$.dispatch(createEvent({ event }));
      });
    }
  }
}
