import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
            state.spaces = Array.from(
                { length: action.payload }, 
                (_, i) => ({ id: i + 1 })
            );
        },
        addCar(state, action: PayloadAction<Car>) {
            const emptySpaces = state.spaces.filter(space => !space.car);
            if (emptySpaces.length > 0) {
                const randomIndex = Math.floor(Math.random() * emptySpaces.length);
                emptySpaces[randomIndex].car = action.payload;
            } else {
                console.error('No empty spaces available');
            }
        },
        removeCar(state, action: PayloadAction<number>) {
            const space = state.spaces.find(space => space.id === action.payload);
            if (space && space.car) {
                delete space.car;
            }
        },
    },
});

export{};
export const { setTotalSpaces, addCar, removeCar } = parkingSlice.actions;
export default parkingSlice.reducer;
