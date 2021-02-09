import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { scrapeURL } from "../middleware/scraping";
import { Item, IItem } from "../models/item.model";
import { itemInfo } from "../scripts/scraping";

export const createItem: RequestHandler = async (req, res) => {
  const { url } = req.body;

  // validate URL
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const itemData = await scrapeURL(url);

  // create item object with Item Interface
  const newItem: IItem = new Item({
    ...itemData,
    priceHistory: [
      {
        price: itemData?.currentPrice,
        date: new Date(),
      },
    ],
  });

  // Write to DB
  try {
    await newItem.save();
    return res.status(200).json({ payload: newItem, message: "Created the Item.", error: false });
  } catch (err) {
    console.log(err);

    // In case of duplicate key errors
    if (err.code === 11000) {
      return res.status(422).json({
        payload: err,
        message: `Duplicate key error (${JSON.stringify(err.keyValue)})`,
        error: true,
      });
    }
  }
};

export const getAllItems: RequestHandler = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json({
      payload: items,
      message: "Success, retrieved all Items",
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      payload: err,
      message: "Error retrieving Items",
      error: true,
    });
  }
};

export const getOneItem: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    return res.status(200).json({
      payload: item,
      message: "Success retrieving single Item",
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      payload: err,
      message: "Error retrieving single Item",
      error: true,
    });
  }
};

export const getItemsPaginated: RequestHandler = async (req, res) => {
  const limit: number = +req.params.limit;
  const page: number = +req.params.page;

  try {
    const items = await Item.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    return res.status(200).json({
      payload: items,
      message: `Success retrieving ${limit} Items`,
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      payload: err,
      message: `Error retrieving ${limit} Items`,
      error: true,
    });
  }
};

export const updateItem: RequestHandler = async (req, res) => {
  // Extract information from URL
  const id = req.params.id;
  const updatedItem: IItem = req.body;

  // Find the Item in DB
  try {
    const item = await Item.findById(id);
    if (!item) {
      // ID does not exist
      throw new Error("ID does not exist");
    }

    // update modifyDate
    updatedItem.modifyDate = new Date();

    // Update on DB
    await Item.updateOne({ _id: id }, updatedItem);

    return res.status(200).json({
      payload: updatedItem,
      message: "Updated the Item.",
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ payload: err, message: err.message, error: true });
  }
};

export const deleteItem: RequestHandler = async (req, res) => {
  const id = req.params.id;

  try {
    await Item.deleteOne({ _id: id });
    return res.status(200).json({ message: "Deleted the Item.", error: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ payload: err, message: err.message, error: true });
  }
};
