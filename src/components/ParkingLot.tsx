import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addCar, addCarRandomly } from '../store/parkingSlice';
import { Container, Grid, Button, TextField, Box } from '@mui/material';
import ParkingSpace from './ParkingSpace';
import { ParkingSpace as ParkingSpaceType } from '../types';

const ParkingLot: React.FC = () => {
    const [registration, setRegistration] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const spaces = useSelector((state: RootState) => state.parking.spaces) as ParkingSpaceType[];
    const dispatch = useDispatch();

    const validateRegistration = () => {
        if (!registration) {
            alert("Enter registration details of the vehicle.");
            return false;
        }

        const registrationRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/i;
        if (!registrationRegex.test(registration)) {
            alert('Invalid registration number. Please enter a valid Indian car registration number (e.g., MH12AB1234) without any spaces.');
            return false;
        }

        if (spaces.some(space => space.car && space.car.registration === registration)) {
            alert('This car registration number already exists in the parking lot.');
            return false;
        }

        return true;
    };

    const handleAddCar = () => {
        if (!validateRegistration()) return;

        // Find the first empty space and add the car
        for (const space of spaces) {
            if (!space.car) {
                dispatch(addCar({ registration, startTime }));
                return;
            }
        }

        alert('Parking is full');
    };

    const handleAddCarRandomly = () => {
        if (!validateRegistration()) return;

        dispatch(addCarRandomly({ registration, startTime }));
    };

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <TextField
                    label="Car Registration"
                    value={registration}
                    onChange={e => setRegistration(e.target.value.toUpperCase())}
                    fullWidth
                />
                <Button onClick={handleAddCar} variant="contained" sx={{ mt: 2 }}>
                    Add Car
                </Button>
                <Button onClick={handleAddCarRandomly} variant="contained" sx={{ mt: 2, ml: 2 }}>
                    Add Car Randomly
                </Button>
            </Box>
            <Grid container spacing={2}>
                {spaces.map(space => (
                    <Grid item xs={4} key={space.id}>
                        <ParkingSpace space={space} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ParkingLot;
export {};
