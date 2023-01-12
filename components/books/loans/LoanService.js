const LoanRepository = require('./LoanRepository');
const BookRepository = require('../BookRepository');
const UserRepository = require('../../users/UserRepository');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const {
    Sequelize,
    sequelize
  } = require('../../../models');
  const Op = Sequelize.Op;
class LoanService {
  static async addLoan(inputLoan, user) {
    try {
      // time to deadline
      var date = new Date();
      var res = date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
      var d = new Date(res);
      
      // check punishment
      const checkPunishment = await UserRepository.getPunishment(user);
      if ( checkPunishment.banedDate != null && checkPunishment.banedDate > new Date()){
        throw { message: 'you cannot borrow these books, you are on penalty period' };
      }

      // check late return date
      const checkLate = await LoanRepository.getLateReturn(user);
      if ( checkLate != null){
        for (let key of checkLate){
          if ( key.deadline < new Date()){
            throw { message: 'you cannot borrow these books, please return the borrowed book first' };
          }
        }
      }
      
      var temp = JSON.parse(inputLoan.BookId);
      let tempData = [];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] == temp[i+1]) {
          throw { message: 'The code for the borrowed book cannot be the same' };
        }
        const checkBookStatus = await BookRepository.getStatusBook(temp[i]);
        let obj = {};
        obj.id = uuidv4();
        obj.BookId = temp[i];
        obj.UserId = user;
        obj.deadline = d;
        obj.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
        tempData.push(obj);
      }

      const checkStatus = await LoanRepository.getLoanByIdUser(user);
      const sumBooks = temp.length+checkStatus.count;
      if (sumBooks > 2) {
        throw { message: 'the number of borrowed books should not be more than 2' };
      }
      const updateStatus = await BookRepository.updateStatus(tempData)
      const newLoan = await LoanRepository.addLoan(tempData);
      return newLoan;
    } catch (error) {
      throw error;
    }
  }

  static async getAllLoan(UserId) {
    
    return LoanRepository.getAllLoan(UserId);
  }

  static async getLoanById(id){
    return LoanRepository.getLoanById(id);
  }

}

module.exports = LoanService;
