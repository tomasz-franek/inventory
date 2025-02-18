import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextDaysExpiredComponent } from './next-days-expired.component';

describe('NextDaysExpiredComponent', () => {
  let component: NextDaysExpiredComponent;
  let fixture: ComponentFixture<NextDaysExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextDaysExpiredComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NextDaysExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
