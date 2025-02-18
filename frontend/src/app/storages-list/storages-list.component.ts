import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category, Product, Property, Storage } from '../api';
import { getStoragesList } from '../state/storage/storage.selectors';
import { getProductsList } from '../state/product/product.selectors';
import { getCategoriesList } from '../state/category/category.selectors';
import { FormsModule } from '@angular/forms';
import { StoragesFilter } from '../../objects/storagesFilter';
import { AsyncPipe, DecimalPipe, NgClass, NgForOf } from '@angular/common';
import { retrievedCategoryList } from '../state/category/category.action';
import { retrievedProductList } from '../state/product/product.action';
import { retrievedStorageList } from '../state/storage/storage.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storages-list',
  imports: [
    TranslatePipe,
    FormsModule,
    NgClass,
    DecimalPipe,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './storages-list.component.html',
  styleUrl: './storages-list.component.css',
})
export class StoragesListComponent implements OnInit {
  protected storages$!: Observable<Storage[]>;
  protected products$!: Observable<Product[]>;
  protected categories$!: Observable<Category[]>;
  protected filter$: StoragesFilter = {
    idCategory: 0,
    idProduct: 0,
    allStorages: [],
    allProducts: [],
    hideUsed: false,
  };
  protected editStore$ = { idStorage: 0, price: 0, productName: '' };
  protected properties$!: Observable<Property>;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(retrievedProductList());
    this.store.dispatch(retrievedCategoryList());
    this.store.dispatch(retrievedStorageList());
    this.storages$ = this.store.select(getStoragesList);
    this.products$ = this.store.select(getProductsList);
    this.categories$ = this.store.select(getCategoriesList);
    // this.properties = JSON.parse(localStorage.getItem('properties') || '{}') as Properties;
    // this.progress = 0;
    // this.filter.allProducts = [];
    // this.storages = [];
    // this.filter.allStorages = [];
    // this.startProgress();
    //
    // zip(
    //
    //   this.dataService.readStorages(),
    //   this.dataService.readProducts(),
    //   this.dataService.readCategories()
    // ).subscribe({
    //   next: (data) => {
    //     if (data[0].length > 0) {
    //       this.storages = data[0];
    //       this.filter.allStorages = data[0];
    //     }
    //     if (data[1].length > 0) {
    //       this.filter.allProducts = data[1];
    //       this.setProductNames();
    //     }
    //     this.updateFilterProduct(0);
    //     this.categories = data[2];
    //     this.setProductNames();
    //     this.updateFilterCategory(0);
    //   }, error: (error: HttpErrorResponse) => {
    //     this.alertService.error(error.statusText);
    //   },
    //   complete:()=>{
    //     this.completeProgress();
    //   }
    // });
  }

  add() {
    // if (this.filter$.idCategory > 0) {
    //   this.environment.category = this.categories$.find(element => element.idCategory == this.filter$.idCategory) || null;
    // }
    // if (this.filter.idProduct > 0) {
    //   this.environment.product = this.products$.find(element => element.idProduct == this.filter$.idProduct) || null;
    // }
    this.router.navigate(['storages-add']);
  }

  activeTextColor(active: boolean) {
    if (!active) {
      return 'text-danger';
    } else {
      return 'text';
    }
  }

  updateFilterProduct(event: number) {
    // this.filter.idProduct = Number(event);
    // this.storages = new StoragesPipe().transform(this.filter);
  }

  hideUsed(event: boolean) {
    // this.filter.hideUsed = event;
    // this.updateFilterProduct(this.filter.idProduct);
  }

  updateFilterCategory(event: number) {
    // let newCategory: number = Number(event);
    // if (newCategory > 0 && newCategory != this.filter.idCategory) {
    //   let product = this.filter.allProducts.find(p => p.idProduct == this.filter.idProduct && p.idCategory == newCategory);
    //   if (!product) {
    //     this.filter.idProduct = 0;
    //   }
    // }
    // this.filter.idCategory = newCategory;
    // if (this.filter.idCategory != 0) {
    //   this.products = [];
    //   this.products = this.filter.allProducts.filter(el => el.idCategory === this.filter.idCategory);
    // } else {
    //   this.products = this.filter.allProducts;
    // }
    // this.updateFilterProduct(this.filter.idProduct);
  }

  setProductNames() {
    //new StoragesPipe().setProductNames(this.filter);
  }

  editStorage(row: Storage) {
    // this.editStore.idStorage = row.idStorage;
    // this.editStore.price = row.price || 0;
    // this.editStore.productName = row.name || '';
  }

  updateStorage() {
    // if (this.editStore != null) {
    //
    //   this.dataService.updateStorage(this.editStore.idStorage, this.editStore.price)
    //     .subscribe({
    //       next: () => {
    //       },
    //       error: (error: HttpErrorResponse) => {
    //         this.alertService.error(error.statusText);
    //       },
    //       complete: () => {
    //         this.clearEditStore();
    //         this.completeProgress();
    //       }
    //     });
    // }
  }

  clearEditStore() {
    // this.editStore = {idStorage: 0, price: 0, productName: ''};
  }
}
