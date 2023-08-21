// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import categoryReducer from './slices/category';
import inventoryReducer from './slices/inventory';
import mainReducer from './slices/main';
import menuReducer from './slices/menu';
import snackbarReducer from './slices/snackbar';
import transactionReducer from './slices/transaction';
import userReducer from './slices/user';

// pages
// import masterReducer from './slices/master';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  main: persistReducer(
    {
      key: 'main',
      storage,
      keyPrefix: 'sabatae-',
    },
    mainReducer
  ),
  category: categoryReducer,
  inventory: inventoryReducer,
  menu: menuReducer,
  snackbar: snackbarReducer,
  transaction: transactionReducer,
  user: userReducer,
});

export default reducer;
