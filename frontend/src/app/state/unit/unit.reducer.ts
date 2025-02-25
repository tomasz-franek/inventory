import { UnitState } from './unit.selectors';
import { retrieveUnitListActionSuccess } from './unit.action';

export const initialUnitState: UnitState = {
  units: [],
};

export function unitReducer(
  state: UnitState = initialUnitState,
  action: any
): UnitState {
  switch (action.type) {
    case retrieveUnitListActionSuccess.type:
      return {
        ...state,
        units: action.units,
      };
    default:
      return state;
  }
}
