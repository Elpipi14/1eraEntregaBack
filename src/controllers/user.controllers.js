import * as userService from "../service/user.service.js"



export const getUserMail = async (req, res, next) => {
    try {
        const { mail } = req.params;
        const cart = await userServiceService.getUserMail(mail);
        res.status(200).json(cart);
    } catch (error) {
        next(error.message);
    }
};


export default class UserController {
    async register(req, res, next) {
      console.log(req.body);
      try {
        const user = await userService.register(req.body);
        if (user) res.redirect("/views/partials/login");
        else res.redirect("/views/register-error");
      } catch (error) {
        next(error);
      }
    }
    async login(req, res, next) {
      try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        console.log(user);
        if (user) {
          req.session.email = email;
          req.session.password = password;
          res.redirect("/views/profile");
        } else res.redirect("/views/error-login");
      } catch (error) {
        next(error);
      }
    }
  }