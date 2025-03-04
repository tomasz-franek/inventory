import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumCategoriesComponent } from './sum-categories.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCategoryState } from '../state/category/category.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SumCategoriesComponent', () => {
  let component: SumCategoriesComponent;
  let fixture: ComponentFixture<SumCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumCategoriesComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({ initialState: initialCategoryState }),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SumCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
