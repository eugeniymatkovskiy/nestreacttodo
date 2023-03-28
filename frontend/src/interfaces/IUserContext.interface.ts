import IUser from "./IUser.interface";

export default interface IUserContext {
  isAuthenticated: boolean,
  user: IUser | null,
  setUser: (user: IUser | null) => void,
  setIsAuthenticated: (isAuthenticated: boolean) => void
}
