var assert = require('assert');
var ag = require('../../lib');
var config = require('../config');

describe('VertexTest suite', function() {
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
    it('Test Vertex Properties', function(done) {
        client.query("CREATE (n:v {s: '', l: 0, d: 0.0, f: false, t: true, z: null, a: [], o: {}}) RETURN n", [], function (err, res) {
            if (err) throw err;

            var v = res.rows[0].n;          
            assert.strictEqual(v.label, 'v');
            assert.strictEqual(v.props.s, '');
            assert.strictEqual(v.props.l, 0);
            assert.strictEqual(v.props.d, 0.0);
            assert.equal(v.props.f, false);
            assert.equal(v.props.f, 0);
            assert.strictEqual(v.props.f, false);
            assert.ok(v.props.t);
            assert.equal(v.props.t, true);
            assert.equal(v.props.t, 1);
            assert.strictEqual(v.props.t, true);
            assert.strictEqual(v.props.z, undefined);
            assert.deepEqual(v.props.a, []);
            assert.deepEqual(v.props.o, {});
            
            done();
        });
    });
    it('Test Vertex Match', function(done){
        client.query('MATCH (n) RETURN count(*)', [], function (err, res) {
            if (err) throw err;

            assert.strictEqual(res.rows[0].count, '1');

            done();
        });
    });
});
