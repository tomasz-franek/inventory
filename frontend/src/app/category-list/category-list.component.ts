import {Component, OnInit} from '@angular/core';
import {Category} from '../api';
import {retrievedCategoryList, saveCategory} from '../state/category/category.action';
import {CommonModule, NgForOf} from '@angular/common';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {getCategoriesList} from '../state/category/category.selectors';

@Component({
  selector: 'app-category-list',
  styleUrl: './category-list.component.css',
  imports: [
    NgForOf,
    CommonModule,
  ],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  protected categories$!: Observable<Category[]>;


  constructor(private store: Store,
              private router: Router,) {
  }

  addNewCategory() {
    this.router.navigate(['category-add']);
  }

  ngOnInit(): void {
    this.store.dispatch(retrievedCategoryList())
    this.categories$ = this.store.select(getCategoriesList);
  }

  updateCategory(category: Category) {
    const updatedCategory: Category = { ...category, name: 'Updated Category', active: 1};
    this.store.dispatch(saveCategory({ category:updatedCategory }));
  }

  deleteCategory(category: Category) {
    const updatedCategory: Category = { ...category, name: 'Updated Category', active: 0};
    if (updatedCategory.idCategory) {
      this.store.dispatch(saveCategory({category:updatedCategory}));
    }
  }
}
