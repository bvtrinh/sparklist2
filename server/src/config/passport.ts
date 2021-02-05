import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import Key from "../../google_auth_key.json";
import { User } from "../models/user.model";

export const passportGoogle = new GoogleStrategy(
  {
    clientID: Key.web.client_id,
    clientSecret: Key.web.client_secret,
    callbackURL: `${process.env.API_URL}/api/u/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
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
      return done("Unable to authenticate with Google");
    }
  }
);
