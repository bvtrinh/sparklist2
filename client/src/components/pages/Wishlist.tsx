import React, { useEffect, useMemo, useState } from "react";
import { Box, Divider, Heading, SimpleGrid } from "@chakra-ui/react";
import WishlistCard from "./WishlistCard";
import { getItem } from "../../helpers/authSession";
const axios = require("axios");

const Wishlist = () => {
  const [wishlists, setWishlists] = useState<any[]>([]);
  const [sharedWishlists, setSharedWishlists] = useState<any[]>([]);

  useEffect(() => {
    fetchOwnWishlists();
    fetchSharedWishlists();
  }, []);

  useEffect(() => {
    console.log(sharedWishlists);
  }, [sharedWishlists]);

  const fetchOwnWishlists = () => {
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

  const fetchSharedWishlists = () => {
    const userId = getItem("userId");
    return axios
      .get("/api/w/shared/" + userId)
      .then((res: any) => {
        setSharedWishlists(res.data.payload);
      })
      .catch((err: any) => {
        return err;
      });
  };

  const renderOwnWishlists = useMemo(() => {
    const cards = wishlists.map((wishlist) => (
      <WishlistCard wishlist={wishlist} key={wishlist._id} />
    ));
    return cards;
  }, [wishlists]);

  const renderSharedWishlists = useMemo(() => {
    const cards = sharedWishlists.map((wishlist) => (
      <WishlistCard wishlist={wishlist} key={wishlist._id} />
    ));
    return cards;
  }, [sharedWishlists]);

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
        {renderOwnWishlists}
      </SimpleGrid>
      <Heading size="lg" mt="3">
        Shared Wishlists
      </Heading>
      <Divider my="3" />
      <SimpleGrid bg="gray.150" columns={getNumColumns()} spacing={5}>
        {renderSharedWishlists}
      </SimpleGrid>
    </Box>
  );
};

export default Wishlist;
