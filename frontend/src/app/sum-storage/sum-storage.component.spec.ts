import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumStorageComponent } from './sum-storage.component';

describe('SumStorageComponent', () => {
  let component: SumStorageComponent;
  let fixture: ComponentFixture<SumStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumStorageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SumStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
