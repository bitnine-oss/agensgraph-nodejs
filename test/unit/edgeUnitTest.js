const assert = require('assert');
const ag = require('../../lib');
const agens = require('../../lib/agens.js');
const g = require('../../lib/graph.js');

describe('EdgeUnitTest suite', function () {

    const edge = agens.parse('e[5.7][7.3,7.9]{"s": "", "i": 0, "b": false, "a": [], "o": {}}', {startRule: '_Edge'});

    it('Test Label', function (done) {
        assert.strictEqual(edge.label, 'e');
        done();
    });

    it('Test Edge ID', function (done) {
        assert.deepStrictEqual(edge.id, new g.GraphId(5, 7));
        done();
    });

    it('Test Start ID', function (done) {
        assert.deepStrictEqual(edge.start, new g.GraphId(7, 3));
        done();
    });

    it('Test End ID', function (done) {
        assert.deepStrictEqual(edge.end, new g.GraphId(7, 9));
        done();
    });

    it('Test Properties', function (done) {
        assert.strictEqual(edge.props.s, '');
        assert.strictEqual(edge.props.i, 0);
        assert.strictEqual(edge.props.b, false);
        assert.deepStrictEqual(edge.props.a, []);
        assert.deepStrictEqual(edge.props.o, {});
        done();
    });

    it('Test Equality', function (done) {
        assert.strictEqual(edge, edge);
        done();
    });
});
