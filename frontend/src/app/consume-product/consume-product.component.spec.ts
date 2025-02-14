import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeProductComponent } from './consume-product.component';

describe('ConsumeProductComponent', () => {
  let component: ConsumeProductComponent;
  let fixture: ComponentFixture<ConsumeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumeProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
