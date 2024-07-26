import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
interface Car {
    registration: string;
    startTime: Date;
}

interface ParkingSpace {
    id: number;
    car?: Car;
}

interface ParkingState {
    spaces: ParkingSpace[];
}

const initialState: ParkingState = {
    spaces: [],
};

const parkingSlice = createSlice({
    name: 'parking',
    initialState,
    reducers: {
        setTotalSpaces(state, action: PayloadAction<number>) {
            state.spaces = Array.from({ length: action.payload }, (_, i) => ({ id: i + 1 }));
        },
        addCar(state, action: PayloadAction<Car>) {
            const emptySpace = state.spaces.find(space => !space.car);
            if (emptySpace) {
                emptySpace.car = action.payload;
            }
        },
        removeCar(state, action: PayloadAction<number>) {
            const space = state.spaces.find(space => space.id === action.payload);
            if (space) {
                delete space.car;
            }
        },
    },
});

export {};
export const { setTotalSpaces, addCar, removeCar } = parkingSlice.actions;
export default parkingSlice.reducer;

