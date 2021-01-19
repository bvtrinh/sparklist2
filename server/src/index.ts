import express, { json, urlencoded } from "express";
import { resolve } from "path";
import { config } from "dotenv";
import { join } from "path";
import cors from "cors";
import Routes from "./routes";

// Dotenv config
if (process.env.NODE_ENV === "development") {
  config({ path: resolve(__dirname, "../.env.development") });
}
const port = process.env.PORT || 5000;

const app = express();
app.use(json());
app.use(express.static(join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
app.use(cors());

// Import in routes
Routes(app);

app.listen(port, () => console.log(`Server started on port ${port}`));
