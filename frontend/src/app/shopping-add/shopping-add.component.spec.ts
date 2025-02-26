import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingAddComponent } from './shopping-add.component';

describe('ShoppingAddComponent', () => {
  let component: ShoppingAddComponent;
  let fixture: ComponentFixture<ShoppingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
