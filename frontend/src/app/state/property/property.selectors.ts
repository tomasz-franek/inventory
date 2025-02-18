import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../../features';
import { Property } from '../../api';

export interface PropertyState {
  property: Property | undefined;
  idUser: number;
}

const selectPropertyFutureState = createFeatureSelector<PropertyState>(
  Features.property
);
export const getProperty = createSelector(
  selectPropertyFutureState,
  (state) => state.property
);
