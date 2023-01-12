const UserRepository = require('./UserRepository');
const bcrypt = require('bcrypt');
const hashPassword = require('../../helpers/hashPassword');
require("dotenv").config();
const secretkey = process.env.SECRETKEY;
const jwt = require('jsonwebtoken');
class UserService {
  static async login(data) {
    try {
      let findUser;
      if (data.name) {
        findUser = await UserRepository.findUser({ name: data.name });
      }
      if (!findUser) {
        throw { api: 'user', message: 'notFound-login, name not found !' };
      }
      if (data.code != findUser.code) {
        throw { api: 'user', message: 'forbidden-login , wrong code !' };
      }
   
      const datum = {
        id: findUser.id,
        name: findUser.name,
        code: findUser.code,
      }
      const access_token = jwt.sign(datum, secretkey);
      return { 
        access_token: access_token, 
        dataUser: datum

      };
    } catch (error) {
      throw error;
    }
  }

  static async getAllMember() {
    return UserRepository.getAllMember();
  }

}

module.exports = UserService;
