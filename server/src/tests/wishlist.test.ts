import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env.test") });
import { connect, disconnect } from "../models/connect";
import { User } from "../models/user.model";
import { Item } from "../models/item.model";
import { IWishlist, Wishlist } from "../models/wishlist.model";
import { itemData, userData } from "./mockData";

// eslint-disable-next-line
const app = require("../index");
import supertest from "supertest";
const request = supertest(app);

jest.setTimeout(15000);

const userIDs: string[] = [];
const itemIDs: string[] = [];
const wishlists: IWishlist[] = [];

describe("Wishlist Endpoints", () => {
  beforeAll(async () => {
    connect(false);

    // create mock users and items
    for (let i = 0; i < userData.length; i++) {
      const user = new User(userData[i]);
      await user.save();
      userIDs.push(user._id);
    }

    for (let i = 0; i < itemData.length; i++) {
      const item = new Item(itemData[i]);
      await item.save();
      itemIDs.push(item._id);
    }
  });

  afterAll(async () => {
    // delete mock users and items
    for (let i = 0; i < userIDs.length; i++) {
      await User.deleteOne({ _id: userIDs[i] });
    }

    for (let i = 0; i < itemData.length; i++) {
      await Item.deleteOne({ _id: itemIDs[i] });
    }

    disconnect();
  });

  test("create a wishlist", async () => {
    const res = await request.post("/api/w/").send({
      name: "wishlist1",
      owner: userIDs[0],
      items: [itemIDs[0], itemIDs[2]],
      sharedUsers: [userIDs[1], userIDs[2]],
    });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("payload");
    const payload = res.body.payload;

    expect(payload.name).toEqual("wishlist1");
    expect(JSON.stringify(payload.owner)).toEqual(JSON.stringify(userIDs[0]));
    expect(payload.items).toHaveLength(2);
    expect(payload.sharedUsers).toHaveLength(2);

    wishlists.push(payload);
  });

  test("add duplicate wishlist", async () => {
    const res = await request.post("/api/w/").send({
      name: "wishlist1",
      owner: userIDs[0],
      items: [itemIDs[3], itemIDs[2]],
      sharedUsers: [userIDs[3], userIDs[2]],
    });
    expect(res.status).toEqual(422);
  });

  test("create second wishlist", async () => {
    const res = await request.post("/api/w/").send({
      name: "wishlist2",
      owner: userIDs[1],
      items: [itemIDs[3]],
      sharedUsers: [userIDs[0], userIDs[2]],
    });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("payload");
    const payload = res.body.payload;

    expect(payload.name).toEqual("wishlist2");
    expect(JSON.stringify(payload.owner)).toEqual(JSON.stringify(userIDs[1]));
    expect(payload.items).toHaveLength(1);
    expect(payload.sharedUsers).toHaveLength(2);

    wishlists.push(payload);
  });

  test("get one wishlist", async () => {
    const res = await request.get(`/api/w/one/`).send({
      wishlistId: wishlists[0]._id,
      userId: userIDs[0],
    });
    const payload = res.body.payload;
    expect(payload.name).toEqual(wishlists[0].name);
  });

  test("get own wishlists", async () => {
    const res = await request.get(`/api/w/own`).send({
      owner: userIDs[0],
    });
    const payload = res.body.payload;

    expect(payload.length).toEqual(1);
    expect(payload[0].name).toEqual(wishlists[0].name);
  });

  test("get shared wishlists", async () => {
    const res = await request.get(`/api/w/shared/`).send({
      id: userIDs[2],
    });
    const payload = res.body.payload;

    expect(payload.length).toEqual(2);
    expect(payload[0].name).toEqual(wishlists[0].name);
    expect(payload[1].name).toEqual(wishlists[1].name);
  });

  test("update wishlist", async () => {
    const updatedWishlist = {
      id: wishlists[1]._id,
      name: "updatedName",
      items: [itemIDs[0], itemIDs[2]],
      sharedUsers: [userIDs[1], userIDs[2]],
    };

    await request.patch(`/api/w/`).send(updatedWishlist);
    const wishlist = await Wishlist.findById(wishlists[1]._id);

    expect(wishlist.name).toEqual(updatedWishlist.name);
    expect(JSON.stringify(wishlist.items)).toEqual(JSON.stringify(updatedWishlist.items));
    expect(JSON.stringify(wishlist.sharedUsers)).toEqual(
      JSON.stringify(updatedWishlist.sharedUsers)
    );
  });

  test("delete wishlists", async () => {
    for (let i = 0; i < wishlists.length; i++) {
      const res = await request.delete(`/api/w/`).send({
        userId: wishlists[i].owner,
        wishlistId: wishlists[i]._id,
      });
      expect(res.status).toEqual(200);
    }
  });
});
