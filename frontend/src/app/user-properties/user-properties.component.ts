import { Component } from '@angular/core';
import { systemCurrencies } from '../../objects/definedValues';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { NgForOf } from '@angular/common';
import { Property } from '../api';
import { Store } from '@ngrx/store';
import { PropertyState } from '../state/property/property.selectors';

@Component({
  selector: 'app-user-properties',
  imports: [FormsModule, TranslatePipe, NgForOf],
  templateUrl: './user-properties.component.html',
  styleUrl: './user-properties.component.css',
})
export class UserPropertiesComponent {
  properties$: Property = { idProperty: 0, idUser: 0 };
  public currencies = systemCurrencies;

  constructor(private _store: Store<PropertyState>) {}

  update() {}
}
