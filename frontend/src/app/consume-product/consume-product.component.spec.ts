import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeProductComponent } from './consume-product.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCategoryState } from '../state/category/category.reducer';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConsumeProductComponent', () => {
  let component: ConsumeProductComponent;
  let fixture: ComponentFixture<ConsumeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumeProductComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({ initialState: initialCategoryState }),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
