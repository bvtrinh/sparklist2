import React from "react";
import { Button } from "@chakra-ui/react";
import { checkAuth } from "../../helpers/authSession";
import { CreateInviteButton } from "../UI/CreateInviteButton";
import { UserProps, UserContext } from "../../helpers/UserContext";

const UserData: React.FC<UserProps> = ({ EMAIL, FIRSTNAME, LASTNAME }) => (
  <ul>
    <li>Email: {EMAIL}</li>
    <li>First Name: {FIRSTNAME}</li>
    <li>Last Name: {LASTNAME}</li>
  </ul>
);

export const Profile = () => {
  return (
    <UserContext.Consumer>
      {(context) => (
        <div>
          Authenticated!
          {checkAuth() ? <UserData {...context.user} /> : null}
          <CreateInviteButton />
          <Button onClick={context.logoutHandler}>LOGOUT</Button>
        </div>
      )}
    </UserContext.Consumer>
  );
};
