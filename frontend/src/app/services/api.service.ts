import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CategoriesService,
  Category,
  ConsumeProduct,
  DictionaryService,
  ExpiredReportData,
  InventoriesService,
  Inventory,
  InventoryReportData,
  Item,
  LastUsedData,
  Product,
  ProductsService,
  Property,
  PropertyService,
  ReportService,
  ResponseId,
  Shopping,
  ShoppingService,
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
  private shoppingService: ShoppingService = inject(ShoppingService);
  private dictionaryService: DictionaryService = inject(DictionaryService);
  private reportService: ReportService = inject(ReportService);

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

  getInventory(inventoryId: number): Observable<Inventory> {
    return this.inventoriesService.getInventory(inventoryId);
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

  getProduct(productId: number): Observable<Product> {
    return this.productService.getProduct(productId);
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

  getProperty(idUser: number): Observable<Property> {
    return this.propertyService.getProperty(idUser);
  }

  updateProperty(property: Property): Observable<ResponseId> {
    return this.propertyService.updateProperty(property.idUser, property);
  }

  createProperty(property: Property): Observable<ResponseId> {
    return this.propertyService.updateProperty(property.idUser, property);
  }

  getShoppingList(): Observable<Shopping[]> {
    return this.shoppingService.getAllShopping();
  }

  deleteShopping(idShopping: number): Observable<any> {
    return this.shoppingService.deleteShopping(idShopping);
  }

  getItemsWithoutInventory(): Observable<Item[]> {
    return this.dictionaryService.itemsWithoutInventory();
  }

  getConsumeProductListInventoryCategoryProduct(
    idInventory: number,
    idCategory: number,
    idProduct: number
  ): Observable<ConsumeProduct[]> {
    return this.dictionaryService.getConsumeProductListInventoryCategoryProduct(
      idInventory,
      idCategory,
      idProduct
    );
  }

  getConsumeProductListInventoryCategory(
    idInventory: number,
    idCategory: number
  ): Observable<ConsumeProduct[]> {
    return this.dictionaryService.getConsumeProductListInventoryCategory(
      idInventory,
      idCategory
    );
  }

  getExpiredInventoryReportData(
    idInventory: number
  ): Observable<ExpiredReportData[]> {
    return this.reportService.getExpiredInventoryReportData(idInventory);
  }

  getInventoryReportData(
    idInventory: number
  ): Observable<InventoryReportData[]> {
    return this.reportService.getInventoryReportData(idInventory);
  }

  getLastUsedInventoryReportData(
    idInventory: number
  ): Observable<LastUsedData[]> {
    return this.reportService.getLastUsedInventoryReportData(idInventory);
  }
}
