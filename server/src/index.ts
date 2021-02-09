import { join, resolve } from "path";
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line
  require("dotenv").config({ path: resolve(__dirname, "../.env.development") });
}

import express, { json, urlencoded } from "express";
import cors from "cors";
import connectMongo from "connect-mongo";
import { connect } from "./models/connect";
import Routes from "./routes";
import passport from "passport";
import Mongoose from "mongoose";
import { SESSION_NAME } from "./config/constants";

import session from "express-session";
const MongoStore = connectMongo(session);
declare module "express-session" {
  export interface SessionData {
    passport: { [key: string]: string };
  }
}

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;
const SECRET = process.env.SESSION_SECRET || "super_secret";

// Conenct to DB
connect();

const app = express();
app.use(json());
app.use(express.static(join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: Mongoose.connection }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: NODE_ENV === "production",
    },
    secret: SECRET,
  })
);

app.use(passport.initialize());
passport.serializeUser((user, done) => {
  done(undefined, user);
});
// eslint-disable-next-line
passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

// Import in routes
Routes(app);

// Conenct to
connect();

if (process.env.NODE_ENV === "test") {
  // export app for jest testing
  module.exports = app;
} else {
  app.listen(PORT, () =>
    console.log(`Running ${NODE_ENV} environment.\nServer started on port ${PORT}`)
  );
}
