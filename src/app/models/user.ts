import { Address } from "./address";
import { Role } from "./role";

export class User {
    id: number | undefined ;
    role : Role;
    firstName: string | undefined ;
    lastName: string | undefined ;
    dob: string  | undefined ;
    email: string | undefined ;
    phone: string | undefined ;
    address: Address;
    dateJoined: string | undefined ;
    activeStatus: boolean | undefined ;
    username: string | undefined ;
}
