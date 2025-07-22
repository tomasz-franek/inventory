import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPredictionComponent } from './product-prediction.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCategoryState } from '../state/category/category.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getFilteredProductPredictionList } from '../state/report/report.selectors';

describe('ProductPredictionComponent', () => {
  let component: ProductPredictionComponent;
  let fixture: ComponentFixture<ProductPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPredictionComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({
          initialState: initialCategoryState,
          selectors: [
            { selector: getFilteredProductPredictionList, value: [] },
          ],
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
