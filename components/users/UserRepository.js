const { Member, Loan, Sequelize } = require("../../models");
const { Op, QueryTypes } = require("sequelize");

class UserRepository {
  static async findUser(condition) {
    try {
      return await Member.findOne({
        where: condition,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllMember() {
    try {
      const data = await Member.findAll({
        order: [["created_at", "DESC"]],
        where: { role: "member" },
        distinct:true,
        include: [
          {
            model: Loan,
            as: "loan",
            attributes: [
                  [Sequelize.fn('COUNT', Sequelize.col('loan.id')), 'totalBook'],
              ]
          }
        ],

        where: {
          role: "member",
        },
        subQuery: false,
        group: ['loan.id', 'Member.id',]
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  static async getPunishment(condition) {
    try {
      return await Member.findOne({
        where: {id : condition },
      });
    } catch (error) {
      throw error;
    }
  }

  static async banned(id, time) {
    try {
      const baned = await Member.update(
        { isPunishment: "true", banedDate: time},
        {
          where: {
            id,
          },
        }
      );
      return {baned, message: "You cannot borrow books again for the next 3 days" } ;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
