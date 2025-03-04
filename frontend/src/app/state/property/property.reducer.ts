import { PropertyState } from './property.selectors';
import { retrievedPropertyForUserActionSuccess } from './property.action';
import { createReducer, on } from '@ngrx/store';

export const initialPropertyState: PropertyState = {
  property: {
    idProperty: 0,
    idUser: 0,
    currency: '',
    language: '',
  },
  idUser: 1,
};
export const propertyReducer = createReducer(
  initialPropertyState,
  on(retrievedPropertyForUserActionSuccess, (state, action): PropertyState => {
    return { ...state, property: action.property };
  })
);
