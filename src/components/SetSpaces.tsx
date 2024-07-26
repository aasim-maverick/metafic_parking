import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTotalSpaces } from '../store/parkingSlice';
import { TextField, Button, Container } from '@mui/material';

interface SetSpacesProps {
    onSetSpaces: () => void;
}

const SetSpaces: React.FC<SetSpacesProps> = ({ onSetSpaces }) => {
    const [spaces, setSpaces] = useState(0);
    const dispatch = useDispatch();

    const handleSetSpaces = () => {
        if (spaces === 0){
            alert("Set non zero parking space(s).")
            return;
        }
        dispatch(setTotalSpaces(spaces));
        onSetSpaces();
    };

    return (
        <Container>
            <TextField
                label="Number of Spaces"
                value={spaces}
                onChange={(e) => setSpaces(Number(e.target.value))}
                fullWidth
            />
            <Button onClick={handleSetSpaces} variant="contained">
                Set Spaces
            </Button>
        </Container>
    );
};

export default SetSpaces;

export{};