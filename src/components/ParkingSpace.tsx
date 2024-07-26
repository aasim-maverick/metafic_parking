import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCar } from '../store/parkingSlice';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface ParkingSpaceProps {
    space: {
        id: number;
        car?: {
            registration: string;
            startTime: Date;
        };
    };
}

//const calculateCharges = (startTime: Date) => {
  //  const hours = (new Date().getTime() - new Date(startTime).getTime()) / 3600000;
    //return hours <= 2 ? 10 : 10 + Math.ceil(hours - 2) * 10;
//};

// Test karne ke liye
const calculateCharges= (startTime: Date) => {
    const seconds = (new Date().getTime() - new Date(startTime).getTime()) / 1000;
    return seconds <= 10 ? 10 : 10 + Math.ceil((seconds - 10) / 5) * 10;
};

const ParkingSpace: React.FC<ParkingSpaceProps> = ({ space }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleRemoveCar = async () => {
        const charge = calculateCharges(space.car!.startTime);
        await fetch('https://httpstat.us/200', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'car-registration': space.car!.registration,
                charge,
            }),
        });
        dispatch(removeCar(space.id));
        setModalOpen(false);
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">Space {space.id}</Typography>
                {space.car ? (
                    <>
                        <Typography>Car: {space.car.registration}</Typography>
                        <Button onClick={() => setModalOpen(true)} variant="contained">
                            Manage
                        </Button>
                        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                            <DialogTitle>Car Details</DialogTitle>
                            <DialogContent>
                                <Typography>Registration: {space.car.registration}</Typography>
                                <Typography>Start Time: {new Date(space.car.startTime).toLocaleString()}</Typography>
                                <Typography>Charge: ${calculateCharges(space.car.startTime)}</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setModalOpen(false)}>Back</Button>
                                <Button onClick={handleRemoveCar} variant="contained">
                                    Payment Taken
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ) : (
                    <Typography>Empty</Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ParkingSpace;
export{};