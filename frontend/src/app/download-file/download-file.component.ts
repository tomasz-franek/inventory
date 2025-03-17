import { Component, inject, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PdfReportsEnum } from '../../objects/definedValues';
import { Store } from '@ngrx/store';
import { getBlob, ReportState } from '../state/report/report.selectors';
import {
  retrieveReportPdfExpired,
  retrieveReportPdfInventory,
  retrieveReportPdfShopping,
} from '../state/report/report.action';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css'],
  imports: [TranslatePipe],
})
export class DownloadFileComponent {
  private _storeReport$: Store<ReportState> = inject(Store);
  constructor() {}

  @Input() url: string = '';
  @Input() documentType: PdfReportsEnum | null = null;
  @Input() documentName: string = '';
  @Input() fileType: string = 'application/pdf';
  @Input() title: string = '';

  async getPdf() {
    switch (this.documentType) {
      case PdfReportsEnum.STORAGE:
        this._storeReport$.dispatch(retrieveReportPdfShopping());
        break;
      case PdfReportsEnum.EXPIRED:
        this._storeReport$.dispatch(retrieveReportPdfExpired());
        break;
      case PdfReportsEnum.INVENTORY:
        this._storeReport$.dispatch(retrieveReportPdfInventory());

        break;
    }
    this._storeReport$.select(getBlob).subscribe((file: Blob | null) => {
      if (file != null) {
        let fileURL = URL.createObjectURL(file);
        let anchor = document.createElement('a');
        anchor.download = this.documentName;
        anchor.href = fileURL;
        anchor.click();
      }
    });
  }
}
