import React from "react";
import { useParams } from "react-router-dom";
import { GoogleButton } from "../UI/GoogleButton";
import { TwitterButton } from "../UI/TwitterButton";

interface RouteParamsProps {
  id: string;
}

export const Signup = () => {
  const { id } = useParams<RouteParamsProps>();
  return (
    <div>
      <h1>Sign Up!</h1>
      <GoogleButton url={`/u/google-signup/${id}`} />
      <TwitterButton url={`/u/twitter-signup/${id}`} />
    </div>
  );
};
