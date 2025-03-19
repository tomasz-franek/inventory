import { PropertyState } from './property.selectors';
import { propertyReducer } from './property.reducer';
import { Property } from '../../api';
import { retrievedPropertyForUserActionSuccess } from './property.action';

describe('PropertyReducer', () => {
  const mockInitialState = (): PropertyState => {
    return {
      property: {
        idProperty: 2,
        idUser: 4,
        currency: 'currency USD',
        language: 'language',
      },
      idUser: 2,
    } as PropertyState;
  };
  describe('unknown action', () => {
    it('should return the default state', () => {
      // given
      const initialState = mockInitialState();
      const action = {
        type: 'Unknown',
      };

      // when
      const state = propertyReducer(initialState, action);

      // then
      expect(state).toEqual(initialState);
    });
  });
  describe('retrievedPropertyForUserActionSuccess', () => {
    it('should return property', () => {
      // given
      const initialState = mockInitialState();
      initialState.property = {} as Property;
      const property = {
        idProperty: 8,
        idUser: 8,
        currency: 'currency EUR',
        language: 'language2',
      } as Property;
      const action = retrievedPropertyForUserActionSuccess({ property });

      // when
      const state = propertyReducer(initialState, action);

      // then
      expect(state.property).toEqual(property);
    });
  });
});
