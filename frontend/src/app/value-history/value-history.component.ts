import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { reportPeriods } from '../../objects/definedValues';
import * as echarts from 'echarts/core';
import { EChartsType } from 'echarts/core';
import { Properties } from '../api/model/properties';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { StorageValueHistoryData } from '../api';
import { EChartsOption } from 'echarts';
import { Store } from '@ngrx/store';
import {
  getValueHistoryList,
  ReportState,
} from '../state/report/report.selectors';
import { retrieveStorageValueHistory } from '../state/report/report.action';
import { NgForOf } from '@angular/common';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, CanvasRenderer, TitleComponent, TooltipComponent]);
@Component({
  selector: 'app-value-history',
  imports: [ReactiveFormsModule, TranslatePipe, NgxEchartsDirective, NgForOf],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './value-history.component.html',
  styleUrl: './value-history.component.css',
})
export class ValueHistoryComponent implements OnInit {
  private _reportStore$: Store<ReportState> = inject(Store);
  public days: number = 30;
  public periods: any[] = reportPeriods;
  public _chart$: EChartsType | undefined = undefined;
  public _chartData$: StorageValueHistoryData[] = [];
  private properties: Properties = {
    currency: 'USD',
    idUser: 0,
    language: 'en',
  };

  private _formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this._formGroup = this.formBuilder.group({
      days: this.days,
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  ngOnInit() {
    let ctx = document.getElementById('chart') || null;
    if (ctx) {
      this._chart$ = echarts.init(ctx);
    }
    this.retrieveReportData();
  }

  retrieveReportData() {
    this._reportStore$.dispatch(
      retrieveStorageValueHistory({ days: this.formGroup.value.days })
    );
    this._reportStore$.select(getValueHistoryList).subscribe((data) => {
      this._chartData$ = data;
      this.prepareChart();
    });
  }

  prepareChart() {
    if (this._chartData$ == undefined) {
      return;
    }
    let chartOption: EChartsOption = {
      title: {
        text:
          this.translate.instant('SUM_VALUES') + ' ' + this.properties.currency,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: this._chartData$.map(function (item: StorageValueHistoryData) {
          return item.operationDate;
        }),
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: {
        type: 'value',
        min: function (value) {
          return value.min - 20;
        },
      },
      series: {
        name: this.translate.instant('SUM_VALUES'),
        type: 'line',
        step: 'start',
        data: this._chartData$.map(function (item: StorageValueHistoryData) {
          return item.price;
        }),
      },
    };
    this._chart$?.setOption(chartOption);
  }

  updateDiagram() {
    this.retrieveReportData();
  }
}
