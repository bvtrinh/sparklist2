import React from "react";
import { Heading } from "@chakra-ui/react";
import { UserContext } from "../../helpers/UserContext";
import { checkAuth } from "../../helpers/authSession";

export const Dashboard = () => {
  return (
    <UserContext.Consumer>
      {(context) =>
        checkAuth() ? (
          <Heading>Hello {context.user.FIRSTNAME}!</Heading>
        ) : (
          <Heading>Welcome to SparkList!</Heading>
        )
      }
    </UserContext.Consumer>
  );
};
