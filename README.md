# agensgraph-nodejs
AgensGraph client for node.js. It supports Vertex, Edge and Path data types used in AgensGraph and is based on [node-postgres](https://github.com/brianc/node-postgres)

## Install

```sh
$ npm install git+https://github.com/mlogue/node-agensgraph.git
```

## Example

```js
var ag = require('agensgraph');

var config = {
  user: 'bylee',
  database: 'agens',
  host: 'localhost',
  port: 5432
};

var client = new ag.Client(config);

client.connect();
client.query('DROP GRAPH IF EXISTS gpt CASCADE');
client.query('CREATE GRAPH gpt');
client.query('SET graph_path = gpt');

client.connect(function (err) {
  if (err) throw err;

  client.query("CREATE p=({s: '[}\\\"'})-[:e]->() RETURN p", [], function (err, res) {
    if (err) throw err;

    var p = res.rows[0].p;
    console.log(typeof p);
    console.log(p.start());
    console.log(p.edges[0]);
    console.log(p.end());
    console.log(p.len());
  });

  client.query('MATCH ()-[r]->() RETURN count(*)', [], function (err, res) {
    if (err) throw err;

      console.log(res.rows[0].count);
  });
});

client.query('DROP GRAPH gpt CASCADE');
client.end();

```
## PEGJS 
[PEGJS](https://pegjs.org) is a simple parser generator for JavaScript.

```sh
$ sudo npm install -g pegjs
$ cd /path/to/project-home/lib
$ pegjs --output agens.js --allowed-start-rules EdgeArray,VertexArray,_Edge,_Vertex,_Path,Gid agens.pegjs

```