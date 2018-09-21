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

describe('VertexArrayTest suite', function() {
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
    it('Test Vertex Array', function(done) {
        client.query("CREATE p=(n1:v1{s1:[]})-[:r1]->(v2:v2{s2:{}})-[:r2]->(v3:v3{s3:''})-[:r3]->(v4:v4{s4:0.0}) RETURN nodes(p)", function (err, res) {
            if (err) throw err;

            var va = res.rows[0].nodes;
            assert.strictEqual(Array.isArray(va), true);
            assert.strictEqual(va.length, 4);      
          
            done();
        });
    });
    it('Test Match on Array & Identity', function(done){
        client.query('MATCH p=()-[]->()-[]->() RETURN nodes(p)', function (err, res) {
            if (err) throw err;

            var va = res.rows;
            assert.strictEqual(Array.isArray(va), true);
            assert.strictEqual(va.length, 2); 

            done();
        });
    });
});
