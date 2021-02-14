import React from "react";

interface TwitterBtnProps {
  url?: string;
}

const BASE_URL = "http://localhost:5000/api";

export const TwitterButton = ({ url }: TwitterBtnProps) => {
  const endpoint = url ?? "/u/twitter-login";
  return (
    <div>
      <a href={`${BASE_URL}${endpoint}`}>
        <img src="/images/twitter-btn.png" alt="twitter login btn" />
      </a>
    </div>
  );
};
