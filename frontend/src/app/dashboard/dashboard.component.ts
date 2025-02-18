import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { NgForOf } from '@angular/common';
import { Property, Shopping, Unit } from '../api';
import { CalendarOptions } from '@fullcalendar/core';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-dashboard',
  imports: [FullCalendarModule, TranslatePipe, NgForOf],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public items!: any[];
  public shopping!: Shopping[];
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

  addShopping() {
    this.router.navigate(['shopping-add']);
  }

  confirmDelete(idShopping: any) {}

  edit(_item: any) {}

  unit(item: Shopping) {
    return '';
  }
}
