import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DecimalPipe, NgForOf, NgStyle } from '@angular/common';
import { Category, Inventory, Product, Property } from '../api';
import {
  BsDatepickerConfig,
  BsDatepickerDirective,
} from 'ngx-bootstrap/datepicker';
import { ConsumeProducts } from '../../objects/consumeProducts';

@Component({
  selector: 'app-consume-product',
  imports: [
    FormsModule,
    TranslatePipe,
    DecimalPipe,
    NgForOf,
    NgStyle,
    BsDatepickerDirective,
  ],
  templateUrl: './consume-product.component.html',
  styleUrl: './consume-product.component.css',
})
export class ConsumeProductComponent {
  public filter = { idProduct: 0, idCategory: 0, idInventory: 0 };
  public inventories: Inventory[] = [];
  public categories: Category[] = [];
  public products: Product[] = [];
  public consumeProducts: ConsumeProducts[] = [];
  public properties: Property = { idProperty: 0, idUser: 0 };
  public rowToConsume: any = {
    idItem: 0,
    sliderMin: 0,
    used: 0,
    endDate: '',
    productName: '',
  };
  public consumeDate: Date | undefined = undefined;
  public consumeDatePickerOptions: BsDatepickerConfig | undefined;
  @ViewChild('dateInput') public dateInput!: ElementRef;
  private allProducts: Product[] = [];
  private progress: number = 0;

  consumeProduct() {}

  addDay(number: number) {}

  currentDate() {}

  onChangeConsumeDate($event: any) {}

  updateFilterProducts($event: Event) {}

  updateFilterInventory($event: Event) {}

  updateFilterCategories($event: Event) {}

  expired(validDate?: string): string {
    return '';
  }

  selectProductToConsume(row: ConsumeProducts) {}

  addToShopping(row: ConsumeProducts) {}
}
