var assert = require('assert');
var ag = require('../../lib');
var agens = require('../../lib/agens.js');

describe('VertexUnitTest suite', function() {

    var graphId = agens.parse('5.8', {startRule: 'GraphId'});

    it('Test Graph ID', function(done) {
        assert.strictEqual(graphId.oid, '5');
        assert.strictEqual(graphId.id, '8');
        done();
    });

    it('Test Equality', function(done) {
        assert.strictEqual(graphId, graphId);
        done();
    });
});
