export interface ICustomer {
  id?: string;
  username?: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const defaultValue: Readonly<ICustomer> = {};
