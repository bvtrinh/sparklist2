import { OAuth2Strategy as GoogleStrategy, VerifyFunction, Profile } from "passport-google-oauth";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { User } from "../models/user.model";

const googleVerifyCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyFunction
) => {
  const email = profile.emails?.[0].value;
  try {
    const existingUser = await User.findOne({ email });
    // User doesn't exist; create an account
    if (!existingUser) {
      const newUser = new User({
        email: email,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
      });

      await newUser.save();
      return done(null, newUser);
    }

    return done(null, existingUser);
  } catch (err) {
    console.error(err);
    // TODO: Display error on client
    return done("Unable to authenticate with Google");
  }
};

export const passportGoogle = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${process.env.API_URL}/api/u/google/callback`,
  },
  googleVerifyCallback
);

const twitterVerifyCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyFunction
) => {
  const email = profile.emails?.[0].value;
  try {
    const existingUser = await User.findOne({ email });
    // User doesn't exist; create an account
    if (!existingUser) {
      const [firstName, lastName] = profile.displayName.split(" ");
      const newUser = new User({
        email,
        firstName,
        lastName,
      });

      await newUser.save();
      return done(null, newUser);
    }

    return done(null, existingUser);
  } catch (err) {
    console.error(err);
    // TODO: Display error on client
    return done("Unable to authenticate with Twitter");
  }
};

export const passportTwitter = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_API_KEY as string,
    consumerSecret: process.env.TWITTER_API_SECRET as string,
    includeEmail: true,
    callbackURL: `${process.env.API_URL}/api/u/twitter/callback`,
  },
  twitterVerifyCallback
);
