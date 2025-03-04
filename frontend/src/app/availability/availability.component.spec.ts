import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityComponent } from './availability.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AvailabilityComponent', () => {
  let component: AvailabilityComponent;
  let fixture: ComponentFixture<AvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityComponent, TranslateModule.forRoot()],
      providers: [FormBuilder, ReactiveFormsModule, provideMockStore({})],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
