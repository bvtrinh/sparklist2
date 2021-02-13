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
