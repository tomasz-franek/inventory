import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CategoriesService,
  Category,
  InventoriesService,
  Inventory,
  Product,
  ProductsService,
  Property,
  PropertyService,
  ResponseId,
  Storage,
  StoragesService,
  Unit,
  UnitDefault,
  UnitsService,
} from '../api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private categoriesService: CategoriesService = inject(CategoriesService);
  private inventoriesService: InventoriesService = inject(InventoriesService);
  private productService: ProductsService = inject(ProductsService);
  private storagesService: StoragesService = inject(StoragesService);
  private unitsService: UnitsService = inject(UnitsService);
  private propertyService: PropertyService = inject(PropertyService);

  constructor() {}

  getCategories(): Observable<Category[]> {
    return this.categoriesService.getAllCategories();
  }

  getCategory(categoryId: number): Observable<Category> {
    return this.categoriesService.getCategory(categoryId);
  }

  updateCategory(idCategory: number, category: Category): Observable<Category> {
    return this.categoriesService.updateCategory(idCategory, category);
  }

  createCategory(category: Category): Observable<ResponseId> {
    return this.categoriesService.saveCategory(category);
  }

  getInventories(): Observable<Inventory[]> {
    return this.inventoriesService.getAllInventories();
  }

  createInventory(inventory: Inventory): Observable<ResponseId> {
    return this.inventoriesService.saveInventory(inventory);
  }

  updateInventory(
    idInventory: number,
    inventory: Inventory
  ): Observable<ResponseId> {
    return this.inventoriesService.updateInventory(idInventory, inventory);
  }

  getProducts(): Observable<Product[]> {
    return this.productService.getAllProducts();
  }

  createProduct(product: Product): Observable<ResponseId> {
    return this.productService.saveProduct(product);
  }

  updateProduct(idProduct: number, product: Product): Observable<ResponseId> {
    return this.productService.updateProduct(idProduct, product);
  }

  getStorages(): Observable<Storage[]> {
    return this.storagesService.getAllStorages();
  }

  createStorage(storage: Storage): Observable<ResponseId> {
    return this.storagesService.saveStorage(storage);
  }

  updateStorage(idStorage: number, storage: Storage): Observable<ResponseId> {
    return this.storagesService.updateStorage(idStorage, storage);
  }

  getUnits(): Observable<Unit[]> {
    return this.unitsService.getAllUnits();
  }

  getDefaultUnits(): Observable<UnitDefault[]> {
    return this.unitsService.getAllUnitDefaults();
  }

  getUnit(idUnit: number): Observable<Unit> {
    return this.unitsService.getUnit(idUnit);
  }

  getProperty(idUnit: number): Observable<Property> {
    return this.propertyService.getProperty(idUnit);
  }
}
