import React from "react";
import { Heading } from "@chakra-ui/react";
import { UserContext } from "../../helpers/UserContext";

export const Dashboard = () => {
  return (
    <UserContext.Consumer>
      {(context) => <Heading>Hello {context.user.FIRSTNAME}!</Heading>}
    </UserContext.Consumer>
  );
};
