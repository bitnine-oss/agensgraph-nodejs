const assert = require('assert');
const ag = require('../../lib');
const agens = require('../../lib/agens.js');

describe('VertexUnitTest suite', function () {

    const graphId = agens.parse('5.8', {startRule: 'GraphId'});

    it('Test Graph ID', function (done) {
        assert.strictEqual(graphId.oid, '5');
        assert.strictEqual(graphId.id, '8');
        done();
    });

    it('Test Equality', function (done) {
        assert.strictEqual(graphId, graphId);
        done();
    });
});
