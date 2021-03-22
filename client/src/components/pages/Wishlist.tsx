import React, { useEffect, useMemo, useState } from "react";
import { Box, Divider, Heading, SimpleGrid } from "@chakra-ui/react";
import WishlistCard from "./WishlistCard";
import { getItem } from "../../helpers/authSession";
const axios = require("axios");

const Wishlist = () => {
  const [wishlists, setWishlists] = useState<any[]>([]);

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = () => {
    const userId = getItem("userId");
    return axios
      .get("/api/w/own/owner/" + userId)
      .then((res: any) => {
        setWishlists(res.data.payload);
      })
      .catch((err: any) => {
        return err;
      });
  };

  const renderCards = useMemo(() => {
    const cards = wishlists.map((wishlist) => (
      <WishlistCard wishlist={wishlist} key={wishlist._id} />
    ));
    return cards;
  }, [wishlists]);

  const getNumColumns = () => {
    if (wishlists.length < 4) {
      return 3;
    } else {
      return 5;
    }
  };

  return (
    <Box w="65%" m="auto" p="5">
      <Heading size="lg">Your Wishlists</Heading>
      <Divider my="3" />
      <SimpleGrid bg="gray.150" columns={getNumColumns()} spacing={5}>
        {renderCards}
      </SimpleGrid>
    </Box>
  );
};

export default Wishlist;
