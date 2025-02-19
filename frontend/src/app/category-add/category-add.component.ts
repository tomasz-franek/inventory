import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Category } from '../api';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  loadCategoryAction,
  navigateToCategoryList,
  saveCategory,
} from '../state/category/category.action';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  CategoryState,
  editCategorySelector,
  newCategorySelector,
} from '../state/category/category.selectors';

@Component({
  selector: 'app-category-add',
  imports: [CommonModule, TranslatePipe, FormsModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css',
})
export class CategoryAddComponent implements OnInit {
  private _store$: Store = inject(Store);
  protected category$: Observable<Category> = of({} as Category);

  constructor(
    private route: ActivatedRoute,
    private store: Store<CategoryState>
  ) {}

  ngOnInit(): void {
    const id = this.routerId;
    if (id === null) {
      this.category$ = this.store.select(newCategorySelector);
    } else {
      this.store.dispatch(loadCategoryAction({ id: Number(id) }));
      this.category$ = this.store.select(editCategorySelector);
    }
  }

  backToCategories() {
    this._store$.dispatch(navigateToCategoryList());
  }

  save(category: Category) {
    debugger;
    this.store.dispatch(saveCategory({ category }));
    this._store$.dispatch(navigateToCategoryList());
  }

  get routerId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
