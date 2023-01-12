const { Member } = require('../models');
const JWT = require('../helpers/JWT');

class Auth {
  static async authentication(req, res, next) {
    try {
      const access_token = req.headers.access_token;
      if (!access_token) {
        throw { message: `noAccess` };
      }
      const user = JWT.verifyToken(access_token);
      const userFromDB = await Member.findByPk(user.id);
      if (!userFromDB) {
        throw { message: 'Invalid Authentication, Please Re-Login' };
      }
      req.user = userFromDB.dataValues;
      next();
    } catch (err) {
      next(err);
    }
  }
  static authorization(req, res, next) {
    const user = req.user;
    try {
      if (user.role !== 'admin') {
        throw { message: `unauthorized` };
      }
      next();
    } catch (err) {
      next(err);
    }
  }
 
}
module.exports = Auth;
