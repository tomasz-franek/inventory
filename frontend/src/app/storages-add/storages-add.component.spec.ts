import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragesAddComponent } from './storages-add.component';

describe('StoragesAddComponent', () => {
  let component: StoragesAddComponent;
  let fixture: ComponentFixture<StoragesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoragesAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoragesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
