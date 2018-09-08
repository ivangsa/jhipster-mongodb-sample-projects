export interface ICustomer {
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}

export class Customer implements ICustomer {
    constructor(
        public id?: string,
        public username?: string,
        public password?: string,
        public email?: string,
        public firstName?: string,
        public lastName?: string
    ) {}
}
