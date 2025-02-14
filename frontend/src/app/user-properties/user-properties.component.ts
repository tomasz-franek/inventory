import {Component, OnInit} from '@angular/core';
import {Properties} from '../api';
import {systemCurrencies} from '../../objects/definedValues';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-user-properties',
  imports: [
    FormsModule,
    TranslatePipe,
    NgForOf
  ],
  templateUrl: './user-properties.component.html',
  styleUrl: './user-properties.component.css'
})
export class UserPropertiesComponent implements OnInit {
  public properties: Properties = {idUser: 0};
  public currencies = systemCurrencies;

  ngOnInit() {
    this.properties = JSON.parse(localStorage.getItem('properties') || '{}');
  }

  update() {

  }
}
