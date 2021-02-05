import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Profile } from "./components/pages/Profile";
import { Login } from "./components/pages/Login";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Test</h1>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
