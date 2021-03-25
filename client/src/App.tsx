import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { NavBar } from "./components/UI/Navbar/NavBar";
import { Dashboard } from "./components/pages/Dashboard";
import { Profile } from "./components/pages/Profile";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import "./css/App.css";

import { UserContextProvider } from "./helpers/UserContext";

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <NavBar />
      <Container maxW={["100vw", "100vw", "100vw", "75vw"]}>
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/invite/:id" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Container>
    </UserContextProvider>
  );
};

export default App;
