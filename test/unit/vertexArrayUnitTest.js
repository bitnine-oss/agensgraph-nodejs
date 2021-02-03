const assert = require('assert');
const ag = require('../../lib');
const agens = require('../../lib/agens.js');
const g = require('../../lib/graph.js');

describe('VertexUnitTest suite', function () {

    const vertexArray = agens.parse('[v1[7.9]{"s1": "a"},v2[8.1]{"s2":"b"},v3[6.3]{"s3":"c"}]', {startRule: 'VertexArray'});

    it('Test VertexArray Length', function (done) {
        assert.strictEqual(vertexArray.length, 3);
        done();
    });

    it('Test VertexArray Members', function (done) {
        assert.strictEqual(vertexArray[0].label, 'v1');
        assert.deepStrictEqual(vertexArray[0].id, new g.GraphId(7, 9))
        assert.strictEqual(vertexArray[0].props.s1, 'a');

        assert.strictEqual(vertexArray[1].label, 'v2');
        assert.deepStrictEqual(vertexArray[1].id, new g.GraphId(8, 1))
        assert.strictEqual(vertexArray[1].props.s2, 'b');

        assert.strictEqual(vertexArray[2].label, 'v3');
        assert.deepStrictEqual(vertexArray[2].id, new g.GraphId(6, 3))
        assert.strictEqual(vertexArray[2].props.s3, 'c');
        done();
    });

    it('Test Equality', function (done) {
        assert.strictEqual(vertexArray, vertexArray);
        done();
    });
});
