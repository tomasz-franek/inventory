import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../api';
import {
  navigateToCategoryEdit,
  navigateToCategoryNew,
  retrieveCategoryList,
  setActiveCategory,
} from '../state/category/category.action';
import { CommonModule, NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import {
  CategoryState,
  filterCategories,
} from '../state/category/category.selectors';
import { ActiveColor } from '../utils/active-color';

@Component({
  selector: 'app-category-list',
  styleUrl: './category-list.component.css',
  imports: [NgForOf, CommonModule, TranslatePipe],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  private _storeCategory$: Store<CategoryState> = inject(Store);
  protected onlyActive = true;
  protected categories$!: Observable<Category[]>;

  constructor() {}

  addNewCategory() {
    this._storeCategory$.dispatch(navigateToCategoryNew());
  }

  ngOnInit(): void {
    this._storeCategory$.dispatch(
      setActiveCategory({ active: this.onlyActive })
    );
    this._storeCategory$.dispatch(retrieveCategoryList());
    this.categories$ = this._storeCategory$.select(filterCategories);
  }

  editCategory(category: Category) {
    this._storeCategory$.dispatch(navigateToCategoryEdit({ category }));
  }

  filterCategories($event: any) {
    this.onlyActive = $event.target.checked;
    this._storeCategory$.dispatch(
      setActiveCategory({ active: this.onlyActive })
    );
    this.categories$ = this._storeCategory$.select(filterCategories);
  }

  protected readonly ActiveColor = ActiveColor;
}
