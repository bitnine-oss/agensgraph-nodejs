var assert = require('assert');
var ag = require('../../lib');
var agens = require('../../lib/agens.js');
var g = require('../../lib/graph.js');

describe('VertexUnitTest suite', function() {

    var vertex = agens.parse('v[7.9]{"s": "", "i": 0, "b": false, "a": [], "o": {}}', {startRule: '_Vertex'});

    it('Test Label', function(done) {
        assert.strictEqual(vertex.label, 'v');
        done();
    });

    it('Test Vertex ID', function(done) {
        assert.deepEqual(vertex.id, new g.GraphId(7,9));
        done();
    });

    it('Test Properties', function(done) {
        assert.strictEqual(vertex.props.s, '');
        assert.strictEqual(vertex.props.i, 0);
        assert.strictEqual(vertex.props.b, false);
        assert.deepEqual(vertex.props.a, []);
        assert.deepEqual(vertex.props.o, {});
        done();
    });

    it('Test Equality', function(done) {
        assert.strictEqual(vertex, vertex);
        done();
    });
});
