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
var config = require('../config');

describe('EdgeTest suite', function() {
    var client;
    before('setUp', function(){
        client = new ag.Client(config);
        client.connect();
        client.query('DROP GRAPH IF EXISTS gpt CASCADE');
        client.query('CREATE GRAPH gpt');
        client.query('SET graph_path = gpt');
    });
    after('tearDown', function(){
        client.query('DROP GRAPH gpt CASCADE')
            .then(() => client.end());

    });
    it('Test Edge Properties', function(done) {
        client.query("CREATE (n)-[r:e{s: '', l: 0, d: 0.0, f: false, t: true, z: null, a: [], o: {}}]->(m) RETURN n, r, m", [], function (err, res) {
            if (err) throw err;

            var v0 = res.rows[0].n;
            var e = res.rows[0].r;
            var v1 = res.rows[0].m;
            assert.strictEqual(e.label, 'e');
            assert.deepEqual(e.svid, v0.vid);
            assert.deepEqual(e.evid, v1.vid);
            assert.strictEqual(e.props.s, '');
            assert.strictEqual(e.props.l, 0);
            assert.strictEqual(e.props.d, 0.0);
            assert.equal(e.props.f, false);
            assert.equal(e.props.f, 0);
            assert.strictEqual(e.props.f, false);
            assert.ok(e.props.t);
            assert.equal(e.props.t, true);
            assert.equal(e.props.t, 1);
            assert.strictEqual(e.props.t, true);
            assert.strictEqual(e.props.z, undefined);
            assert.deepEqual(e.props.a, []);
            assert.deepEqual(e.props.o, {});
           
            done();
        });
    });
    it('Test Edge Match', function(done){
        client.query('MATCH ()-[r]->() RETURN count(*)', [], function (err, res) {
            if (err) throw err;

            assert.strictEqual(res.rows[0].count, '1');

            done();
        })
    });
});
