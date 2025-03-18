import { Inventory } from '../../api';
import {
  editInventorySelector,
  filterInventories,
  getInventoriesList,
  InventoryState,
  newInventorySelector,
  selectActiveInventory,
  selectInventoryById,
} from './inventory.selectors';

describe('InventorySelectors', () => {
  let mockInventories = [
    { idInventory: 1, name: 'name1', active: true },
    { idInventory: 2, name: 'name2', active: false },
  ] as Inventory[];
  let mockInventory = { idInventory: 103, name: 'name21' } as Inventory;
  let initialState = {
    inventories: mockInventories,
    inventoryEdit: mockInventory,
    active: false,
  } as InventoryState;

  it('should select inventories', () => {
    // when
    const result = getInventoriesList.projector(initialState);

    // then
    expect(result).toEqual(mockInventories);
  });
  it('should select active', () => {
    // when
    const result = selectActiveInventory.projector(initialState);

    // then
    expect(result).toEqual(false);
  });
  it('should select active inventories', () => {
    // when
    const result = filterInventories.projector(initialState, true);

    // then
    expect(result).toEqual([
      { idInventory: 1, name: 'name1', active: true } as Inventory,
    ]);
  });
  it('should select inventory by Id', () => {
    // when
    const result = selectInventoryById(2).projector(initialState);

    // then
    expect(result).toEqual({
      idInventory: 2,
      name: 'name2',
      active: false,
    } as Inventory);
  });
  it('should select new inventory', () => {
    // when
    const result = newInventorySelector.projector(initialState);

    // then
    expect(result).toEqual({} as Inventory);
  });
  it('should select edited inventory', () => {
    // when
    const result = editInventorySelector.projector(initialState);

    // then
    expect(result).toEqual(mockInventory);
  });
});
