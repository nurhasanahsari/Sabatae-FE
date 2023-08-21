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

  loadingCategory: false,
  loadingLog: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  categories: [],
};

const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // LOADING
    loadingCategory(state, action) {
      state.loadingCategory = action.payload;
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
    getCategoriesSuccess(state, action) {
      state.categories = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCategories(param) {
  return async () => {
    try {
      dispatch(slice.actions.loadingCategory(true));
      const response = await axios.get(`/category/table${param || ''}`);
      dispatch(slice.actions.getCategoriesSuccess(response.data.data));
      dispatch(slice.actions.loadingCategory(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.loadingCategory(false));
    }
  };
}

export function createCategory(body) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorCreate(null));
      dispatch(slice.actions.loadingCreate(true));
      const res = await axios.post(`/category`, body);
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

export function editCategory(body, id) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorUpdate(null));
      dispatch(slice.actions.loadingUpdate(true));
      const res = await axios.patch(`/category/${id}`, body);

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

export function deleteCategory(id) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorDelete(null));
      dispatch(slice.actions.loadingDelete(true));
      const res = await axios.delete(`/category/${id}`);
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
