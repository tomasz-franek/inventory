import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, DecimalPipe, NgForOf, NgStyle } from '@angular/common';
import { Category, ConsumeProduct, Inventory, Product, Property } from '../api';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { Store } from '@ngrx/store';
import {
  getInventoriesList,
  InventoryState,
} from '../state/inventory/inventory.selectors';
import {
  CategoryState,
  getCategoriesList,
} from '../state/category/category.selectors';
import {
  getProductsList,
  ProductState,
} from '../state/product/product.selectors';
import { Observable } from 'rxjs';
import { retrieveInventoryList } from '../state/inventory/inventory.action';
import { retrieveCategoryList } from '../state/category/category.action';
import { retrieveProductList } from '../state/product/product.action';
import {
  retrieveConsumeProductListInventoryCategory,
  retrieveConsumeProductListInventoryCategoryProduct,
} from '../state/item/item.action';
import {
  ItemState,
  selectConsumeProductList,
} from '../state/item/item.selectors';

@Component({
  selector: 'app-consume-product',
  imports: [
    FormsModule,
    TranslatePipe,
    DecimalPipe,
    NgForOf,
    NgStyle,
    BsDatepickerDirective,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './consume-product.component.html',
  styleUrl: './consume-product.component.css',
})
export class ConsumeProductComponent implements OnInit {
  private _storeInventory$: Store<InventoryState> = inject(Store);
  private _storeCategory$: Store<CategoryState> = inject(Store);
  private _storeProduct$: Store<ProductState> = inject(Store);
  public _inventories$!: Observable<Inventory[]>;
  public _categories$!: Observable<Category[]>;
  public _products$!: Observable<Product[]>;
  private _storeItem$: Store<ItemState> = inject(Store);
  public _consumeProducts$!: Observable<ConsumeProduct[]>;
  public properties: Property = { idProperty: 0, idUser: 0, currency: '' };
  public rowToConsume: any = {
    idItem: 0,
    sliderMin: 0,
    used: 0,
    endDate: '',
    productName: '',
  };
  public consumeDate: Date | undefined = undefined;
  @ViewChild('dateInput') public dateInput!: ElementRef;
  private _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      idInventory: 0,
      idCategory: 0,
      idProduct: 0,
      consumeDate: new Date(),
      used: 0,
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  ngOnInit(): void {
    this._storeInventory$.dispatch(retrieveInventoryList());
    this._storeCategory$.dispatch(retrieveCategoryList());
    this._storeCategory$.dispatch(retrieveProductList());
    this._products$ = this._storeProduct$.select(getProductsList);
    this._categories$ = this._storeCategory$.select(getCategoriesList);
    this._inventories$ = this._storeInventory$.select(getInventoriesList);
  }

  loadConsumeProductList(): void {
    if (
      this._formGroup.value.idCategory > 0 &&
      this._formGroup.value.idInventory > 0
    ) {
      if (this._formGroup.value.idProduct > 0) {
        this._storeItem$.dispatch(
          retrieveConsumeProductListInventoryCategoryProduct({
            idInventory: this._formGroup.value.idInventory,
            idCategory: this._formGroup.value.idCategory,
            idProduct: this._formGroup.value.idProduct,
          })
        );
      } else {
        this._storeItem$.dispatch(
          retrieveConsumeProductListInventoryCategory({
            idInventory: this._formGroup.value.idInventory,
            idCategory: this._formGroup.value.idCategory,
          })
        );
      }
      this._consumeProducts$ = this._storeItem$.select(
        selectConsumeProductList
      );
    }
  }

  consumeProduct() {}

  addDay(number: number) {}

  currentDate() {}

  onChangeConsumeDate($event: Date) {
    this._formGroup.value.consumeDate = $event;
  }

  updateFilterProducts($event: any) {
    this._formGroup.value.idProduct = Number($event.target.value);
    this.loadConsumeProductList();
  }

  updateFilterInventory($event: any) {
    this._formGroup.value.idInventory = Number($event.target.value);
    this.loadConsumeProductList();
  }

  updateFilterCategories($event: any) {
    this._formGroup.value.idCategory = Number($event.target.value);
    this.loadConsumeProductList();
  }

  expired(validDate?: string): string {
    return '';
  }

  selectProductToConsume(row: ConsumeProduct) {}

  addToShopping(row: ConsumeProduct) {}
}
