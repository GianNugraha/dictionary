'use strict';
const {
  v4: uuidv4
} = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("members", [
      {
        id: uuidv4(),
        code: "M001",
        name: "Angga",
        role: "member",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        code: "M002",
        name: "Ferry",
        role: "member",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        code: "M003",
        name: "Putri",
        role: "member",
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        code: "A001",
        name: "Gian",
        role: "admin",
        created_at: new Date(),
      }
    ]);
    await queryInterface.bulkInsert("books", [
      {
        id: uuidv4(),
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1,
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("members");
    await queryInterface.bulkDelete("books");
  },
};
