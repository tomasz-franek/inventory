import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastUsedComponent } from './last-used.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCategoryState } from '../state/category/category.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getLastUsedList } from '../state/report/report.selectors';

describe('LastUsedComponent', () => {
  let component: LastUsedComponent;
  let fixture: ComponentFixture<LastUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastUsedComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({
          initialState: initialCategoryState,
          selectors: [{ selector: getLastUsedList, value: [] }],
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LastUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
