import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  status: string;
}

interface InventoryState {
  items: InventoryItem[];
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    fetchItemsSuccess: (state, action: PayloadAction<InventoryItem[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    fetchItemsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addItem: (state, action: PayloadAction<InventoryItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<InventoryItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { fetchItemsSuccess, fetchItemsFailure, addItem, updateItem, deleteItem } = inventorySlice.actions;
export default inventorySlice.reducer;