import { CategoryState } from './category.selectors';
import { categoryReducer } from './category.reducer';
import { Category } from '../../api';
import {
  retrievedCategoryActionSuccess,
  retrievedCategoryListActionSuccess,
  saveCategory,
  setActiveCategory,
} from './category.action';

describe('CategoryReducer', () => {
  const mockInitialState = (): CategoryState => {
    return {
      categories: [],
      categoryEdit: {
        idCategory: undefined,
        name: '',
        active: false,
        optLock: 0,
      },
      active: false,
    } as CategoryState;
  };
  describe('unknown action', () => {
    it('should return the default state', () => {
      // given
      const initialState = mockInitialState();
      const action = {
        type: 'Unknown',
      };

      // when
      const state = categoryReducer(initialState, action);

      // then
      expect(state).toEqual(initialState);
    });
  });

  describe('retrievedCategoryListActionSuccess', () => {
    it('should set categories', () => {
      // given
      const initialState = mockInitialState();
      initialState.categories = [];
      const categories = [
        {
          idCategory: 1,
          name: 'test',
          active: true,
          optLock: 12,
        },
      ] as Category[];
      const action = retrievedCategoryListActionSuccess({ categories });

      // when
      const state = categoryReducer(initialState, action);

      // then
      expect(state.categories).toEqual(categories);
    });
  });

  describe('retrievedCategoryActionSuccess', () => {
    it('should set category', () => {
      // given
      const initialState = mockInitialState();
      initialState.categoryEdit = {
        idCategory: undefined,
        name: '',
        active: false,
        optLock: 0,
      };
      const category = {
        idCategory: 1,
        name: 'test',
        active: true,
        optLock: 12,
      } as Category;
      const action = retrievedCategoryActionSuccess({ category });

      // when
      const state = categoryReducer(initialState, action);

      // then
      expect(state.categoryEdit).toEqual(category);
    });
  });
  describe('saveCategory', () => {
    it('should set category', () => {
      // given
      const initialState = mockInitialState();
      initialState.categories = [
        {
          idCategory: 1,
          name: '',
          active: false,
          optLock: 0,
        },
      ];
      const category = {
        idCategory: 1,
        name: 'test',
        active: true,
        optLock: 12,
      } as Category;
      const action = saveCategory({ category });

      // when
      const state = categoryReducer(initialState, action);

      // then
      expect(state.categories[0]).toEqual(category);
    });
  });
  describe('setActiveCategory', () => {
    it('should set active', () => {
      // given
      const initialState = mockInitialState();
      initialState.categoryEdit = {
        idCategory: undefined,
        name: '',
        active: false,
        optLock: 0,
      };
      const action = setActiveCategory({ active: true });

      // when
      const state = categoryReducer(initialState, action);

      // then
      expect(state.active).toEqual(true);
    });
  });
});
