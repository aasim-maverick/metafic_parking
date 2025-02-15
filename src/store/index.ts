import { configureStore } from '@reduxjs/toolkit';
import parkingReducer from './parkingSlice';

export const store = configureStore({
    reducer: {
        parking: parkingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export {};