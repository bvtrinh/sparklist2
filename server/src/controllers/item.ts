import { RequestHandler } from "express";
import { Item, IItem } from "../models/item.model";

const validateItem = (item: any) => {
  for (var key in item) {
    if (item[key] == "") return false;
  }
  return true;
};

export const createItem: RequestHandler = async (req, res) => {
  const itemData = req.body;

  // validate itemData
  if (!validateItem(itemData)) {
    return res.status(422).json({
      message: `Invalid item data`,
      error: true,
    });
  }

  // create item object with Item Interface
  const newItem: IItem = new Item({
    ...itemData,
    priceHistory: [
      {
        price: itemData.currentPrice,
        date: new Date(),
      },
    ],
    createData: new Date(),
    modifyDate: new Date(),
    valid: true,
    count: 1,
  });

  // Write to DB
  try {
    await newItem.save();
    return res.status(200).json({ message: "Created the Item.", error: false });
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
