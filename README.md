# agensgraph-nodejs
AgensGraph client for node.js. To be used concurrently with [node-postgres](https://github.com/brianc/node-postgres). Adds AgensGraph compatability for node-postgres. Support for the Cypher query language, and vertex, edge and path graph data types.

## Usage
### Install
To install and use the AgensGraph node client, you will need [node-postgres](https://github.com/brianc/node-postgres) and agensgraph-nodejs:
```sh
$ npm install pg
$ npm install git+https://github.com/bitnine-oss/agensgraph-nodejs.git -S
```
## Connection
To connect to AgensGraph via node-js, one can connect via environment variables, programatically, or using a connection URI.

Connecting programmatically can be done by passing an object with config values to your AgensGraph client and using client.connect() to establish a connection:
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
client.connect();
client.end();
```
Use client.end() to terminate the connection to the database. Calling client.end() without a callback function will return a promise.

## Queries
To retrieve data from AgensGraph, use the query() API function to query the database. There are multiple ways to send queries, including passing text directly, using parameters, passing in objects, and using prepared statements. The following examples illustrate the different possible methods of querying.

Users can retrieve Cypher data by passing text directly to client.query():
```js
var ag = require('agensgraph');
const client = new ag.Client(Config);

client.connect();
client.query('SET graph_path = gpt'); //set graph path to gpt
client.query("MATCH (a:person)-[r:knows]->(b:person) WHERE b.name = 'Adam' RETURN a,r,b;", function(err, res){
    if (err) {
      throw err;
    } else {
      console.log(res.rows);
    }
});
client.end();
```
Users can also send parameterized queries:
```js
...
const text = "MATCH (a:person)-[:knows]->(b:person) WHERE b.name = $1 RETURN a;"
const values = ['Adam'];

client.connect();
client.query('SET graph_path = gpt'); //set graph path to gpt
client.query(text, values, function(err, res){
    if (err) {
      throw err;
    } else {
      console.log(res.rows);
    }
});
```
Passing a config object:
```js
const query= {
  text: "MATCH (a:person)-[:knows]->(b:person) WHERE b.name = $1 RETURN a;",
  values = ['Adam'];
  }

client.connect();
client.query('SET graph_path = gpt'); //set graph path to gpt
client.query(query, function(err, res){
    if (err) {
      throw err;
    } else {
      console.log(res.rows);
    }
});
```
Users can also use named prepared statements. Using prepared statements allows query execution plans to be cached on the server on a per connection statement. Once a query name is sent to the server, it will be parsed and executed. On subsequent sends the query will skip the parse request and instead send the name of the query:
```js
...
const query = {
  name: 'fetch-data',
  text: "MATCH(n) WHERE n.name = 'Eve' RETURN n"
}

client.query(query, (err,res) => {
  if (err) {
    throw err;
  } else {
    console.log(res.rows);
  }
});

```

## Creating Data
To create data in AgensGraph, the query() API function is again used to query the database. Below is an example of creating Cypher data by passing text directly to client.query():
```js
var ag = require('agensgraph');
const client = new ag.Client(Config);

client.connect();
client.query('CREATE GRAPH gpt');
client.query('SET graph_path = gpt');
client.query("CREATE (a:person {name:'Alice'})-[r:knows {from: 'school'}]->(b:person {name: 'Bob'}) RETURN a,r,b", function (err, res) {
    if (err) {
      throw err;
    } else {
      a = res.rows[0].a;
      r = res.rows[0].r;
      b = res.rows[0].b;
      console.log(a.label);
      console.log(a.id);
      console.log(a.props.name);

      console.log(r.label);
      console.log(r.id);
      console.log(r.startVertexId);
      console.log(r.endVertexID);
      console.log(r.props.from);      

      console.log(b.label);
      console.log(b.id);
      console.log(b.props.name);
    }
});

```

## Graph Data Types
The following is a brief explanation detailing the different datatypes handled by agensgraph-nodejs extension.

| Class Function    | Description     | Properties      |
| ------------------| --------------- | --------------- |
| `GraphId`    | Corresponds to the `graphid` type in AgensGraph. | oid, id
| `Vertex`     |Corresponds to `vertex` type in AgensGraph. It supports access methods for the label and properties. | label, id, props
| `Edge`       | Corresponds to `edge` type in AgensGraph. It supports access methods for the label and properties. | label, id, start, end, props
| `Path`       | Corresponds to `graphpath` type in AgensGraph. It supports access methods for the length of the path, and accessing for vertexes and edges in the path. | vertices, edges, start, end, len

## PEGJS 
[PEGJS](https://pegjs.org) is a simple parser generator for JavaScript. To install PEGJS and compile the agens.js parser, use the following commands:

```sh
$ sudo npm install -g pegjs
$ cd /path/to/project-home/lib
$ pegjs --output agens.js --allowed-start-rules EdgeArray,VertexArray,_Edge,_Vertex,_Path,Gid agens.pegjs

```
