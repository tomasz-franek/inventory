import { UnitState } from './unit.selectors';
import { retrieveUnitListActionSuccess } from './unit.action';
import { createReducer, on } from '@ngrx/store';

export const initialUnitState: UnitState = {
  units: [],
};
export const unitReducer = createReducer(
  initialUnitState,
  on(retrieveUnitListActionSuccess, (state, action): UnitState => {
    return {
      ...state,
      units: action.units,
    };
  })
);
