// Switch to database
use("plp_bookstore");

// TASK 2: CRUD Operations
db.books.find({ genre: "Fantasy" });
db.books.find({ published_year: { $gt: 2000 } });
db.books.find({ author: "George Orwell" });
db.books.updateOne({ title: "1984" }, { $set: { price: 15.99 } });
db.books.deleteOne({ title: "Moby Dick" });

// TASK 3: Advanced Queries
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });
db.books.find().sort({ price: 1 });
db.books.find().sort({ price: -1 });
db.books.find().limit(5).skip(0);  // Page 1
db.books.find().limit(5).skip(5);  // Page 2

// TASK 4: Aggregation Pipelines
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);
db.books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

// TASK 5: Indexing
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: 1 });
db.books.find({ title: "1984" }).explain("executionStats");
