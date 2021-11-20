import { persistReducer } from "redux-persist";
import { combineReducers, createStore } from "redux";
import AsyncStorage from "@react-native-community/async-storage";

// Import Reducers
import userInfoReducer from "./store/userInfo";

// Declare store's Persist Config
// We should write whitelist that what reducer to be persists
const rootPersistConfig = {
    key: "root",
    storage: AsyncStorage,
};

// Combine Multiple reducers into single Reducer
// If you make some reducer persist, then use persistReducer like below
// Reducer that will be persisted must be written its name in rootPersistConfig's whitelist
const combinedReducer = combineReducers({
    userInfo: userInfoReducer,
});

// Make Store with combinedReducer and Make PersistStore with store
// To store information persistently, we have to use persist
const persistedReducer = persistReducer(rootPersistConfig, combinedReducer);
const store = createStore(persistedReducer);

export default store;
