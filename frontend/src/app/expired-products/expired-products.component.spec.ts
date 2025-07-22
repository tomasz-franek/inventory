import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredProductsComponent } from './expired-products.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCategoryState } from '../state/category/category.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getExpiredProductList } from '../state/report/report.selectors';

describe('ExpiredProductsComponent', () => {
  let component: ExpiredProductsComponent;
  let fixture: ComponentFixture<ExpiredProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiredProductsComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({
          initialState: initialCategoryState,
          selectors: [{ selector: getExpiredProductList, value: [] }],
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpiredProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
