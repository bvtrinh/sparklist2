import express, { json, urlencoded } from "express";
import { join, resolve } from "path";
import cors from "cors";
import { connect } from "./models/connect";
import Routes from "./routes";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line
  require("dotenv").config({ path: resolve(__dirname, "../.env.development") });
}

const NODE_ENV = process.env.NODE_ENV || "development";
const port = process.env.PORT || 5000;

const app = express();
app.use(json());
app.use(express.static(join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
app.use(cors());

// Import in routes
Routes(app);

// Conenct to
connect();

app.listen(port, () =>
  console.log(`Running ${NODE_ENV} environment.\nServer started on port ${port}`)
);
