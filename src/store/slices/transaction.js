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

  loadingTransaction: false,
  loadingTransactionRetur: false,
  loadingLog: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  transactionsPurchase: [],
  transactionsSale: [],
  transactionsRetur: [],
  transactionsRetur2: [],
};

const slice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // LOADING
    loadingTransaction(state, action) {
      state.loadingTransaction = action.payload;
    },
    loadingTransactionRetur(state, action) {
      state.loadingTransactionRetur = action.payload;
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
    getTransactionsPurchaseSuccess(state, action) {
      state.transactionsPurchase = action.payload;
    },
    getTransactionsSaleSuccess(state, action) {
      state.transactionsSale = action.payload;
    },
    getTransactionsReturSuccess(state, action) {
      state.transactionsRetur = action.payload;
    },
    getTransactionsRetur2Success(state, action) {
      state.transactionsRetur2 = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTransactions(param) {
  return async () => {
    try {
      dispatch(slice.actions.loadingTransaction(true));
      const response = await axios.get(`/transaction/table${param || ''}`);
      if (param === '?type=purchase') {
        dispatch(slice.actions.getTransactionsPurchaseSuccess(response.data.data));
      } else if (param === '?type=sale') {
        dispatch(slice.actions.getTransactionsSaleSuccess(response.data.data));
      } else {
        dispatch(slice.actions.getTransactionsReturSuccess(response.data.data));
      }
      dispatch(slice.actions.loadingTransaction(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.loadingTransaction(false));
    }
  };
}

export function getTransactionsRetur(param) {
  return async () => {
    try {
      dispatch(slice.actions.loadingTransactionRetur(true));
      const response = await axios.get(`/transaction/all${param || ''}`);
      if (response?.data?.data?.length === 0) {
        dispatch(slice.actions.getTransactionsRetur2Success('Data tidak ditemukan'));
      } else {
        dispatch(slice.actions.getTransactionsRetur2Success(response?.data?.data[0]));
      }
      dispatch(slice.actions.loadingTransactionRetur(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.loadingTransactionRetur(false));
    }
  };
}

export function createTransaction(body) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorCreate(null));
      dispatch(slice.actions.loadingCreate(true));
      const res = await axios.post(`/transaction`, body);
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

export function createTransactionRetur(body) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorCreate(null));
      dispatch(slice.actions.loadingCreate(true));
      const res = await axios.post(`/transaction/retur`, body);
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
