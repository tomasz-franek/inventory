import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../api';
import {
  navigateToCategoryEdit,
  navigateToCategoryNew,
  retrievedCategoryList,
  setActive,
} from '../state/category/category.action';
import { CommonModule, NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import {
  CategoryState,
  filterCategory,
  getCategoriesList,
} from '../state/category/category.selectors';

@Component({
  selector: 'app-category-list',
  styleUrl: './category-list.component.css',
  imports: [NgForOf, CommonModule, TranslatePipe],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  private _store$: Store<CategoryState> = inject(Store);
  protected onlyActive = true;
  protected categories$: Observable<Category[]> =
    this._store$.select(getCategoriesList);

  constructor() {}

  addNewCategory() {
    this._store$.dispatch(navigateToCategoryNew());
  }

  ngOnInit(): void {
    this._store$.dispatch(retrievedCategoryList());
  }

  editCategory(category: Category) {
    this._store$.dispatch(navigateToCategoryEdit({ category }));
  }

  filterCategories($event: any) {
    this.onlyActive = $event.target.checked;
    this._store$.dispatch(setActive({ active: this.onlyActive ? 1 : 0 }));
    this.categories$ = this._store$.select(filterCategory);
  }

  activeTextColor(active: boolean) {
    if (!active) {
      return 'text-danger';
    } else {
      return 'text';
    }
  }
}
