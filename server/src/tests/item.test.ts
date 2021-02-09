import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env.development") });
import { connect, disconnect } from "../models/connect";
import { updateItem } from "../controllers/item";
// import { Item } from "../models/item.model";

const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);

const itemData = {
  title: "Sony Over-Ear Noise Cancelling Bluetooth Headphones (WH-1000XM4/B) - Black",
  currentPrice: 499.99,
  url: "https://www.bestbuy.ca/en-ca/product/14777258",
  imageURL: "https://multimedia.bbycastatic.ca/multimedia/products/500x500/147/14777/14777258.jpg",
};

const updatedItemData = {
  title: "Sony WH-1000XM4",
  currentPrice: 349.99,
  url: "https://www.bestbuy.ca/en-ca/product/14777258",
  imageURL: "https://multimedia.bbycastatic.ca/multimedia/products/500x500/147/14777/14777258.jpg",
};

const secondItemData = {
  title: "Jordan Retro 5",
  currentPrice: 255,
  url: "https://www.footlocker.ca/en/product/jordan-retro-5-mens/4100636.html",
  imageURL: "https://images.footlocker.com/is/image/EBFL2/4100636_a1?wid=630&hei=630&fmt=png-alpha",
};

let itemId: string;
let secondItemId: string;

describe("Item Endpoints", () => {
  beforeAll(async () => {
    connect(false);
  });

  afterAll(async () => {
    disconnect();
  });

  test("create an item", async () => {
    const res = await request.post("/api/i/").send(itemData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("payload");
    const payload = res.body.payload;

    expect(payload.title).toEqual(itemData.title);
    expect(payload.currentPrice).toEqual(itemData.currentPrice);
    expect(payload.url).toEqual(itemData.url);
    expect(payload.imageURL).toEqual(itemData.imageURL);

    itemId = payload._id;
  });

  test("add duplicate item", async () => {
    const res = await request.post("/api/i/").send(itemData);
    expect(res.statusCode).toEqual(422);
  });

  test("get 1 item", async () => {
    const res = await request.get(`/api/i/${itemId}`);
    const payload = res.body.payload;

    expect(payload.title).toEqual(itemData.title);
    expect(payload.currentPrice).toEqual(itemData.currentPrice);
    expect(payload.url).toEqual(itemData.url);
    expect(payload.imageURL).toEqual(itemData.imageURL);
  });

  test("create second item", async () => {
    const res = await request.post("/api/i/").send(secondItemData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("payload");
    const payload = res.body.payload;

    expect(payload.title).toEqual(secondItemData.title);
    expect(payload.currentPrice).toEqual(secondItemData.currentPrice);
    expect(payload.url).toEqual(secondItemData.url);
    expect(payload.imageURL).toEqual(secondItemData.imageURL);

    secondItemId = payload._id;
  });

  test("get all items", async () => {
    const res = await request.get("/api/i/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("payload");

    const payload = res.body.payload;
    expect(payload.length).toEqual(2);
    expect(payload[0].title).toEqual(updatedItemData.title);
    expect(payload[1].title).toEqual(secondItemData.title);
  });

  test("delete items", async () => {
    let res = await request.delete(`/api/i/${itemId}`);
    expect(res.statusCode).toEqual(200);

    res = await request.delete(`/api/i/${secondItemId}`);
    expect(res.statusCode).toEqual(200);
  });
});
