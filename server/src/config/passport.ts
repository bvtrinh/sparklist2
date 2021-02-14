import { OAuth2Strategy as GoogleStrategy, VerifyFunction, Profile } from "passport-google-oauth";
import { Request } from "express";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { User } from "../models/user.model";
import { Invite } from "../models/invite.model";

const validateInvite = async (inviteID: string) => {
  return (await Invite.findByIdAndDelete(inviteID)) ? true : false;
};

const googleSignUpCallback = async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyFunction
) => {
  try {
    const email = profile.emails?.[0].value;
    const inviteID = req.query.state as string;

    if (!(await validateInvite(inviteID)))
      return done(null, false, { message: "Invalid Invite link." });

    const newUser = new User({
      email: email,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
    });

    await newUser.save();
    return done(null, newUser, { message: "Sucessfully created account!" });
  } catch (err) {
    console.error(err);
    // TODO: Display error on client
    return done(null, false, { message: "Unable to sign up with Google." });
  }
};

const googleLoginCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyFunction
) => {
  try {
    const email = profile.emails?.[0].value;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("No account associated with that email. You need an invite link.");
    }

    return done(undefined, existingUser, { message: "Sucessful login." });
  } catch (err) {
    console.error(err);
    // TODO: Display error on client
    return done(undefined, false, { message: "Unable to sign up with Google." });
  }
};

export const passportGoogleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${process.env.API_URL}/api/u/google-login/callback`,
  },
  googleLoginCallback
);

export const passportGoogleSignUp = new GoogleStrategy(
  {
    passReqToCallback: true,
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${process.env.API_URL}/api/u/google-signup/callback`,
  },
  googleSignUpCallback
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
