import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { scrapeURL } from "../middleware/scraping";
import { Item, IItem } from "../models/item.model";
import { validateItemData } from "../middleware/validation";

export const createItem: RequestHandler = async (req, res) => {
  const { url } = req.body;

  // validate URL
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // check if item already exists, return item as payload if it does
  const existingItem = await Item.findOne({ url: url });
  if (existingItem) {
    return res
      .status(200)
      .json({ payload: existingItem, message: "Found existing item.", error: false });
  }

  const itemData = await scrapeURL(url);

  // validate scraped data
  if (!validateItemData(itemData)) {
    return res.status(422).json({
      message: `Error fetching item data`,
      error: true,
    });
  }

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
    return res.status(201).json({ payload: newItem, message: "Created the Item.", error: false });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    return res.status(500).json({
      payload: err,
      message: "Error retrieving single Item",
      error: true,
    });
  }
};

export const getAllItems: RequestHandler = async (req, res) => {
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
    console.error(err);
    return res.status(500).json({
      payload: err,
      message: `Error retrieving ${limit} Items`,
      error: true,
    });
  }
};

export const deleteItem: RequestHandler = async (req, res) => {
  const id = req.params.id;

  try {
    await Item.deleteOne({ _id: id });
    return res.status(200).json({ message: "Deleted the Item.", error: false });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ payload: err, message: err.message, error: true });
  }
};
