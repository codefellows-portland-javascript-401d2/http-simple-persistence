![cf](http://i.imgur.com/7v5ASc8.png) http-simple-persistence
====

## API server for books, by Dave and David

#### To install, clone this repo then run

    npm install
    ./index.js [port]

#### Available endpoints and methods:
- GET
  - /books: gets a list of available books
  - /books/resource: returns all data for that particular item
- POST
  - /books: adds a new book to the database
- PUT
  - /books/resource: replaces properties of the specified resource with information provided
- DELETE
  - /books/resource: deleted the specified resource

#### Data is stored in JSON format, as follows:

    {
      "title" : "Gone With The Wind",
      "author" : "Margaret Mitchell",
      "genre" : "fiction",
      "pub_year" : 1964,
      "read" : false,
      "resource" : "gone_with_the_wind_1964"
    }

#### Tests are available:

    npm test
