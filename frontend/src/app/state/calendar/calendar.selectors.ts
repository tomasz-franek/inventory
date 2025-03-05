import { EventInput } from '@fullcalendar/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../../features';

export interface CalendarState {
  events: EventInput[];
}

export const selectCalendarFutureState = createFeatureSelector<CalendarState>(
  Features.calendar
);

export const getEventsList = createSelector(
  selectCalendarFutureState,
  (state) => state.events
);
