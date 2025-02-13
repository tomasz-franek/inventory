import {Product, Storage} from '../app/api';

export class StoragesFilter {
  public idCategory: number = 0;
  public idProduct: number = 0;
  public allProducts: Product[] = [];
  public allStorages: Storage[] = [];
  public hideUsed: boolean = true;
}
