import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { NavBar } from "./components/UI/Navbar/NavBar";
import { Profile } from "./components/pages/Profile";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import "./css/App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Container maxW={["100vw", "100vw", "100vw", "75vw"]}>
        <Switch>
          <Route path="/invite/:id" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
