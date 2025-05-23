import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddComponent } from './category-add.component';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { mockRoute } from '../mocks/activated-route-mock';
import { initialCategoryState } from '../state/category/category.reducer';
import { editCategorySelector } from '../state/category/category.selectors';

describe('CategoryAddComponent', () => {
  let component: CategoryAddComponent;
  let fixture: ComponentFixture<CategoryAddComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAddComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({
          initialState: initialCategoryState,
          selectors: [
            {
              selector: editCategorySelector,
              value: {
                name: '',
                active: false,
                optLock: 0,
                idCategory: 1,
              },
            },
          ],
        }),
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('routerId', () => {
    it('should return id from router paramMap', () => {
      // given
      spyOn(mockRoute.snapshot.paramMap, 'get')
        .withArgs('id')
        .and.returnValue('2');
      component.ngOnInit();

      // when
      const actual = component.routerId;

      // then
      expect(actual).toEqual('2');
    });
  });
});
