import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../api';
import {
  retrievedCategoryList,
  saveCategory,
} from '../state/category/category.action';
import { CommonModule, NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
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
  private _router: Router = inject(Router);

  constructor() {}

  addNewCategory() {
    this._router.navigate(['category-add']);
  }

  ngOnInit(): void {
    this._store$.dispatch(retrievedCategoryList());
  }

  updateCategory(category: Category) {
    const updatedCategory: Category = {
      ...category,
      name: 'Updated Category',
      active: 1,
    };
    this._store$.dispatch(saveCategory({ category: updatedCategory }));
  }

  deleteCategory(category: Category) {
    const updatedCategory: Category = {
      ...category,
      name: 'Updated Category',
      active: 0,
    };
    if (updatedCategory.idCategory) {
      this._store$.dispatch(saveCategory({ category: updatedCategory }));
    }
  }
}
