const express = require('express');
const router = express.Router();
let books = require('./books.json');
let ratings = require('./ratings.json');

// Get all the books
router.get('/', (req, res) => {
  res.json(books);
});

// Get a specific book
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(books.filter((ele) => ele.id === id));
});

// Get a specific book by author and year
router.get('/authorYear/:author/:year', (req, res) => {
  const { author, year } = req.params;
  res.json(books.filter((ele) => (ele.author === author) && (ele.year_written === year)));
});

// Get a specific book by rating
router.get('/rating/:rating', (req, res) => {
  const { rating } = req.params;
  const ratingsList = ratings.filter((ele) => ele.rating == rating);
  let ratingsArray = []
  if(ratings.length > 0){
    ratingsList.forEach((rating, index) => {
     const bookByRating = books.filter((ele) => ele.id === rating.bookId);
     if(bookByRating.length > 0){
      ratingsArray.push.apply(ratingsArray, bookByRating);
     }
    });
  }
  res.json(ratingsArray);
});


router.post('/addNewBook', (req, res) => {
  const body = req.body;
  if(body.id !== undefined){
   if(books.filter((ele) => ele.id === body.id).length > 0){
    res.json({ message: 'Book with ID already exists' });
   }
  }else{
    books.push(body);
    res.json({ message: 'The book has been added' });
  }
});

router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  books.forEach((book, index) => {
    if (book.id === id) {
      books[index] = body;
    }
  });
  res.json({ message: `The book with ID ${id} has been updated` });
  // res.json(books);
});

module.exports = router;
