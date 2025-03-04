import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextDaysExpiredComponent } from './next-days-expired.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCategoryState } from '../state/category/category.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('NextDaysExpiredComponent', () => {
  let component: NextDaysExpiredComponent;
  let fixture: ComponentFixture<NextDaysExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextDaysExpiredComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({ initialState: initialCategoryState }),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NextDaysExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
