import { EventInput } from '@fullcalendar/core';
import { CalendarState, getEventsList } from './calendar.selectors';

fdescribe('CalendarSelectors', () => {
  let mockEvents = [
    { idEvent: 1, name: 'name1' },
    { idEvent: 2, name: 'name2' },
  ] as EventInput[];
  let initialState = {
    events: mockEvents,
  } as CalendarState;
  it('should select evets', () => {
    // when
    const result = getEventsList.projector(initialState);

    // then
    expect(result).toEqual(mockEvents);
  });
});
