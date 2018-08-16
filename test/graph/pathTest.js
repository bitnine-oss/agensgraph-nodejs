var assert = require('assert');
var ag = require('../../lib');
var config = require('../config');

describe('PathTest suite', function() {
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
    it('Test Create Path', function(done) {
        client.query("CREATE p=({s: '[}\\\"'})-[:e]->() RETURN p", [], function (err, res) {
            if (err) throw err;

            var p = res.rows[0].p;
            assert.strictEqual(p.len(), 1);
            
            done();
        });
    });
    it('Test Match Path', function(done){
        client.query('MATCH ()-[r]->() RETURN count(*)', [], function (err, res) {
            if (err) throw err;

            assert.strictEqual(res.rows[0].count, '1');

            done();
        });
    });
});
