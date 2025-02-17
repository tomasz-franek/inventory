import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastUsedComponent } from './last-used.component';

describe('LastUsedComponent', () => {
  let component: LastUsedComponent;
  let fixture: ComponentFixture<LastUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastUsedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
