import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumStorageComponent } from './sum-storage.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCategoryState } from '../state/category/category.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SumStorageComponent', () => {
  let component: SumStorageComponent;
  let fixture: ComponentFixture<SumStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumStorageComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({ initialState: initialCategoryState }),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SumStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
