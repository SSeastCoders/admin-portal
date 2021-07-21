export interface User {
    id: number;
    userRole: {
        id: number;
        title: string;
    };
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    phone: string;
    address: {
        streetAddres: string;
        city: string;
        zip: number;
        state: string;
    };
    dateJoined: string;
    activeStatus: boolean;
    username: string;
}