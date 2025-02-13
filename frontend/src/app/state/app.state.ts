import {CategoryState} from './category/category.selectors';
import {InventoryState} from './inventory/inventory.selectors';
import {ProductState} from './product/product.selectors';
import {StorageState} from './storage/storage.selectors';

export interface State {
  categories: CategoryState,
  inventories: InventoryState,
  products: ProductState,
  storages: StorageState
}
