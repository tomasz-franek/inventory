import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InventoryListComponent} from './inventory-list.component';
import {HttpClient} from '@angular/common/http';
import {CategoriesService} from '../api';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '../services/api.service';

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryListComponent, HttpClient],
      providers: [HttpClient, CategoriesService, TranslateService, ApiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
