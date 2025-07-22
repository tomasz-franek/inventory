import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingAddComponent } from './shopping-add.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCategoryState } from '../state/category/category.reducer';
import { ActivatedRoute } from '@angular/router';
import { mockRoute } from '../mocks/activated-route-mock';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getUnitsList } from '../state/unit/unit.selectors';
import { filterProducts } from '../state/product/product.selectors';

describe('ShoppingAddComponent', () => {
  let component: ShoppingAddComponent;
  let fixture: ComponentFixture<ShoppingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingAddComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({
          initialState: initialCategoryState,
          selectors: [
            { selector: getUnitsList, value: [] },
            { selector: filterProducts, value: [] },
          ],
        }),
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
