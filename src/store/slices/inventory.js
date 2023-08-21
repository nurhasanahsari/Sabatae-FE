import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import axios from '@/utils/axios';
import { openSnackbar } from '@/store/slices/snackbar';

// ==============================|| SLICE - USER ||============================== //

const initialState = {
  error: null,
  errorUpdate: null,
  errorCreate: null,
  errorDelete: null,

  loadingInventory: false,
  loadingInventoryFilter: false,
  loadingLog: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  inventories: [],
  inventoriesFilter: [],
};

const slice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // LOADING
    loadingInventory(state, action) {
      state.loadingInventory = action.payload;
    },
    loadingInventoryFilter(state, action) {
      state.loadingInventoryFilter = action.payload;
    },
    loadingLog(state, action) {
      state.loadingLog = action.payload;
    },
    loadingCreate(state, action) {
      state.loadingCreate = action.payload;
    },
    loadingUpdate(state, action) {
      state.loadingUpdate = action.payload;
    },
    loadingDelete(state, action) {
      state.loadingDelete = action.payload;
    },

    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    hasErrorUpdate(state, action) {
      state.errorUpdate = action.payload;
    },
    hasErrorCreate(state, action) {
      state.errorCreate = action.payload;
    },
    hasErrorDelete(state, action) {
      state.errorDelete = action.payload;
    },

    // SUCCESS
    getInventoriesSuccess(state, action) {
      state.inventories = action.payload;
    },
    getInventoriesFilterSuccess(state, action) {
      state.inventoriesFilter = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getInventories(param) {
  return async () => {
    try {
      dispatch(slice.actions.loadingInventory(true));
      const response = await axios.get(`/inventory/table${param || ''}`);
      dispatch(slice.actions.getInventoriesSuccess(response.data.data));
      dispatch(slice.actions.loadingInventory(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.loadingInventory(false));
    }
  };
}

export function getFilterInventories(param) {
  return async () => {
    try {
      dispatch(slice.actions.loadingInventoryFilter(true));
      const response = await axios.get(`/inventory/filter${param || ''}`);
      dispatch(slice.actions.getInventoriesFilterSuccess(response.data.data));
      dispatch(slice.actions.loadingInventoryFilter(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.loadingInventoryFilter(false));
    }
  };
}

export function createInventory(body) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorCreate(null));
      dispatch(slice.actions.loadingCreate(true));
      const res = await axios.post(`/inventory`, body);
      dispatch(
        openSnackbar({
          open: true,
          message: res.data?.message,
          variant: 'alert',
          alert: {
            color: 'success',
          },
          close: true,
        })
      );
      dispatch(slice.actions.hasErrorCreate(null));
      dispatch(slice.actions.loadingCreate(false));
    } catch (error) {
      dispatch(slice.actions.hasErrorCreate(error.response.data));
      dispatch(slice.actions.loadingCreate(false));
    }
  };
}

export function editInventories(body, id) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorUpdate(null));
      dispatch(slice.actions.loadingUpdate(true));
      const res = await axios.patch(`/inventory/${id}`, body);

      dispatch(
        openSnackbar({
          open: true,
          message: res.data?.message,
          variant: 'alert',
          alert: {
            color: 'success',
          },
          close: true,
        })
      );
      dispatch(slice.actions.hasErrorUpdate(null));
      dispatch(slice.actions.loadingUpdate(false));
    } catch (error) {
      dispatch(slice.actions.hasErrorUpdate(error.response.data));
      dispatch(slice.actions.loadingUpdate(false));
    }
  };
}

export function deleteInventory(id) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorDelete(null));
      dispatch(slice.actions.loadingDelete(true));
      const res = await axios.delete(`/inventory/${id}`);
      dispatch(
        openSnackbar({
          open: true,
          message: res.data?.message,
          variant: 'alert',
          alert: {
            color: 'success',
          },
          close: true,
        })
      );
      dispatch(slice.actions.hasErrorDelete(null));
      dispatch(slice.actions.loadingDelete(false));
    } catch (error) {
      dispatch(slice.actions.hasErrorDelete(error.response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: `Error: ${error?.response?.status} - ${error.response?.data?.message || 'Gagal menghapus data'} `,
          variant: 'alert',
          alert: {
            color: 'error',
          },
          close: true,
        })
      );
      dispatch(slice.actions.loadingDelete(false));
    }
  };
}
