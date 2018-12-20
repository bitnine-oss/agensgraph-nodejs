var assert = require('assert');
var ag = require('../../lib');
var config = require('../config');

describe('EdgeArrayTest suite', function() {
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
    it('Test Edge Array', function(done) {
        client.query("CREATE (v1:vv{n: []})-[e1:r1]->(v2)-[e2:r2{l: 0}]->(v3)-[e3:r3{d: 0.0}]->(v4) RETURN v1, e1, v2, e2, v3, e3, v4", [], function (err, res) {
            if(err) return err;

            assert.strictEqual(res.rows[0].v1.label, 'vv');
            assert.strictEqual(res.rows[0].v2.label, 'ag_vertex');
            assert.strictEqual(res.rows[0].v3.label, 'ag_vertex');
            assert.strictEqual(res.rows[0].v4.label, 'ag_vertex');
            assert.strictEqual(res.rows[0].e1.label, 'r1');
            assert.strictEqual(res.rows[0].e2.label, 'r2');
            assert.strictEqual(res.rows[0].e3.label, 'r3');
          
            done();
        });
    });
    it('Test Match on VLE Array', function(done){
        client.query('MATCH (n)-[r*..]->(m) RETURN n, r, m', [], function (err, res) {
            if (err) throw err;

            var ea = res.rows[5].r;
            assert.strictEqual(ea[0].label, 'r1');
            assert.strictEqual(ea[1].label, 'r2');
            assert.strictEqual(ea[2].label, 'r3');

            done();
        })
    });
    it('Test Match on Array & Identity', function(done){
        client.query("MATCH p=()-[]->()-[]->()  RETURN relationships(p)", [], function (err, res) {
            if (err) throw err;

            var ea = res.rows;
            assert.strictEqual(Array.isArray(ea), true);
            assert.strictEqual(ea.length, 2); 

            done();
        })
    });
});
