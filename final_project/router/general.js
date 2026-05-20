const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if username already exists
  if (users.find(user => user.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Register the new user
  users.push({ username: username, password: password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Task 1: Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(JSON.stringify(books, null, 2));
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 3: Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const bookKeys = Object.keys(books);
  const booksByAuthor = [];

  // Iterate through all books and find matches
  bookKeys.forEach(key => {
    if (books[key].author === author) {
      booksByAuthor.push(books[key]);
    }
  });

  if (booksByAuthor.length > 0) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res.status(404).json({ message: "No books found by this author" });
  }
});

// Task 4: Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const bookKeys = Object.keys(books);
  const booksByTitle = [];

  // Iterate through all books and find matches
  bookKeys.forEach(key => {
    if (books[key].title === title) {
      booksByTitle.push(books[key]);
    }
  });

  if (booksByTitle.length > 0) {
    return res.status(200).json(booksByTitle);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 10: Get all books using async-await with Axios
public_users.get('/async/books', async function (req, res) {
    try {
      const response = await axios.get('http://localhost:5000/');
  
      return res.status(200).json({
        success: true,
        books: response.data
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching books",
        error: error.message
      });
    }
  });
  
  
  // Task 11: Get book details based on ISBN using async-await with Axios
  public_users.get('/async/isbn/:isbn', async function (req, res) {
  
    try {
      const isbn = req.params.isbn;
  
      const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
  
      return res.status(200).json({
        success: true,
        book: response.data
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching book by ISBN",
        error: error.message
      });
    }
  });
  
  
  // Task 12: Get book details based on Author using async-await with Axios
  public_users.get('/async/author/:author', async function (req, res) {
  
    try {
      const author = req.params.author;
  
      const response = await axios.get(`http://localhost:5000/author/${author}`);
  
      return res.status(200).json({
        success: true,
        books: response.data
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching books by author",
        error: error.message
      });
    }
  });
  
  
  // Task 13: Get book details based on Title using async-await with Axios
  public_users.get('/async/title/:title', async function (req, res) {
  
    try {
      const title = req.params.title;
  
      const response = await axios.get(`http://localhost:5000/title/${title}`);
  
      return res.status(200).json({
        success: true,
        books: response.data
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching books by title",
        error: error.message
      });
    }
  });

module.exports.general = public_users;