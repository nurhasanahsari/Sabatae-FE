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

  loading: false,
  loadingUser: false,
  loadingLog: false,
  loadingSummary: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  users: [],
  activities: [],
  summaryCounter: {
    count_all: 16,
    count_admin: 3,
    count_instructor: 1,
    count_student: 12,
  },
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // LOADING
    loading(state, action) {
      state.loading = action.payload;
    },
    loadingUser(state, action) {
      state.loadingUser = action.payload;
    },
    loadingLog(state, action) {
      state.loadingLog = action.payload;
    },
    loadingSummary(state, action) {
      state.loadingSummary = action.payload;
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
    getUserSuccess(state, action) {
      state.users = action.payload;
    },
    getLogSuccess(state, action) {
      state.activities = action.payload;
    },
    getSummaryCounterSuccess(state, action) {
      state.summaryCounter = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsers(param) {
  return async () => {
    try {
      dispatch(slice.actions.loadingUser(true));
      const response = await axios.get(`/user/table${param || ''}`);
      dispatch(slice.actions.getUserSuccess(response.data.data));
      dispatch(slice.actions.loadingUser(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.loadingUser(false));
    }
  };
}

export function createUser(body) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorCreate(null));
      dispatch(slice.actions.loadingCreate(true));
      const res = await axios.post(`/user`, body);
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

export function editUser(body, id) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorUpdate(null));
      dispatch(slice.actions.loadingUpdate(true));
      const res = await axios.patch(`/user/${id}`, body);

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

export function changePassword(body, id) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorUpdate(null));
      dispatch(slice.actions.loadingUpdate(true));
      const res = await axios.patch(`/user/changePassword/${id}`, body);

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

export function deleteUser(id) {
  return async () => {
    try {
      dispatch(slice.actions.hasErrorDelete(null));
      dispatch(slice.actions.loadingDelete(true));
      const res = await axios.delete(`/user/${id}`);
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
