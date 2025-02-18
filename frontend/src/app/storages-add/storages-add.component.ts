import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  Category,
  Inventory,
  Product,
  Property,
  Shopping,
  Unit,
  UnitDefault,
} from '../api';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { Price } from '../../objects/price';
import { StorageSave } from '../../objects/storageSave';
import {
  BsDatepickerConfig,
  BsDatepickerDirective,
} from 'ngx-bootstrap/datepicker';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-storages-add',
  imports: [
    TranslatePipe,
    FormsModule,
    DecimalPipe,
    NgForOf,
    BsDatepickerDirective,
    NgIf,
  ],
  providers: [provideAnimations()],
  templateUrl: './storages-add.component.html',
  styleUrl: './storages-add.component.css',
})
export class StoragesAddComponent implements OnInit {
  //public storage: Storage = {};
  public storageSave: StorageSave = new StorageSave();
  public categories: Category[] = [];
  public idCategory: number = 0;
  public products: Product[] = [];
  public productPrices: Price = new Price();
  public units: Unit[] = [];
  public unitDefault: UnitDefault = {
    idProduct: 0,
    optLock: 0,
  };
  public unitsCheckbox: boolean = false;
  public inventories: Inventory[] = [];
  public shoppingList: Shopping[] = [];
  public properties: Property = {
    currency: '',
    idProperty: 0,
    language: '',
    idUser: 0,
  };
  public saveButtonDisabled: boolean = true;
  public validEndDate: boolean = false;
  public validDate: Date | null = null;
  public insertDate: Date = new Date();
  public validDatePickerOptions: BsDatepickerConfig | undefined;
  public insertDatePickerOptions: BsDatepickerConfig | undefined;
  private allProducts: Product[] = [];
  private storages: Storage[] = [];
  private unitDefaults: UnitDefault[] = [];
  private locales = {};

  constructor() {}

  ngOnInit(): void {}

  updateProducts() {}

  filterProducts() {}

  onChangeInsertDate($event: any) {}

  onValidDateChanged($event: any) {}

  updateCheckbox() {}

  setPrice(minPrice: number) {}

  close() {}

  saveStorage(update: boolean) {}
}
