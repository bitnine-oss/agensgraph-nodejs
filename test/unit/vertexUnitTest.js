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
