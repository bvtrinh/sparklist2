export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
};
export const checkAuth = () => {
  const user = localStorage.getItem("email");
  return user ? true : false;
};

export const setAuth = (user: User) => {
  localStorage.setItem("userId", user._id);
  localStorage.setItem("email", user.email);
  localStorage.setItem("firstName", user.firstName);
  localStorage.setItem("lastName", user.lastName);
};

export const getItem = (val: string) => {
  const value = localStorage.getItem(val);
  return value ? value : "";
};

export const clearAuth = () => {
  localStorage.clear();
};
