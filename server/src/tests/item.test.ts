import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env.test") });
import { connect, disconnect } from "../models/connect";
import { IItem } from "../models/item.model";

// eslint-disable-next-line
const app = require("../index");
import supertest from "supertest";
const request = supertest(app);

jest.setTimeout(15000);

const itemURLs = [
  { url: "https://www.bestbuy.ca/en-ca/product/14777258" },
  { url: "https://www.footlocker.ca/en/product/jordan-retro-5-mens/4100636.html" },
];

let items: IItem[] = [];

describe("Item Endpoints", () => {
  beforeAll(async () => {
    connect(false);
  });

  afterAll(async () => {
    disconnect();
  });

  test("create an item", async () => {
    const res = await request.post("/api/i/").send(itemURLs[0]);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("payload");
    const payload = res.body.payload;

    expect(payload.title).toBeTruthy();
    expect(payload.currentPrice).toBeTruthy();
    expect(payload.url).toEqual(itemURLs[0].url);
    expect(payload.imageURL).toBeTruthy();

    items.push(payload);
  });

  test("add duplicate item", async () => {
    const res = await request.post("/api/i/").send(itemURLs[0]);
    expect(res.status).toEqual(422);
  });

  test("get 1 item", async () => {
    const res = await request.get(`/api/i/${items[0]._id}`);
    const payload = res.body.payload;

    expect(payload.title).toEqual(items[0].title);
    expect(payload.currentPrice).toEqual(items[0].currentPrice);
    expect(payload.url).toEqual(items[0].url);
    expect(payload.imageURL).toEqual(items[0].imageURL);
  });

  test("create second item", async () => {
    const res = await request.post("/api/i/").send(itemURLs[1]);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("payload");
    const payload = res.body.payload;

    expect(payload.title).toBeTruthy();
    expect(payload.currentPrice).toBeTruthy();
    expect(payload.url).toEqual(itemURLs[1].url);
    expect(payload.imageURL).toBeTruthy();

    items.push(payload);
  });

  test("get all items", async () => {
    const res = await request.get("/api/i/");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("payload");

    const payload = res.body.payload;
    expect(payload.length).toEqual(2);
    expect(payload[0].title).toEqual(items[0].title);
    expect(payload[1].title).toEqual(items[1].title);
  });

  test("get paginated items", async () => {
    const res = await request.get("/api/i/limit/1/page/2");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("payload");

    const payload = res.body.payload;
    expect(payload.length).toEqual(1);
    expect(payload[0].title).toEqual(items[1].title);
  });

  test("delete items", async () => {
    // convert to loop
    let res = await request.delete(`/api/i/${items[0]._id}`);
    expect(res.status).toEqual(200);

    res = await request.delete(`/api/i/${items[1]._id}`);
    expect(res.status).toEqual(200);
  });
});
