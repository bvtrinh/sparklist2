import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env.test") });
import { connect, disconnect } from "../models/connect";
import { User } from "../models/user.model";

describe("User CRUD", () => {
  const email = "jtran@test.ca";
  const firstName = "Jack";
  const newFirstName = "Jason";
  const lastName = "Tran";

  beforeAll(async () => {
    connect(false);
  });

  afterAll(async () => {
    disconnect();
  });

  test("create a user", async () => {
    const user = new User({ email, firstName, lastName });
    await user.save();

    expect(user.firstName).toBe(firstName);
    expect(user.email).toBe(email);
    expect(user.lastName).toBe(lastName);
  });

  test("find a user", async () => {
    const testUser = await User.findOne({ email: email });
    expect(testUser.firstName).toBe(firstName);
    expect(testUser.email).toBe(email);
    expect(testUser.lastName).toBe(lastName);
  });

  test("update a user", async () => {
    const testUser = await User.findOne({ email: email });
    testUser.firstName = newFirstName;
    await User.updateOne({ email: email }, testUser);
    const updatedUser = await User.findOne({ email: email });
    expect(updatedUser.firstName).toBe(newFirstName);
  });

  test("delete a user", async () => {
    const res = await User.deleteOne({ email: email });
    expect(res.ok).toBe(1);
  });
});
