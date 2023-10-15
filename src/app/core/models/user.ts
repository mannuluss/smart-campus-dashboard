/**
 * User of the application.
 *
 */
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  rol: string;
  roles?: Roles[];
}

export interface Roles {
  admin: boolean;
}
