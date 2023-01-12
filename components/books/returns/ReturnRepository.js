const {
  Return,
} = require("../../../models");

class ReturnRepository {
  static async addReturn(tempData) {
    try {
      let respData = [];
      for (let i = 0; i < tempData.length; i++) {
        const Return = await Return.create(
          tempData[i]
        );
        respData.push(Return);
      }
      return respData;
    } catch (error) {
      throw error;
    }
  }

  static async getReturnById(whr) {
    try {
      const data = await Return.findOne({
        where: { id: whr },
      });
      if (data == null) throw new Error("Return Not Found !");
      return data;
    } catch (error) {
      throw error;
    }
  }


  static async getReturnByIdUser(whr) {
    try {
      const data = await Return.findAndCountAll({
        where: { UserId: whr },
      });
      if (data == null) throw new Error("Return Not Found !");
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReturnRepository;
