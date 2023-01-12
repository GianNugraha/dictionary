const ReturnRepository = require('./ReturnRepository');
const BookRepository = require('../BookRepository');
const LoanRepository = require('../loans/LoanRepository');
const UserRepository = require('../../users/UserRepository');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const {
    Sequelize,
    sequelize
  } = require('../../../models');
  const Op = Sequelize.Op;
class ReturnService {
  static async returnBook(inputReturn, user) {
    try {      
      var temp = JSON.parse(inputReturn.BookId);
      let tempData = [];
      if (temp.length > 2) {
        throw { message: 'Books that are returned cannot be more than 2' };
      }
      var punishmentCount = 0;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] == temp[i+1]) {
          throw { message: 'The returned book ID cannot be the same' };
        }
        // check loan existence and punishment
        const checkBookLoan = await LoanRepository.getStatusLoan(temp[i],user);
        if (checkBookLoan.deadline > new Date()) {
          // return book without punishment
          const deleteLoan = await LoanRepository.deleteLoan(checkBookLoan.BookId, user);
          const updateExistingBook = await BookRepository.updateExisting(checkBookLoan.BookId);
        }
        else{
          // return the book and add punishment to this user
          var date = new Date();
          var res = date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
          var d = new Date(res);
          const createdBannedDate = await UserRepository.banned(user, d);
          const deleteLoan = await LoanRepository.deleteLoan(checkBookLoan.BookId, user);
          const updateExistingBook = await BookRepository.updateExisting(checkBookLoan.BookId);
          punishmentCount += 1;
        }
      }

      var statusResponse 
      if (! punishmentCount > 0) {
        statusResponse = "Thank you for returning the book on time";
      }
      else
      {
        statusResponse = "Thank you for returning the book , but you get punishment for 3 days";
      }
      return statusResponse;
    } catch (error) {
      throw error;
    }
  }

  static async getAllReturn(offset, limit, search) {
    const whr = {}
    if (search.description !== ''  && search.description !== undefined ){
        whr[Op.and] = [{description:{[Op.iLike]: `%${search.description}%`}}]
    }
    if ( search.location != ''  && search.location != undefined){
        whr[Op.and] = [{location:{[Op.iLike]: `%${search.location}%`}}]
    }
    if ( search.full_time != '' && search.full_time != undefined){
        whr.type = search.full_time === 'true' ? 'Full Time' : null
    }
    return ReturnRepository.getAllReturn(offset, limit, whr);
  }

  static async getReturnById(id){
    return ReturnRepository.getReturnById(id);
  }

}

module.exports = ReturnService;
