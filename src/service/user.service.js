import UserMongoDB from "../daos/mongoseDb/DB/user.mongose.js";
const userDao = new UserMongoDB();

export const register = async (user) => {
    try {
      const newUser = await userDao.register(user);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  };


  export const login = async (email, password) => {
    try {
      const user = await userDao.login(email, password);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };