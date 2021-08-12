export interface User {
  id: number;
  role: {
    id: number;
    title: string;
  };
  firstName: string;
  lastName: string;
  username: string;

  email: string;
  activeStatus: boolean;
}
