import { createAction, props } from '@ngrx/store';
import { EventInput } from '@fullcalendar/core';

export const createEvent = createAction(
  '[Fullcalendar] Create Event',
  props<{ event: EventInput }>()
);
