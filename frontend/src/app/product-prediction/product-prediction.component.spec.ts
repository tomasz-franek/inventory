import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPredictionComponent } from './product-prediction.component';

describe('ProductPredictionComponent', () => {
  let component: ProductPredictionComponent;
  let fixture: ComponentFixture<ProductPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPredictionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
