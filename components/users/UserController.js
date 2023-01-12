require("dotenv").config();
const UserService = require("./UserService");

class UserController {
  static async login(req, res, next) {
    try {
      const { name, code } = req.body;
      if (!code) {
        throw { api: "user", message: "badRequest-login" };
      }
      // const data = { condition, password };
      const signRes = await UserService.login(req.body);

      // console.log(access_token, `aik`);
      res.status(200).json(signRes);
    } catch (error) {
      next(error);
    }
  }

  static async getMember(req, res, next) {
    try {
      const Member = await UserService.getAllMember();
      res.status(200).json(Member);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
