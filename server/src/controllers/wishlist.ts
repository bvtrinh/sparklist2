import { RequestHandler } from "express";
import { validateWishlistName } from "../middleware/validation";
import { IWishlist, Wishlist } from "../models/wishlist.model";

export const createWishlist: RequestHandler = async (req, res) => {
  const wishlistData = req.body;

  try {
    // check if owner has another wishlist with same name
    if (!(await validateWishlistName(wishlistData))) {
      return res.status(422).json({
        message: "Wishlist with that name already exists, please try again.",
        error: true,
      });
    }
    const newWishlist: IWishlist = new Wishlist(wishlistData);
    await newWishlist.save();
    return res
      .status(201)
      .json({ payload: newWishlist, message: "Created the Wishlist.", error: false });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      payload: err.error,
      message: err.message,
      error: true,
    });
  }
};

export const getOneWishlist: RequestHandler = async (req, res) => {
  const { wishlistId, userId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ _id: wishlistId });

    // check if this user is either owner or wishlist is shared with them
    if (!wishlist.owner === userId && !wishlist.sharedUsers.includes(userId)) {
      throw new Error("You do not have the permissions to access this wishlist.");
    }

    return res.status(200).json({
      payload: wishlist,
      message: "Success retrieving one wishlist",
      error: false,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      payload: err,
      message: "Error retrieving one wishlist",
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
    console.error(err);
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
    // get all wishlists shared with user
    const sharedWishlists: IWishlist[] = await Wishlist.find({ sharedUsers: { $all: [id] } });

    return res.status(200).json({
      payload: sharedWishlists,
      message: "Success retrieving shared wishlists",
      error: false,
    });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    return res.status(500).json({
      payload: err,
      message: "Error while deleting wishlist",
      error: true,
    });
  }
};

export const addItem: RequestHandler = async (req, res) => {
  const { itemId, wishlistId, userId } = req.body;

  try {
    const wishlist: IWishlist = await Wishlist.findOne({ _id: wishlistId, owner: userId });

    if (wishlist) {
      wishlist.items.push(itemId);
      wishlist.modifyDate = new Date();
      await wishlist.save();
      return res.status(200).json({
        message: "Item added to wishlist",
        error: false,
      });
    } else {
      throw new Error("Cannot find wishlist.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      payload: err,
      message: "Error while adding item to wishlist",
      error: true,
    });
  }
};

export const updateWishlist: RequestHandler = async (req, res) => {
  const { id, name, items, sharedUsers } = req.body;

  try {
    const wishlist = await Wishlist.findById(id);
    wishlist.name = name;
    wishlist.items = items;
    wishlist.sharedUsers = sharedUsers;
    wishlist.modifyDate = new Date();

    await wishlist.save();
    return res.status(200).json({
      payload: wishlist,
      message: "Wishlist updated successfully",
      error: false,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      payload: err,
      message: "Error while updating wishlist",
      error: true,
    });
  }
};
