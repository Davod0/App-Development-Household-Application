import { configureStore } from "@reduxjs/toolkit";
import householdReducer from "./householdReducer";
import userReducer from "./userReducer";


export const store = configureStore({
    reducer: {
        user: userReducer,
        household: householdReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
