import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../api';
import {
  navigateToCategoryEdit,
  navigateToCategoryNew,
  retrievedCategoryList,
  saveCategory,
} from '../state/category/category.action';
import { CommonModule, NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCategoriesList } from '../state/category/category.selectors';

@Component({
  selector: 'app-category-list',
  styleUrl: './category-list.component.css',
  imports: [NgForOf, CommonModule],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  private _store$: Store = inject(Store);
  protected categories$: Observable<Category[]> =
    this._store$.select(getCategoriesList);

  constructor() {}

  addNewCategory() {
    this._store$.dispatch(navigateToCategoryNew());
  }

  ngOnInit(): void {
    this._store$.dispatch(retrievedCategoryList());
  }

  updateCategory(category: Category) {
    this._store$.dispatch(navigateToCategoryEdit({ category }));
  }

  deleteCategory(category: Category) {
    const updatedCategory: Category = {
      ...category,
      active: 0,
    };
    if (updatedCategory.idCategory) {
      this._store$.dispatch(saveCategory({ category: updatedCategory }));
      this._store$.dispatch(retrievedCategoryList());
    }
  }
}
