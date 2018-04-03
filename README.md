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
    password: 'agraph',
    database: 'postgres',
    host: '127.0.0.1',
    port: 5432
};

const client = new ag.Client(config);

client.query('DROP GRAPH IF EXISTS gpt CASCADE');
client.query('CREATE GRAPH gpt');
client.query('SET graph_path = gpt');

client.connect(function (err) {
  if (err) throw err;

  client.query("CREATE (n:v {s: '', l: 0, d: 0.0, f: false, t: true, z: null, a: [], o: {}}) RETURN n", [], function (err, res) {
    if (err) throw err;

    var v = res.rows[0].n;          
    console.log(v.label);
    console.log(v.props.s);
    console.log(v.props.l);
    console.log(v.props.d);
    console.log(v.props.f);
    console.log(v.props.t);
    console.log(v.props.z);
    console.log(v.props.a);
    console.log(v.props.o);

    client.end();
  });
});
```
## PEGJS 
[PEGJS](https://pegjs.org) is a simple parser generator for JavaScript.

```sh
$ sudo npm install -g pegjs
$ cd /path/to/project-home/lib
$ pegjs --output agens.js --allowed-start-rules EdgeArray,VertexArray,_Edge,_Vertex,_Path,Gid agens.pegjs

```
