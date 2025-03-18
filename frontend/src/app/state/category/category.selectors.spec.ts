import {
  CategoryState,
  editCategorySelector,
  filterCategories,
  getCategoriesList,
  newCategorySelector,
  selectActiveCategory,
  selectCategoryById,
} from './category.selectors';
import { Category } from '../../api';

describe('CategorySelectors', () => {
  let mockCategories = [
    { idCategory: 1, name: 'name1', active: true },
    { idCategory: 2, name: 'name2', active: false },
  ] as Category[];
  let mockCategory = { idCategory: 3, name: 'name13' } as Category;
  let initialState = {
    categories: mockCategories,
    categoryEdit: mockCategory,
    active: false,
  } as CategoryState;

  it('should select categories', () => {
    // when
    const result = getCategoriesList.projector(initialState);

    // then
    expect(result).toEqual(mockCategories);
  });
  it('should select active', () => {
    // when
    const result = selectActiveCategory.projector(initialState);

    // then
    expect(result).toEqual(false);
  });
  it('should select active categories', () => {
    // when
    const result = filterCategories.projector(initialState, true);

    // then
    expect(result).toEqual([
      { idCategory: 1, name: 'name1', active: true } as Category,
    ]);
  });
  it('should select category by Id', () => {
    // when
    const result = selectCategoryById(2).projector(initialState);

    // then
    expect(result).toEqual({
      idCategory: 2,
      name: 'name2',
      active: false,
    } as Category);
  });
  it('should select new category', () => {
    // when
    const result = newCategorySelector.projector(initialState);

    // then
    expect(result).toEqual({} as Category);
  });
  it('should select edited category', () => {
    // when
    const result = editCategorySelector.projector(initialState);

    // then
    expect(result).toEqual(mockCategory);
  });
});
