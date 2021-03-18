import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { checkAuth, getUser } from "./authSession";
import { userInfo, logout } from "../api/auth";

export enum UserFields {
  FIRSTNAME = "FIRSTNAME",
  LASTNAME = "LASTNAME",
  EMAIL = "EMAIL",
}

export type UserProps = {
  [k in keyof typeof UserFields]: string;
};

interface UserContextProps {
  user: UserProps;
  setUserField: (field: UserFields, value: string) => void;
  logoutHandler: () => Promise<void>;
}
const initialUserContext: UserContextProps = {
  user: {
    FIRSTNAME: "",
    LASTNAME: "",
    EMAIL: "",
  },
  setUserField: (_, __) => console.log("err"),
  logoutHandler: async () => console.log("err"),
};

export const UserContext = React.createContext<UserContextProps>(initialUserContext);

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProps>(getUser());
  const history = useHistory();

  const setUserField = (field: UserFields, value: string) => {
    setUser((oldUser) => {
      let copyUser = { ...oldUser };
      copyUser[field] = value;
      return copyUser;
    });
  };

  const logoutHandler = async () => {
    await logout();
    history.push("/");
  };

  // If nothing is stored in localStorage, then make a request to see if
  // the user has a session on the server
  useEffect(() => {
    (async () => {
      try {
        if (!checkAuth()) {
          const res = await userInfo();
          if (res.status !== 200) throw new Error("Could not retrieve user data.");
          console.log(res.data.user);

          setUserField(UserFields.FIRSTNAME, res.data.user.firstName);
          setUserField(UserFields.LASTNAME, res.data.user.lastLame);
          setUserField(UserFields.EMAIL, res.data.user.email);
          console.log(user);
        }
      } catch (err) {
        history.push("/");
      }
    })();
  }, [history, user]);

  return (
    <UserContext.Provider value={{ user, setUserField, logoutHandler }}>
      {children}
    </UserContext.Provider>
  );
};
