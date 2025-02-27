import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { Category, Product } from '../api';
import { ValidInventory } from '../../objects/validInventory';
import { DownloadFileComponent } from '../download-file/download-file.component';

@Component({
  selector: 'app-manage-inventory',
  imports: [TranslatePipe, FormsModule, NgForOf, NgIf, DownloadFileComponent],
  templateUrl: './manage-inventory.component.html',
  styleUrl: './manage-inventory.component.css',
})
export class ManageInventoryComponent {
  public filter: any = { idProduct: 0, idCategory: 0 };
  public inventory: any = [];
  public products: Product[] = [];
  public categories: Category[] = [];
  private allProducts: Product[] = [];
  private allInventory: ValidInventory[] = [];
  private progress: number = 0;

  countItems(validList: any): string {
    return '';
  }

  updateFilterProducts($event: any) {}

  updateListProducts($event: any) {}
}
