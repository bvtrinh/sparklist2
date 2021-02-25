import React from "react";

interface GoogleBtnProps {
  url?: string;
}

const BASE_URL = "http://localhost:5000/api";

export const GoogleButton = ({ url }: GoogleBtnProps) => {
  const endpoint = url ?? "/u/google-login";
  return (
    <div>
      <a href={`${BASE_URL}${endpoint}`}>
        <img src="/images/google-btn.png" alt="google login btn" />
      </a>
    </div>
  );
};
