var assert = require('assert');
var ag = require('../../lib');
var agens = require('../../lib/agens.js');
var g = require('../../lib/graph.js');

describe('VertexUnitTest suite', function() {

    var edgeArray = agens.parse('[e1[6.6][7.9,8.3]{"s1":"a"},e2[5.7][2.3,4.8]{"s2":"b"},e3[9.3][3.2,4.4]{"s3":"c"}]', {startRule: 'EdgeArray'});

    it('Test EdgeArray Length', function(done) {
        assert.strictEqual(edgeArray.length, 3);
        done();
    });

    it('Test EdgeArray Members', function(done) {
        assert.strictEqual(edgeArray[0].label, 'e1');
        assert.deepEqual(edgeArray[0].id, new g.GraphId(6, 6));
        assert.deepEqual(edgeArray[0].start, new g.GraphId(7, 9));
        assert.deepEqual(edgeArray[0].end, new g.GraphId(8, 3));
        assert.strictEqual(edgeArray[0].props.s1, 'a');

        assert.strictEqual(edgeArray[1].label, 'e2');
        assert.deepEqual(edgeArray[1].id, new g.GraphId(5, 7));
        assert.deepEqual(edgeArray[1].start, new g.GraphId(2, 3));
        assert.deepEqual(edgeArray[1].end, new g.GraphId(4, 8));
        assert.strictEqual(edgeArray[1].props.s2, 'b');

        assert.strictEqual(edgeArray[2].label, 'e3');
        assert.deepEqual(edgeArray[2].id, new g.GraphId(9, 3));
        assert.deepEqual(edgeArray[2].start, new g.GraphId(3, 2));
        assert.deepEqual(edgeArray[2].end, new g.GraphId(4, 4));
        assert.strictEqual(edgeArray[2].props.s3, 'c');
        done();
    });

    it('Test Equality', function(done) {
        assert.strictEqual(edgeArray, edgeArray);
        done();
    });
});
