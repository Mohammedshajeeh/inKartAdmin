import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { inKartReducer } from "./reducer";

const persistConfig = {
    key: 'inKartAdm',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, inKartReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
});


let persistor = persistStore(store)

//store
export { store, persistor }