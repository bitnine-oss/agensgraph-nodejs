const assert = require('assert');
const ag = require('../../lib');
const agens = require('../../lib/agens.js');
const g = require('../../lib/graph.js');


describe('pathUnitTest suite', function () {
    const path = agens.parse('[n[7.3]{},r[5.7][7.3,7.9]{},n[7.9]{}]',
        {startRule: '_Path'});

    it('Test Vertices', function (done) {
        assert.deepStrictEqual(path.vertices[0], new g.Vertex('n', new g.GraphId(7, 3), {}));
        assert.deepStrictEqual(path.vertices[1], new g.Vertex('n', new g.GraphId(7, 9), {}));
        done();
    });

    it('Test Edges', function (done) {
        assert.deepStrictEqual(path.edges[0], new g.Edge('r', new g.GraphId(5, 7), new g.GraphId(7, 3), new g.GraphId(7, 9), {}));
        done();
    });

    it('Test Equality', function (done) {
        assert.strictEqual(path, path);
        done();
    });

    it('Test Length', function (done) {
        assert.deepStrictEqual(1, path.len());
        done();
    })
});
