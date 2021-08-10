

export class Account {
    id: number;
    accountType: string | undefined;
    account_users: 
        [{
            id: number | undefined ;
            userRole : {
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
            username: string | undefined ;}];
    interestRate: number;
    openDate: string | undefined ;
    balance: number;
    activeStatus: boolean | undefined ;
    //transactionLimit: number;
}
