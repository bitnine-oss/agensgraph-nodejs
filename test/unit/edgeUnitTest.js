var assert = require('assert');
var ag = require('../../lib');
var agens = require('../../lib/agens.js');
var g = require('../../lib/graph.js');

describe('EdgeUnitTest suite', function() {

    var edge = agens.parse('e[5.7][7.3,7.9]{"s": "", "i": 0, "b": false, "a": [], "o": {}}', {startRule: '_Edge'});

    it('Test Label', function(done) {
        assert.strictEqual(edge.label, 'e');
        done();
    });

    it('Test Edge ID', function(done) {
        assert.deepEqual(edge.id, new g.GraphId(5, 7));
        done();
    });

    it('Test Start ID', function(done) {
        assert.deepEqual(edge.start, new g.GraphId(7, 3));
        done();
    });

    it('Test End ID', function(done) {
        assert.deepEqual(edge.end, new g.GraphId(7, 9));
        done();
    });

    it('Test Properties', function(done) {
        assert.strictEqual(edge.props.s, '');
        assert.strictEqual(edge.props.i, 0);
        assert.strictEqual(edge.props.b, false);
        assert.deepEqual(edge.props.a, []);
        assert.deepEqual(edge.props.o, {});
        done();
    });

    it('Test Equality', function(done) {
        assert.strictEqual(edge, edge);
        done();
    });
});
