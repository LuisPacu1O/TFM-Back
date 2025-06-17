const { loginUser, registerUser } = require("../services/userService");
const { sendEmail } = require("../utils/mailer");
const {
  loginValidation,
  registerValidation,
} = require("../validations/userValidations");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userController = {
  login: [
    ...loginValidation,
    async (request, response) => {
      try {
        const { email, password } = request.body;

        const token = await loginUser(email, password);
        response.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });
        response.json({
          message: "Usuario logeado correctamente",
          token: token,
        });
      } catch (error) {
        console.log("Error al hacer login", error);
        response.status(401).json({ message: error.message });
      }
    },
  ],
  register: [
    ...registerValidation,
    async (request, response) => {
      try {
        const { email, password, name, role } = request.body;
        const token = await registerUser(email, password, name, role);
        response.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });
        response
          .status(201)
          .json({ message: "Usuario registrado correctamente", token: token });
      } catch (error) {
        console.log("Error al registrar al usuario", error);
        response.status(400).json({ message: error.message });
      }
    },
  ],
  sendEmail: [
    async (request, response) => {
      try {
        const { email, name } = request.body;
        const result = await sendEmail(email, name);
        if (result.success) {
          return response.status(200).json({ message: result.message });
        } else {
          return response.status(500).json({ error: result.error });
        }
      } catch (error) {
        console.error("Error en el controlador de email:", error);
        return response
          .status(500)
          .json({ error: "Error interno del servidor." });
      }
    },
  ],
  logout: [
    (request, response) => {
      response.cookie("token", "", {
        httpOnly: true,
        sameSite: "none",
        expires: new Date(0),
      });
      return response.status(200).json({ message: "Logout successful" });
    },
  ],
  verify: [
    async (request, response) => {
      const { token } = request.cookies;
      if (!token)
        return response
          .status(401)
          .json({ message: "No autorizado (fallo en cookies)" });
      jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
        if (error)
          return response
            .status(401)
            .json({ message: "No autorizado (fallo verificando)" });

        const userFound = await User.findById(user.id);
        if (!userFound)
          return response
            .status(401)
            .json({ message: "No autorizado (no se encontró el usuario)" });

        return response.json({
          id: userFound._id,
          username: userFound.name,
          email: userFound.email,
          avatar: userFound.avatar,
        });
      });
    },
  ],
  avatar: [
    async (request, response) => {
      const userId = request.user.id;
      const { avatar } = request.body;
      if (!avatar)
        return response.status(400).json({ message: "Falta la imagen" });
      try {
        const updateUser = await User.findByIdAndUpdate(
          userId,
          { avatar },
          { new: true }
        );
        response.json({
          message: "Imagen actualizada",
          avatar: updateUser.avatar,
        });
      } catch (error) {
        response.status(500).json({ message: "Error al actualizar el avatar" });
      }
    },
  ],
};

module.exports = userController;
