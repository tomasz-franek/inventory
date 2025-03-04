import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAddComponent } from './inventory-add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { initialCategoryState } from '../state/category/category.reducer';
import { ActivatedRoute } from '@angular/router';
import { mockRoute } from '../mocks/activated-route-mock';
import { TranslateModule } from '@ngx-translate/core';

describe('InventoryAddComponent', () => {
  let component: InventoryAddComponent;
  let fixture: ComponentFixture<InventoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryAddComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({ initialState: initialCategoryState }),
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
