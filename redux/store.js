import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"; 
import appSlice from "./Slice";
import {combineReducers} from "redux";
import {persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

const persistConfig = {
    key: 'themeee',
    storage: AsyncStorage,
}

const reducers = combineReducers({
    app: appSlice
});

const persistedReducer = persistReducer(persistConfig, reducers)
//end of persist

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export default store;