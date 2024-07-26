import React, { useState } from 'react';
import SetSpaces from './components/SetSpaces';
import ParkingLot from './components/ParkingLot';

const App: React.FC = () => {
    const [spacesSet, setSpacesSet] = useState(false);

    return (
        <div>
            {!spacesSet ? (
                <SetSpaces onSetSpaces={() => setSpacesSet(true)} />
            ) : (
                <ParkingLot />
            )}
        </div>
    );
};

export default App;
export{};