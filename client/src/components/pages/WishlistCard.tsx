import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Divider, IconButton, Image, SimpleGrid } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
const axios = require("axios");

const WishlistCard = (props: any) => {
  const [images, setImages] = useState<string[]>([]);

  const getItemImage = (item: string) => {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/i/" + item)
        .then((res: any) => {
          resolve(res.data.payload.imageURL ?? null);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  const getWishlistImages = useCallback(() => {
    const items = props.wishlist.items.slice(0, 4);
    return Promise.all<string>(
      items.map((item: string) => {
        return getItemImage(item);
      })
    );
  }, [props.wishlist.items]);

  useEffect(() => {
    getWishlistImages().then((imageURLs) => {
      setImages(imageURLs);
    });
  }, [getWishlistImages]);

  const renderCardImages = useMemo(() => {
    const cardImages = [0, 1, 2, 3].map((i) => {
      return <Image src={images[i] ?? "/images/White_square.png"} key={i} alt-text={"alt-text"} />;
    });

    return cardImages;
  }, [images]);

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" key={props.wishlist._id}>
      <SimpleGrid bg="gray.150" columns={2} spacing={5}>
        {renderCardImages}
      </SimpleGrid>

      <Divider />
      <Box m={1} fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {props.wishlist.name}
      </Box>
      <Box m={1} color="gray.500" fontWeight="semibold" fontSize="xs" isTruncated>
        Some description
      </Box>
      <Box m={1}>
        {props.wishlist.items.length} Items
        <IconButton
          float="right"
          colorScheme="blue"
          aria-label="Edit"
          size="sm"
          icon={<EditIcon />}
          mb={1}
        />
      </Box>
    </Box>
  );
};

export default WishlistCard;
