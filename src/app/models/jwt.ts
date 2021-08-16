import { RoleId, RoleTitle } from "./const";

export class JWT {
  typ?: string;
  alg?: string;
  sub?: RoleId;
  role?: RoleTitle;
  exp?: number;
  username?: string;
}
