import {Component, OnInit} from '@angular/core';
import {Category} from '../api';
import {retrievedCategoryList, saveCategory} from '../state/category/category.action';
import {CommonModule, NgForOf} from '@angular/common';
import {Store} from "@ngrx/store"
import {Features} from '../../features';
import {Router} from '@angular/router';
import {CategoryState} from '../state/category/category.selectors';

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
  categories$: Category[] = [];


  constructor(private store: Store<CategoryState>,
              private router: Router,) {
    this.store.select(Features.categories).subscribe((data:any) => {
      this.categories$ = data.categories;});
  }

  addNewCategory() {
    this.router.navigate(['category-add']);
  }

  ngOnInit(): void {
    this.store.dispatch(retrievedCategoryList());
  }

  updateCategory(category: Category) {
    const updatedCategory: Category = { ...category, name: 'Updated Category', active: 1};
    this.store.dispatch(saveCategory({ category:updatedCategory }));
  }

  deleteCategory(category: Category) {
    const updatedCategory: Category = { ...category, name: 'Updated Category', active: 0};
    if(updatedCategory.id) {
      this.store.dispatch(saveCategory({category:updatedCategory}));
    }
  }
}
