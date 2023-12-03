import {UserModel} from "../models/user.models.js";

export default class UserMongoDB {

    async findByEmail(email) {
        try{
        const response = await UserModel.findOne({ email });
        return response;
        } catch (error) {
            console.log(error);
            return null
        }
    }
  
    async register(user) {
      try {
          const { email } = user;
          const exist = await this.findByEmail(email);
          if(!exist) await UserModel.create(user);
          else return false;
      } catch (error) {
        console.log(error);
      }
    }
  
    async login(email, password) {
      try {
        console.log('body', email, password);
        const userExist = await UserModel.findOne({ email: email, password: password });
        console.log('login::', userExist);
        if (!userExist) return false;
        else return userExist;
      } catch (error) {
        console.log(error);
      }
    }
}  