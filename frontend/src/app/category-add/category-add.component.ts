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
  protected category$: Category = { active: false, name: '', optLock: 0 };
  protected _categoryForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
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
      this._store$.select(newCategorySelector).subscribe((category) => {
        this.category$ = category;
        this._categoryForm = this.formBuilder.group({
          id: undefined,
          name: ['', Validators.required],
          active: [true, Validators.required],
          optLock: [0],
        });
      });
    } else {
      this._store$.dispatch(loadCategoryAction({ id: Number(id) }));
      this._store$.select(editCategorySelector).subscribe((category) => {
        this.category$ = category;
        this._categoryForm = this.formBuilder.group({
          id: this.category$.idCategory,
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
    const updatedCategory: Category = {
      ...this.category$,
      name: this._categoryForm.value.name,
      active: this._categoryForm.value.active,
    };
    if (this._categoryForm.value.id !== undefined) {
      this._store$.dispatch(saveCategory({ category: updatedCategory }));
    }
  }

  get routerId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
