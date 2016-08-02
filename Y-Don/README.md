![cf](http://i.imgur.com/7v5ASc8.png) http-simple-persistence
====
## Go Team Y-Don!


This simple HTTP Server serves as an API for dishing out JSON data about *dog breeds*. 

### Usage:

Start server with `npm start`

Make a POST request with the following JSON formatted syntax:  
`{"breed":"corgi"}`

'Corgi' will get POSTed and added to the API.

To get a list of all dog breeds currently in the API, make a GET request at */dogs*.

To view a specific JSON file, follow up the above path with the specified JSON file...
i.e. `/dogs/corgi.json`

To delete a JSON file in the API, make a DELETE request at the specified resource path. 

You did it! Woohoo!



---
Lab assignment instructions are located [here](LAB.md)

