import React from "react";
import { Switch, Route } from "react-router-dom";
import { Navbar } from "./components/UI/Navbar/Navbar";
import { Profile } from "./components/pages/Profile";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import "./css/App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <h1>Testing Authentication</h1>
      <Switch>
        <Route path="/invite/:id" component={Signup} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
