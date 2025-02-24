import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Category } from '../api';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  loadCategoryAction,
  navigateToCategoryList,
  saveCategory,
} from '../state/category/category.action';
import { ActivatedRoute } from '@angular/router';
import {
  CategoryState,
  editCategorySelector,
  newCategorySelector,
} from '../state/category/category.selectors';

@Component({
  selector: 'app-category-add',
  imports: [CommonModule, TranslatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css',
})
export class CategoryAddComponent implements OnInit {
  private _store$: Store = inject(Store);
  protected category$: Category = { active: 0, name: '', optLock: 0 };
  private _categoryForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store<CategoryState>,
    private formBuilder: FormBuilder
  ) {
    this._categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      active: [1, Validators.required],
      id: [],
      optLock: [],
    });
  }

  ngOnInit(): void {
    const id = this.routerId;
    if (id === null) {
      this.store.select(newCategorySelector).subscribe((category) => {
        this.category$ = category;
        this._categoryForm = this.formBuilder.group({
          name: [this.category$.name, Validators.required],
          active: [this.category$.active, Validators.required],
          optLock: [this.category$.optLock],
        });
      });
    } else {
      this.store.dispatch(loadCategoryAction({ id: Number(id) }));
      this.store.select(editCategorySelector).subscribe((category) => {
        this.category$ = category;
        this._categoryForm = this.formBuilder.group({
          name: [this.category$.name, Validators.required],
          active: [this.category$.active, Validators.required],
          optLock: [this.category$.optLock],
        });
      });
    }
  }

  get categoryForm(): FormGroup {
    return this._categoryForm;
  }

  backToCategories() {
    this._store$.dispatch(navigateToCategoryList());
  }

  save() {
    debugger;
    console.log(this._categoryForm);
    const updatedCategory: Category = {
      ...this.category$,
      name: this._categoryForm.value.name,
      active: this._categoryForm.value.active,
    };
    if (this.category$ !== undefined) {
      this.store.dispatch(saveCategory({ category: updatedCategory }));
      this._store$.dispatch(navigateToCategoryList());
    }
  }

  get routerId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
