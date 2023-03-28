import { createContext, FC, useEffect, useState } from "react";
import IUser from "../interfaces/IUser.interface";
import IUserContext from "../interfaces/IUserContext.interface";

const defaultState = {
  isAuthenticated: false,
  user: null,
  setUser: (user: IUser | null) => {},
  setIsAuthenticated: (isAuthenticated: boolean) => {}
};

const AuthContext = createContext<IUserContext>(defaultState);

export const AuthProvider: FC<React.ReactNode> = ({children}: any) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    !user && fetch('auth')
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json()
      }
    })
    .then(user => {
      if (user) {
        console.log('user in context: ', user)
        setUser(user);
        setIsAuthenticated(true);
      }
    })
  })

  return <AuthContext.Provider value={{
    user, setUser, isAuthenticated, setIsAuthenticated
  }}>
    {children}
  </AuthContext.Provider>;
}

export default AuthContext
