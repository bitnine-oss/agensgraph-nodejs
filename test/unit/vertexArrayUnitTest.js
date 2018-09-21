/*
 * Copyright (c) 2014-2018 Bitnine, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

var assert = require('assert');
var ag = require('../../lib');
var agens = require('../../lib/agens.js');
var g = require('../../lib/graph.js');

describe('VertexUnitTest suite', function() {

    var vertexArray = agens.parse('[v1[7.9]{"s1": "a"},v2[8.1]{"s2":"b"},v3[6.3]{"s3":"c"}]', {startRule: 'VertexArray'});

    it('Test VertexArray Length', function(done) {
        assert.strictEqual(vertexArray.length, 3);
        done();
    });

    it('Test VertexArray Members', function(done) {
        assert.strictEqual(vertexArray[0].label, 'v1');
        assert.deepEqual(vertexArray[0].id, new g.GraphId(7,9))
        assert.strictEqual(vertexArray[0].props.s1, 'a');

        assert.strictEqual(vertexArray[1].label, 'v2');
        assert.deepEqual(vertexArray[1].id, new g.GraphId(8,1))
        assert.strictEqual(vertexArray[1].props.s2, 'b');

        assert.strictEqual(vertexArray[2].label, 'v3');
        assert.deepEqual(vertexArray[2].id, new g.GraphId(6,3))
        assert.strictEqual(vertexArray[2].props.s3, 'c');
        done();
    });

    it('Test Equality', function(done) {
        assert.strictEqual(vertexArray, vertexArray);
        done();
    });
});
