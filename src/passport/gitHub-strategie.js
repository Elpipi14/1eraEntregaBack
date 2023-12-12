import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongoseDb/DB/user.mongose.js";
const userDao = new UserDao();

const strategyOptions = {
  clientID: "Iv1.b1b1bb9978f789db",
  clientSecret: "770cbcf90148ff6f7018c9b50e879af52ef46375",
  callbackURL: "http://localhost:8080/profile",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  const email = profile._json.email;
  const user = await userDao.findByEmail(email);
  if (user) return done(null, user);
  const newUser = await userDao.register({
    first_name: profile._json.name,
    email,
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));