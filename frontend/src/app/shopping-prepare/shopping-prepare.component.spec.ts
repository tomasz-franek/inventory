import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingPrepareComponent } from './shopping-prepare.component';

describe('ShoppingPrepareComponent', () => {
  let component: ShoppingPrepareComponent;
  let fixture: ComponentFixture<ShoppingPrepareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingPrepareComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingPrepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
