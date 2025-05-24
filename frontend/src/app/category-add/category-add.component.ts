import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Category } from '../api';
import {
  FormBuilder,
  FormControl,
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
  private _storeCategory$: Store<CategoryState> = inject(Store);
  protected category$: Category = { active: false, name: '', optLock: 0 };
  private _formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this._formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      active: new FormControl(1, [Validators.required]),
      id: new FormControl(null, []),
      optLock: new FormControl(null, []),
    });
  }

  ngOnInit(): void {
    const id = this.routerId;
    if (id === null) {
      this._storeCategory$.select(newCategorySelector).subscribe((category) => {
        this.category$ = category;
        this._formGroup = this.formBuilder.group({
          id: new FormControl(undefined, []),
          name: new FormControl('', [Validators.required]),
          active: new FormControl(true, [Validators.required]),
          optLock: new FormControl(0, [Validators.required]),
        });
      });
    } else {
      this._storeCategory$.dispatch(loadCategoryAction({ id: Number(id) }));
      this._storeCategory$
        .select(editCategorySelector)
        .subscribe((category) => {
          this.category$ = category;
          this._formGroup = this.formBuilder.group({
            id: new FormControl(this.category$.idCategory, []),
            name: new FormControl(this.category$.name, [Validators.required]),
            active: new FormControl(this.category$.active, [
              Validators.required,
            ]),
            optLock: new FormControl(this.category$.optLock, []),
          });
        });
    }
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  backToCategories() {
    this._storeCategory$.dispatch(navigateToCategoryList());
  }

  save() {
    const updatedCategory: Category = {
      ...this.category$,
      name: this._formGroup.get('name')?.value,
      active: this._formGroup.get('active')?.value,
    };
    if (this._formGroup.get('id')?.value !== undefined) {
      this._storeCategory$.dispatch(
        saveCategory({ category: updatedCategory })
      );
    }
  }

  get routerId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
