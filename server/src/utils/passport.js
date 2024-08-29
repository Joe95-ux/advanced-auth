// passport-setup.js
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";
import GitHubStrategy from "passport-github";
import User from "../models/user.model.js"; // Adjust the path as necessary
import generateTokenAndSetCookie from "./generateTokenAndSetCookie.js";
// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});



//verification token

const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ email: profile.emails[0].value });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await new User({
          email: profile.emails[0].value,
          name: profile.displayName,
          password: null,
          isVerified: false,
          verificationToken,
		  verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        }).save();

        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Configure Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"], // To ensure email is fetched
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await new User({
          email,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          password: null,
          isVerified: false,
          verificationToken,
		  verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        }).save();

        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Configure GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await new User({
          email,
          name: profile.displayName || profile.username,
          password: null,
          isVerified: false,
          verificationToken,
		  verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        }).save();

        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
