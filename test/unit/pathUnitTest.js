var assert = require('assert');
var ag = require('../../lib');
var agens = require('../../lib/agens.js');
var g = require('../../lib/graph.js');


describe('pathUnitTest suite', function() {
    var path = agens.parse('[n[7.3]{},r[5.7][7.3,7.9]{},n[7.9]{}]',
                            {startRule: '_Path'});

    it('Test Vertices', function(done) {
        assert.deepEqual(path.vertices[0], new g.Vertex('n', new g.GraphId(7, 3), {}));
        assert.deepEqual(path.vertices[1], new g.Vertex('n', new g.GraphId(7, 9), {}));
        done();
    });

    it('Test Edges', function(done) {
        assert.deepEqual(path.edges[0], new g.Edge('r', new g.GraphId(5, 7), new g.GraphId(7, 3), new g.GraphId(7, 9), {}));
        done();
    });

    it('Test Equality', function(done) {
        assert.strictEqual(path, path);
        done();
    });

    it('Test Length', function(done) {
        assert.deepEqual(1, path.len());
        done();
    })
});
