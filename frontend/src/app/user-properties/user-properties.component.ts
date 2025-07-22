import { Component, inject, OnInit } from '@angular/core';
import { systemCurrencies } from '../../objects/definedValues';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
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
  imports: [FormsModule, TranslatePipe, ReactiveFormsModule],
  templateUrl: './user-properties.component.html',
  styleUrl: './user-properties.component.css',
})
export class UserPropertiesComponent implements OnInit {
  private _storeProperty$: Store<PropertyState> = inject(Store);
  public currencies = systemCurrencies;
  private _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      language: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      idProperty: new FormControl(0, []),
      idUser: new FormControl(0, []),
    });
  }

  updateProperties() {
    const updatedProperty: Property = {
      idProperty: this._formGroup.get('idProperty')?.value,
      idUser: this._formGroup.get('idUser')?.value,
      language: this._formGroup.get('language')?.value,
      currency: this._formGroup.get('currency')?.value,
    };
    if (this._formGroup.get('idUser')?.value !== undefined) {
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
      this._formGroup.patchValue({
        language: property.language,
        currency: property.currency,
        idProperty: property.idProperty,
        idUser: property.idUser,
      });
    });
  }
}
