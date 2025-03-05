import { CalendarState } from './calendar.selectors';
import { createReducer, on } from '@ngrx/store';
import { createEvent } from './calendar.action';

export const initialCategoryState: CalendarState = {
  events: [],
};
export const calendarReducer = createReducer(
  initialCategoryState,

  on(createEvent, (state, { event }) => ({
    ...state,
    events: [...state.events, event],
  }))
);
