import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import passport from "passport";
import session from "express-session";
import generateTokenAndSetCookie from "./utils/generateTokenAndSetCookie.js"
import "./utils/passport.js";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import { sendVerificationEmail } from "./mailtrap/emails.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

//verification token
const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

// Routes for Google Auth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    // Generate JWT and set cookie
    generateTokenAndSetCookie(res, req.user.id);
	try {
		await sendVerificationEmail(req.user.email, verificationToken);
		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...req.user,
				password: undefined,
			},
		});
		
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
	
  }
);

// Routes for Facebook Auth
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  async (req, res) => {
    generateTokenAndSetCookie(res, req.user.id);
	try {
		await sendVerificationEmail(req.user.email, verificationToken);
		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...req.user,
				password: undefined,
			},
		});
		
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
  }
);

// Routes for GitHub Auth
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    generateTokenAndSetCookie(res, req.user.id);
	try {
		await sendVerificationEmail(req.user.email, verificationToken);
		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...req.user,
				password: undefined,
			},
		});
		
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
