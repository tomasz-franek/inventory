import { getProperty, PropertyState } from './property.selectors';
import { Property } from '../../api';

describe('PropertySelectors', () => {
  let mockProperty = {
    idProperty: 1,
    idUser: 1,
    currency: 'currency',
    language: 'language',
  } as Property;
  let initialState = {
    property: mockProperty,
    idUser: 1,
  } as PropertyState;
  it('should select property', () => {
    // when
    const result = getProperty.projector(initialState);

    // then
    expect(result).toEqual(mockProperty);
  });
});
