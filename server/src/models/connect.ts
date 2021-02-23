import mongoose from "mongoose";

let database: mongoose.Connection;

export const connect = (log = false): void => {
  const uri = process.env.MONGO_URI as string;
  if (database) {
    return;
  }
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = mongoose.connection;
  database.once("open", async () => {
    if (log) console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = (): void => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
