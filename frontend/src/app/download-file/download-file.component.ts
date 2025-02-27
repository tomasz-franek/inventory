import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css'],
  imports: [TranslatePipe],
})
export class DownloadFileComponent {
  constructor() {}

  @Input() url: string = '';
  @Input() documentName: string = '';
  @Input() fileType: string = 'application/pdf';
  @Input() title: string = '';

  async getPdf() {
    // await this.dataService.readDocument(this.url).subscribe({
    //   next: (data: any) => {
    //     let file = new Blob([data], { type: this.fileType });
    //     let fileURL = URL.createObjectURL(file);
    //     let anchor = document.createElement('a');
    //     anchor.download = this.documentName;
    //     anchor.href = fileURL;
    //     anchor.click();
    //     if (data instanceof HttpResponse) {
    //       this.alertService.success(data.statusText);
    //     }
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.alertService.error(error.statusText);
    //   },
    // });
  }
}
