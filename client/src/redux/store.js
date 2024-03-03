import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './slices/userSlice'; 
import orgReducer from './slices/orgSlice';

// Configuration object for redux-persist
const persistConfig = {
  key: 'root', // The key for localStorage
  storage, // The storage engine
  whitelist: ['user', 'org'],
};

// Combine reducers (if you have more reducers, include them here)
const rootReducer = combineReducers({
  user: userReducer,
  org: orgReducer
});

// Apply redux-persist to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
        },
    }).concat(loggerMiddleware), // Add your logger middleware here
});


// Create a persistor for the store
export const persistor = persistStore(store);
