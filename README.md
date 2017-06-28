# node-agensgraph
AgensGraph client for node.js. It supports Vertex, Edge and Path data types used in AgensGraph and is based on [node-postgres](https://github.com/brianc/node-postgres)

## Install

```sh
npm install git+https://github.com/mlogue/node-agensgraph.git
```

## Example

```js
var ag = require('agensgraph');

var config = {
  user: 'ktlee',
  database: 'test',
  host: 'localhost',
  port: 5432
};

var client = new ag.Client(config);

client.connect(function (err) {
  if (err) throw err;

  client.query('match p=(:person {id: $1::int8})-[:knows]->(:person) return p', [933], function (err, result) {
    if (err) throw err;

    var path = result.rows[0].p;
    console.log(typeof path);
    console.log(path.start());
    console.log(path.edges[0]);
    console.log(path.end());
    console.log(path.len());

    client.end(function (err) {
      if (err) throw err;
    });
  });
});
```
