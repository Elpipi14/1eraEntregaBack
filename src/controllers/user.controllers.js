import * as userService from "../service/user.service.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isRegistered = await userService.register({ ...req.body, password });

    if (isRegistered) {
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

    if (user) {
      if (!req.session.email) {
        req.session = req.session || {};
        req.session.email = email;
        req.session.firstName = user.first_name;

        // Almacena toda la información del usuario en la sesión
        req.session.user = user;
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
  console.log("Antes de destruir la sesión");
  req.session.destroy(() => {
    console.log("Después de destruir la sesión");
    res.redirect("/login");
  });
};

export const profile = (req, res) => {
  // En este punto, el middleware validateLogin ya ha verificado que el usuario está autenticado
  const user = req.session.user;

  // Solo mostrar datos no sensibles del usuario en la vista de perfil
  const userToRender = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      gender: user.gender,
  };

  res.render('partials/profile', { user: userToRender });
};

