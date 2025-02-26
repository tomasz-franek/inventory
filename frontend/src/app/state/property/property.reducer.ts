import { PropertyState } from './property.selectors';
import { retrievedPropertyForUserActionSuccess } from './property.action';

export const initialPropertyState: PropertyState = {
  property: {
    idProperty: 0,
    idUser: 0,
    currency: '',
    language: '',
  },
  idUser: 1,
};

export function propertyReducer(
  state: PropertyState = initialPropertyState,
  action: any
): PropertyState {
  switch (action.type) {
    case retrievedPropertyForUserActionSuccess.type:
      return { ...state, property: action.property };
    default:
      return state;
  }
}
