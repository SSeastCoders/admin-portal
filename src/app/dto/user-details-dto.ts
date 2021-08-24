export class UserDetailsDto {
  id: number | undefined;
  role: string;
  firstName: string | undefined;
  lastName: string | undefined;

  email: string | undefined;
  phone: string | undefined;

  activeStatus: boolean | undefined;
  username: string | undefined;
}
