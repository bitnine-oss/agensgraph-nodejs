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

describe('PathTest suite', function() {
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
    it('Test Create Path', function(done) {
        client.query("CREATE p=({s: '[}\\\"'})-[:e]->() RETURN p", [], function (err, res) {
            if (err) throw err;

            var p = res.rows[0].p;
            assert.strictEqual(p.len(), 1);
            
            done();
        });
    });
    it('Test Match Path', function(done){
        client.query('MATCH ()-[r]->() RETURN count(*)', [], function (err, res) {
            if (err) throw err;

            assert.strictEqual(res.rows[0].count, '1');

            done();
        });
    });
});
