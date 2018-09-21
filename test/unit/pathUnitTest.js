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
