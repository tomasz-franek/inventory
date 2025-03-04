import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadFileComponent } from './download-file.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DownloadFileComponent', () => {
  let component: DownloadFileComponent;
  let fixture: ComponentFixture<DownloadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadFileComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
