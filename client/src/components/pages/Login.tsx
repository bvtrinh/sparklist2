import React from "react";
import { GoogleButton } from "../UI/GoogleButton";
import { TwitterButton } from "../UI/TwitterButton";

export const Login: React.FC = () => {
  return (
    <div>
      <GoogleButton />
      <TwitterButton />
    </div>
  );
};
