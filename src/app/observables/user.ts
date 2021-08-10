export class User {
    id: number | undefined ;
    role : {
        id: number;
        title: string;
    } | undefined ;
    firstName: string | undefined ;
    lastName: string | undefined ;
    dob: string  | undefined ;
    email: string | undefined ;
    phone: string | undefined ;
    address: {
        streetAddres: string;
        city: string;
        zip: number;
        state: string;
    } | undefined ;
    dateJoined: string | undefined ;
    activeStatus: boolean | undefined ;
    username: string | undefined ;
}