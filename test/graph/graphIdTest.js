var assert = require('assert');
var ag = require('../../lib');
var agens = require("../../lib/agens.js");
var config = require('../config');

describe('GraphIdTest suite', function() {
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
    it('Test Graph Id', function(done) {
        client.query("CREATE (n {}) RETURN id(n)", [], function (err, res) {
            if (err) throw err;

            var v = res.rows[0];
            var gid = agens.parse(v.id, {startRule: 'GraphId'});
            assert.strictEqual(v.id, gid.oid + '.' + gid.id);

            done();
        });
    });
    it('Test MATCH Graph Id', function(done){
        client.query('MATCH (n) RETURN id(n)', [], function (err, res) {
            if (err) throw err;

            var v = res.rows[0];
            var gid = agens.parse(v.id, {startRule: 'GraphId'});
            assert.strictEqual(v.id, gid.oid + '.' + gid.id);

            done();
        })
    });
});
