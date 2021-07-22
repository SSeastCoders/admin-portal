export class CreateUser {
    id: number | undefined;
    userRole: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    dob: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    address: {
        streetAddres: string;
        city: string;
        zip: number;
        state: string;
    } | undefined;
    dateJoined: string | undefined;
    activeStatus: boolean | undefined;
    username: string | undefined;
    password: string | undefined;
}