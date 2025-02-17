import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumCategoriesComponent } from './sum-categories.component';

describe('SumCategoriesComponent', () => {
  let component: SumCategoriesComponent;
  let fixture: ComponentFixture<SumCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
