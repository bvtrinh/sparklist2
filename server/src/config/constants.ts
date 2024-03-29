// Any constants that is going to used throughout the project store in here

export const DEV_ENV = "../.env.development";
export const TEST_ENV = "../.env.test";

export const FLOAT_REGEX = /[^\d.-]/g;
export const LINE_BREAK_REGEX = /\r?\n|\r/;

export const SCROLL_SCRIPT =
  'window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });';

export const SESSION_NAME = "SESSION_ID";
export const REDIRECT_CLIENT_URL = "http://localhost:3000/profile";

export const MIN_LEN = 1;
export const INVITE_EXPIRY = 60 * 60 * 24;
