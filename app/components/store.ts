import { Action, configureStore, ThunkAction, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/userApi/api";
import { userApi } from "../api/userApi/userApi";
import userSlice from "../feature/userSlice";

import {
  persistStore,
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ Only persist userSlice — never persist RTK Query cache
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userSlice"],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,         // "JOB_Api"
  [userApi.reducerPath]: userApi.reducer, // "userApi"
  userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware, userApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// ✅ RTK 2.x typed hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppThunk<ReturnType = void> = ThunkAction
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;