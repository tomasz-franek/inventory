import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoriesService, Category, InventoriesService, Inventory, Product, ProductsService, ResponseId} from '../api';

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private categoriesService: CategoriesService = inject(CategoriesService);
  private inventoriesService: InventoriesService = inject(InventoriesService);
  private productService: ProductsService = inject(ProductsService);

  constructor() {
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesService.getAllCategories();
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.categoriesService.updateCategory(id, category);
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

  updateInventory(id: number, inventory: Inventory): Observable<ResponseId> {
    return this.inventoriesService.updateInventory(id, inventory);
  }

  getProducts(): Observable<Product[]> {
    return this.productService.getAllProducts();
  }

  createProduct(product: Product): Observable<ResponseId> {
    return this.productService.saveProduct(product);
  }

  updateProduct(id: number, product: Product): Observable<ResponseId> {
    return this.productService.updateProduct(id, product);
  }
}
