import React from "react";
import { Box, Link, Image } from "@chakra-ui/react";

interface TwitterBtnProps {
  url?: string;
}

const BASE_URL = "http://localhost:5000/api";

export const TwitterButton = ({ url }: TwitterBtnProps) => {
  const endpoint = url ?? "/u/twitter-login";
  return (
    <Box>
      <Link href={`${BASE_URL}${endpoint}`}>
        <Image src="/images/twitter-btn.png" alt="twitter login btn" />
      </Link>
    </Box>
  );
};
