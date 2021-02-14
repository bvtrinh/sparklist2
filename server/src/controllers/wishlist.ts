import { RequestHandler } from "express";
import { validateWishlistName } from "../middleware/validation";
import { IWishlist, Wishlist } from "../models/wishlist.model";

export const createWishlist: RequestHandler = async (req, res) => {
  const wishlistData = req.body;

  try {
    // check if owner has another wishlist with same name
    if (!(await validateWishlistName(wishlistData))) {
      throw new Error("Wishlist with that name already exists, please try again.");
    }
    const newWishlist: IWishlist = new Wishlist(wishlistData);
    await newWishlist.save();
    return res.status(200).json({ message: "Created the Item.", error: false });
  } catch (err) {
    return res.status(500).json({
      payload: err.error,
      message: err.message,
      error: true,
    });
  }
};

export const getOwnWishlists: RequestHandler = async (req, res) => {
  const { owner } = req.body;

  try {
    const wishlists = await Wishlist.find({ owner: owner });
    return res.status(200).json({
      payload: wishlists,
      message: "Success retrieving own wishlists",
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      payload: err,
      message: "Error retrieving own wishlists",
      error: true,
    });
  }
};

export const getSharedWishlists: RequestHandler = async (req, res) => {
  const { id } = req.body;

  try {
    // get all wishlists and filter by shared users
    const wishlists: IWishlist[] = await Wishlist.find();
    const sharedWishlists = wishlists.filter((wishlist) => wishlist.sharedUsers.includes(id));

    return res.status(200).json({
      payload: sharedWishlists,
      message: "Success retrieving shared wishlists",
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      payload: err,
      message: "Error retrieving shared wishlists",
      error: true,
    });
  }
};

export const deleteWishlist: RequestHandler = async (req, res) => {
  const { userId, wishlistId } = req.body;

  try {
    await Wishlist.deleteOne({ _id: wishlistId, owner: userId });
    return res.status(200).json({
      message: "Deleted the wishlist",
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      payload: err,
      message: "Error while deleting wishlists",
      error: true,
    });
  }
};
