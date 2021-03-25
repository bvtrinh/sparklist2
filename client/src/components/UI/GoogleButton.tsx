import React from "react";
import { Box, Link, Image } from "@chakra-ui/react";

interface GoogleBtnProps {
  url?: string;
}

const BASE_URL = "http://localhost:5000/api";

export const GoogleButton = ({ url }: GoogleBtnProps) => {
  const endpoint = url ?? "/u/google-login";

  return (
    <Box>
      <Link href={`${BASE_URL}${endpoint}`}>
        <Image src="/images/google-btn.png" alt="google login btn" />
      </Link>
    </Box>
  );
};
