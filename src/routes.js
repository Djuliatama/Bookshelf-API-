const express = require('express');
const router = express.Router();
const bookController = require ('./book.controller');

// POST-create a new book 
router.post('/books', bookController.createBook);

// // GET-get all books
router.get('/books', bookController.getAllBooks);

// // GET-get a spesific book by ID 
router.get('/books/:bookId', bookController.getById);

// // PUT-update book by ID
router.put('/books/:bookId' , bookController.updateById);

// // DELETE-delete book by ID
router.delete('/books/:bookId', bookController.deleteById);

module.exports = router;



