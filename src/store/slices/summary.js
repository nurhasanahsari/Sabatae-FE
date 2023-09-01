import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import axios from '@/utils/axios';

// ==============================|| SLICE - USER ||============================== //

const initialState = {
  error: null,
  errorUpdate: null,
  errorCreate: null,
  errorDelete: null,

  loadingSummary: false,
  loadingLog: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  summary: [],
};

const slice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    // LOADING
    loadingSummary(state, action) {
      state.loadingSummary = action.payload;
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
    getSummarySuccess(state, action) {
      state.summary = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getSummary(param) {
  return async () => {
    try {
      dispatch(slice.actions.loadingSummary(true));
      const response = await axios.get(`/summary${param || ''}`);
      dispatch(slice.actions.getSummarySuccess(response.data.data));
      dispatch(slice.actions.loadingSummary(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.loadingSummary(false));
    }
  };
}
