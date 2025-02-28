import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ExpiredReportData,
  InventoryReportData,
  LastUsedData,
} from '../../api';

export const retrieveInventoryReportData = createAction(
  '[Report] Retrieve Inventory Report',
  props<{ idInventory: number }>()
);

export const retrieveExpiredInventoryReportData = createAction(
  '[Report] Retrieve Expired Inventory Report',
  props<{ idInventory: number }>()
);

export const retrieveExpiredInventoryReportDataSuccess = createAction(
  '[Report] Retrieve Expired Inventory Report Success',
  props<{ expired: ExpiredReportData[] }>()
);

export const retrieveInventoryReportDataSuccess = createAction(
  '[Report] Retrieve Inventory Report Success',
  props<{ inventory: InventoryReportData[] }>()
);

export const retrieveReportDataError = createAction(
  '[Report] Retrieve Inventory Report Error',
  props<{
    error: HttpErrorResponse;
  }>()
);

export const retrieveLastUsedReportData = createAction(
  '[Report] Retrieve LastUsedReportData',
  props<{ idInventory: number }>()
);

export const retrieveLastUsedReportDataSuccess = createAction(
  '[Report] Retrieve Last UsedReport Success',
  props<{ lastUsed: LastUsedData[] }>()
);
