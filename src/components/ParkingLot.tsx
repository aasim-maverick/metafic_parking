import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addCar } from '../store/parkingSlice';
import { Container, Grid, Button, TextField, Box } from '@mui/material';
import ParkingSpace from './ParkingSpace';
import { ParkingSpace as ParkingSpaceType } from '../types';

const ParkingLot: React.FC = () => {
    const [registration, setRegistration] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const spaces = useSelector((state: RootState) => state.parking.spaces) as ParkingSpaceType[];
    const dispatch = useDispatch();

    const handleAddCar = () => {
        const registrationRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/i;

        if (!registrationRegex.test(registration)) {
            alert('Invalid registration number. Please enter a valid Indian car registration number (e.g., MP09AB1234) without any spaces.');
            return;
        }
        if (spaces.some(space => space.car && space.car.registration === registration)) {
            alert('This car registration number already exists in the parking lot.');
            return;
        }

        if (spaces.some(space => !space.car)) {
            dispatch(addCar({ registration, startTime }));
        } else {
            alert('Parking is full');
        }
    };

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <TextField
                    label="Car Registration"
                    value={registration}
                    onChange={e => setRegistration(e.target.value.replace(/\s+/g, '').toUpperCase())} 
                    fullWidth
                />
                <Button onClick={handleAddCar} variant="contained" sx={{ mt: 2 }}>
                    Add Car
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
export{};