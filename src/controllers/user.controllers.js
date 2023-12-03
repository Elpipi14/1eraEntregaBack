import * as userService from "../service/user.service.js"

export const register = async (req, res, next) => {
    try {
      const user = await userService.register(req.body);
      if (!user) {
        console.log("Usuario registrado correctamente. Redirigiendo a /login");
        res.redirect("/login");
      } else {
        console.log("Error en el registro. Redirigiendo a /register-error");
        res.redirect("/register-error");
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      next(error);
    }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    console.log(user);
    if (user) {
      // Verifica si ya existe una sesión antes de crear una nueva
      if (!req.session.email) {
        req.session = req.session || {};
        req.session.email = email;
        req.session.firstName = user.firstName;
      }
      res.redirect("/products");
    } else {
      res.redirect("/register-error");
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};


  
    
    

  
  