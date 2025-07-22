import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragesListComponent } from './storages-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCategoryState } from '../state/category/category.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { filterStorages } from '../state/storage/storage.selectors';
import { filterProducts } from '../state/product/product.selectors';
import { filterCategories } from '../state/category/category.selectors';

describe('StoragesListComponent', () => {
  let component: StoragesListComponent;
  let fixture: ComponentFixture<StoragesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoragesListComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({
          initialState: initialCategoryState,
          selectors: [
            { selector: filterStorages, value: [] },
            { selector: filterProducts, value: [] },
            { selector: filterCategories, value: [] },
          ],
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StoragesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
