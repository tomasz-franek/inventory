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
  private _inventoryStore$: Store<InventoryState> = inject(Store);
  private _categoryStore$: Store<CategoryState> = inject(Store);
  private _productStore$: Store<ProductState> = inject(Store);
  public _inventories$!: Observable<Inventory[]>;
  public _categories$!: Observable<Category[]>;
  public _products$!: Observable<Product[]>;
  private _itemStore$: Store<ItemState> = inject(Store);
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
  private _consumeProductForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._consumeProductForm = this.formBuilder.group({
      idInventory: 0,
      idCategory: 0,
      idProduct: 0,
      consumeDate: new Date(),
      used: 0,
    });
  }

  get consumeProductForm(): FormGroup {
    return this._consumeProductForm;
  }

  ngOnInit(): void {
    this._inventoryStore$.dispatch(retrieveInventoryList());
    this._categoryStore$.dispatch(retrieveCategoryList());
    this._categoryStore$.dispatch(retrieveProductList());
    this._products$ = this._productStore$.select(getProductsList);
    this._categories$ = this._categoryStore$.select(getCategoriesList);
    this._inventories$ = this._inventoryStore$.select(getInventoriesList);
  }

  loadConsumeProductList(): void {
    if (
      this._consumeProductForm.value.idCategory > 0 &&
      this._consumeProductForm.value.idInventory > 0
    ) {
      if (this._consumeProductForm.value.idProduct > 0) {
        this._itemStore$.dispatch(
          retrieveConsumeProductListInventoryCategoryProduct({
            idInventory: this._consumeProductForm.value.idInventory,
            idCategory: this._consumeProductForm.value.idCategory,
            idProduct: this._consumeProductForm.value.idProduct,
          })
        );
      } else {
        this._itemStore$.dispatch(
          retrieveConsumeProductListInventoryCategory({
            idInventory: this._consumeProductForm.value.idInventory,
            idCategory: this._consumeProductForm.value.idCategory,
          })
        );
      }
      this._consumeProducts$ = this._itemStore$.select(
        selectConsumeProductList
      );
    }
  }

  consumeProduct() {}

  addDay(number: number) {}

  currentDate() {}

  onChangeConsumeDate($event: Date) {
    this._consumeProductForm.value.consumeDate = $event;
  }

  updateFilterProducts($event: any) {
    this._consumeProductForm.value.idProduct = Number($event.target.value);
    this.loadConsumeProductList();
  }

  updateFilterInventory($event: any) {
    debugger;
    this._consumeProductForm.value.idInventory = Number($event.target.value);
    this.loadConsumeProductList();
  }

  updateFilterCategories($event: any) {
    this._consumeProductForm.value.idCategory = Number($event.target.value);
    this.loadConsumeProductList();
  }

  expired(validDate?: string): string {
    return '';
  }

  selectProductToConsume(row: ConsumeProduct) {}

  addToShopping(row: ConsumeProduct) {}
}
