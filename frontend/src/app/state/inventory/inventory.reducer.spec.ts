import { InventoryState } from './inventory.selectors';
import { inventoryReducer } from './inventory.reducer';
import {
  retrievedInventoryActionSuccess,
  retrievedInventoryListActionSuccess,
  saveInventory,
  setActiveInventory,
} from './inventory.action';
import { Inventory } from '../../api';

describe('InventoryReducer', () => {
  const mockInitialState = (): InventoryState => {
    return {
      inventories: [
        {
          idInventory: 2,
          name: '',
          description: '',
          active: false,
          optLock: 2,
        },
      ],
      inventoryEdit: {
        idInventory: undefined,
        name: '',
        active: false,
        optLock: 0,
      },
      active: false,
    } as InventoryState;
  };
  describe('unknown action', () => {
    it('should return the default state', () => {
      // given
      const initialState = mockInitialState();
      const action = {
        type: 'Unknown',
      };

      // when
      const state = inventoryReducer(initialState, action);

      // then
      expect(state).toEqual(initialState);
    });
  });
  describe('saveInventory', () => {
    it('should set inventories', () => {
      // given
      const initialState = mockInitialState();
      initialState.inventories = [];
      const inventories = [
        {
          idInventory: 31,
          name: 'test',
          active: true,
          optLock: 12,
        },
      ] as Inventory[];
      const action = retrievedInventoryListActionSuccess({ inventories });

      // when
      const state = inventoryReducer(initialState, action);

      // then
      expect(state.inventories).toEqual(inventories);
    });
  });
  describe('retrievedInventoryListActionSuccess', () => {
    it('should set inventories', () => {
      // given
      const initialState = mockInitialState();
      initialState.inventories = [];
      const inventories = [
        {
          idInventory: 32,
          name: 'test',
          active: true,
          optLock: 12,
        },
      ] as Inventory[];
      const action = retrievedInventoryListActionSuccess({ inventories });

      // when
      const state = inventoryReducer(initialState, action);

      // then
      expect(state.inventories).toEqual(inventories);
    });
  });
  describe('retrievedInventoryActionSuccess', () => {
    it('should set inventoryEdit', () => {
      // given
      const initialState = mockInitialState();
      initialState.inventoryEdit = {
        idInventory: undefined,
        name: '',
        active: false,
        optLock: 0,
      };
      const inventory = {
        idInventory: 1,
        name: 'test',
        active: true,
        optLock: 12,
      } as Inventory;
      const action = retrievedInventoryActionSuccess({ inventory });

      // when
      const state = inventoryReducer(initialState, action);

      // then
      expect(state.inventoryEdit).toEqual(inventory);
    });
  });
  describe('saveInventory', () => {
    it('should set inventory', () => {
      // given
      const initialState = mockInitialState();
      initialState.inventories = [
        {
          idInventory: 1,
          name: '',
          active: false,
          optLock: 0,
        },
      ];
      const inventory = {
        idInventory: 1,
        name: 'test',
        active: true,
        optLock: 12,
      } as Inventory;
      const action = saveInventory({ inventory });

      // when
      const state = inventoryReducer(initialState, action);

      // then
      expect(state.inventories[0]).toEqual(inventory);
    });
  });
  describe('setActiveInventory', () => {
    it('should set active', () => {
      // given
      const initialState = mockInitialState();
      initialState.inventoryEdit = {
        idInventory: undefined,
        name: '',
        active: false,
        optLock: 0,
      };
      const action = setActiveInventory({ active: true });

      // when
      const state = inventoryReducer(initialState, action);

      // then
      expect(state.active).toEqual(true);
    });
  });
});
