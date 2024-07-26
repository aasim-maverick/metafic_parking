export interface Car {
    registration: string;
    startTime: Date;
}

export interface ParkingSpace {
    id: number;
    car?: Car;
}


export{};