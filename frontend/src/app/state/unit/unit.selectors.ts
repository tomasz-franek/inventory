import { Features } from '../../../features';
import { Unit } from '../../api';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UnitState {
  units: Unit[];
}

const selectUnitsFutureState = createFeatureSelector<UnitState>(Features.units);

export const getUnitsList = createSelector(
  selectUnitsFutureState,
  (state) => state.units
);
