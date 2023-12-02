import UserMongoDB from "../daos/mongoseDb/DB/user.mongose.js";
const userDao = new UserMongoDB();

export const getUserMail = async (mail) => {
    try {
        return await userDao.findByEmail(mail);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const register = async (user) => {
    try {
      const newUser = await userDao.register(user);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  };