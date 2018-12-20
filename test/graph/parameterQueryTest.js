var assert = require('assert');
var ag = require('../../lib');
var config = require('../config');

describe('ParameterQueryTest suite', function() {
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
    it('Test Cypher Types', function(done) {
        const q = {
            text: "CREATE (n:v {s: $1, l: $2, d: $3, f: $4, t: $5, a: $6, o: $7}) RETURN n",
            types: [25, 23, 701, 16, 16, 1007, 3802], 
            values: ['', 0, 0.0, false, true, [1,2,3], {name:'bylee'}]
        }
        client.query(q, function (err, res) { 
            if (err) throw err;

            var v = res.rows[0].n.props;
            assert.strictEqual(v.s, '');
            assert.strictEqual(v.l, 0);
            assert.strictEqual(v.d, 0.0);
            assert.strictEqual(v.f, false);
            assert.strictEqual(v.t, true);
            assert.deepEqual(v.a, [1,2,3]);
            assert.deepEqual(v.o, {name:'bylee'});
            done();
        });
    });
    it('Test Objects and Arrays', function(done) {
        const q = {
            text: "CREATE (n:v {ss: $1, ll: $2, dd: $3, ff: $4, tt: $5, aa: $6, oo: $7}) RETURN n",
            types: [1009, 1007, 1022, 1000, 1000, 1007, 3807], 
            values: [['a','b','c'], [0,1,2], [0.0,0.1,0.2], [false, 0, '0'], [true, 1, '1'], [[1],[2],[3]], [{name:'lee'},{name:'kim'}]]
        }
        client.query(q, function (err, res) { 
            if (err) throw err;
            
            var v = res.rows[0].n.props;
            assert.deepEqual(v.ss, ['a','b','c']);
            assert.deepEqual(v.ll, [0,1,2]);
            assert.deepEqual(v.dd, [0.0,0.1,0.2]);
            assert.deepEqual(v.ff, [false,false,false]);
            assert.deepEqual(v.tt, [true,true,true]);
            assert.deepEqual(v.aa, [[1],[2],[3]]);
            assert.deepEqual(v.oo, [{name:'lee'},{name:'kim'}]);
            done();
        });
    });
});
