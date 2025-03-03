import { Component, inject, OnInit } from '@angular/core';
import { systemCurrencies } from '../../objects/definedValues';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  getProperty,
  PropertyState,
} from '../state/property/property.selectors';
import {
  retrievePropertyForUser,
  saveProperty,
} from '../state/property/property.action';
import { Property } from '../api';

@Component({
  selector: 'app-user-properties',
  imports: [FormsModule, TranslatePipe, NgForOf, ReactiveFormsModule],
  templateUrl: './user-properties.component.html',
  styleUrl: './user-properties.component.css',
})
export class UserPropertiesComponent implements OnInit {
  private _storeProperty$: Store<PropertyState> = inject(Store);
  public currencies = systemCurrencies;
  private _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      language: ['', Validators.required],
      currency: ['', Validators.required],
      idProperty: 0,
      idUser: 0,
    });
  }

  updateProperties() {
    const updatedProperty: Property = {
      idProperty: this._formGroup.value.idProperty,
      idUser: this._formGroup.value.idUser,
      language: this._formGroup.value.language,
      currency: this._formGroup.value.currency,
    };
    if (this._formGroup.value.idUser !== undefined) {
      this._storeProperty$.dispatch(
        saveProperty({ property: updatedProperty })
      );
    }
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  ngOnInit(): void {
    this._storeProperty$.dispatch(retrievePropertyForUser({ idUser: 1 }));

    this._storeProperty$.select(getProperty).subscribe((property) => {
      this._formGroup.setValue({
        language: property.language,
        currency: property.currency,
        idProperty: property.idProperty,
        idUser: property.idUser,
      });
    });
  }
}
