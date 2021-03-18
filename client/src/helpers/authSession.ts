import { UserProps } from "../helpers/UserContext";
export type User = {
  email: string;
  firstName: string;
  lastName: string;
};
export const checkAuth = () => {
  const user = localStorage.getItem("email");
  return user ? true : false;
};

export const setAuth = (user: User) => {
  localStorage.setItem("email", user.email);
  localStorage.setItem("firstName", user.firstName);
  localStorage.setItem("lastName", user.lastName);
};

export const getUser = () => {
  const user: UserProps = {
    FIRSTNAME: localStorage.getItem("firstName") ?? "",
    LASTNAME: localStorage.getItem("lastName") ?? "",
    EMAIL: localStorage.getItem("email") ?? "",
  };
  return user;
};

export const clearAuth = () => {
  localStorage.clear();
};
