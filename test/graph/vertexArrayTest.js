var assert = require('assert');
var ag = require('../../lib');
var config = require('../config');

describe('VertexArrayTest suite', function() {
    var client;
    before('setUp', function(){
        client = new ag.Client(config);
        client.connect();
        client.query('DROP GRAPH IF EXISTS gpt CASCADE');
        client.query('CREATE GRAPH gpt');
        client.query('SET graph_path = gpt');
    });
    after('tearDown', function(){
        client.query('DROP GRAPH gpt CASCADE')
            .then(() => client.end());

    });
    it('Test Vertex Array', function(done) {
        client.query("CREATE p=(n1:v1{s1:[]})-[:r1]->(v2:v2{s2:{}})-[:r2]->(v3:v3{s3:''})-[:r3]->(v4:v4{s4:0.0}) RETURN nodes(p)", function (err, res) {
            if (err) throw err;

            var va = res.rows[0].nodes;
            assert.strictEqual(Array.isArray(va), true);
            assert.strictEqual(va.length, 4);      
          
            done();
        });
    });
    it('Test Match on Array & Identity', function(done){
        client.query('MATCH p=()-[]->()-[]->() RETURN nodes(p)', function (err, res) {
            if (err) throw err;

            var va = res.rows;
            assert.strictEqual(Array.isArray(va), true);
            assert.strictEqual(va.length, 2); 

            done();
        });
    });
});
