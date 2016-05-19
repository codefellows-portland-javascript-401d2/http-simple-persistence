# ![cf](http://i.imgur.com/7v5ASc8.png) HTTP Simple Persistence

A http server that will act as a simple data store for a to-do app.

## Getting Started

1. Install [Node.js](https://nodejs.org/en/)
2. Run `git clone https://github.com/jluangphasy/http-simple-persistence.git`
3. Run `git checkout jluangphasy`
4. Run `npm install`

Run `node app.js` to start server. Default port number is `8080`. So, the base url should be `http://localhost:8080/`.

## API

### List all to-do tasks

A list of all of the json files (to-do tasks) in the data folder.

```
GET /todos
```

### Add to-do task

Data coming in will create a json file (to-do task) in the data folder.

```
POST /todos
```

### Update to-do task

Data coming in will be saved to a json file (to-do task) in the data folder, updating it entirely.

```
PUT /todos/:id
```

### Remove to-do task

The json file (to-do task) will be removed in the data folder.

```
DELETE /todos/:id
```
