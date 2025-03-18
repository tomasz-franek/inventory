import { CalendarState } from './calendar.selectors';
import { EventInput } from '@fullcalendar/core';
import { createEvent } from './calendar.action';
import { calendarReducer } from './calendar.reducer';

describe('CalendarReducer', () => {
  const mockInitialState = (): CalendarState => {
    return {
      events: [],
    } as CalendarState;
  };
  describe('unknown action', () => {
    it('should return the default state', () => {
      // given
      const initialState = mockInitialState();
      const action = {
        type: 'Unknown',
      };

      // when
      const state = calendarReducer(initialState, action);

      // then
      expect(state).toEqual(initialState);
    });
  });

  describe('createEvent', () => {
    it('should set categories', () => {
      // given
      const initialState = mockInitialState();
      initialState.events = [];
      const event = {
        idCategory: 1,
        name: 'test',
        active: true,
        optLock: 12,
      } as EventInput;
      const action = createEvent({ event });

      // when
      const state = calendarReducer(initialState, action);

      // then
      expect(state.events[0]).toEqual(event);
    });
  });
});
