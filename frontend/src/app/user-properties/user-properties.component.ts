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
  retrievedPropertyForUser,
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
  private _propertyForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  updateProperties() {
    const updatedProperty: Property = {
      idProperty: this._propertyForm.value.idProperty,
      idUser: this._propertyForm.value.idUser,
      language: this._propertyForm.value.language,
      currency: this._propertyForm.value.currency,
    };
    if (this._propertyForm.value.idUser !== undefined) {
      this._storeProperty$.dispatch(
        saveProperty({ property: updatedProperty })
      );
    }
  }

  get propertyForm() {
    return this._propertyForm;
  }

  ngOnInit(): void {
    this._storeProperty$.dispatch(retrievedPropertyForUser({ idUser: 1 }));

    this._propertyForm = this.formBuilder.group({
      language: ['', Validators.required],
      currency: ['', Validators.required],
      idProperty: 0,
      idUser: 0,
    });
    this._storeProperty$.select(getProperty).subscribe((property) => {
      this.propertyForm.setValue({
        language: property.language,
        currency: property.currency,
        idProperty: property.idProperty,
        idUser: property.idUser,
      });
    });
  }
}
