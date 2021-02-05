import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { userInfo, logout } from "../../api/auth";
import { checkAuth, getItem } from "../../helpers/authSession";

export const Profile: React.FC = () => {
  const [email, setEmail] = useState<string>(getItem("email"));
  const [firstName, setFirstName] = useState<string>(getItem("firstName"));
  const [lastName, setLastName] = useState<string>(getItem("lastName"));
  const history = useHistory();
  useEffect(() => {
    (async () => {
      try {
        if (!checkAuth()) {
          const res = await userInfo();
          if (res.status !== 200)
            throw new Error("Could not retrieve user data.");

          setEmail(res.data.user.email);
          setFirstName(res.data.user.firstName);
          setLastName(res.data.user.lastName);
        }
      } catch (err) {
        history.push("/");
      }
    })();
  }, [history]);

  const logoutHandler = async () => {
    await logout();
    history.push("/");
  };

  let userData = null;
  if (checkAuth()) {
    userData = (
      <ul>
        <li>Email: {email}</li>
        <li>First Name: {firstName}</li>
        <li>Last Name: {lastName}</li>
      </ul>
    );
  }
  return (
    <div>
      Authenticated!
      {userData}
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
