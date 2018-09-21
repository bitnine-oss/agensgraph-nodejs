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

var agens = require("./agens.js");

function makeParser(startRuleName) {
	return function(rawStr){
		if (!rawStr) return null;
        return agens.parse(rawStr, {startRule: startRuleName})
	}
}

/*
*
* public static final int JSONB = 3802;
    public static final int GRAPHID_ARRAY = 7001;
    public static final int GRAPHID = 7002;
    public static final int VERTEX_ARRAY = 7011;
    public static final int VERTEX = 7012;
    public static final int EDGE_ARRAY = 7021;
    public static final int EDGE = 7022;
    public static final int GRAPHPATH_ARRAY = 7031;
    public static final int GRAPHPATH = 7032;
*
* */

// add graph data types
var dfltTypes = require('pg').types;
dfltTypes.setTypeParser(7012, makeParser('_Vertex'));
dfltTypes.setTypeParser(7011, makeParser('VertexArray'));
dfltTypes.setTypeParser(7022, makeParser('_Edge'));
dfltTypes.setTypeParser(7021, makeParser('EdgeArray'));
dfltTypes.setTypeParser(7032, makeParser('_Path'));


// override connection parameters
var overridePGENVConfig = function(key){
	var uKey = key.toUpperCase();
	var val = process.env['AG' + uKey];
	if (val)
		process.env['PG' + uKey] = val;
	else
		delete process.env['PG' + uKey];
};
overridePGENVConfig('USER');
overridePGENVConfig('PASSWORD');
overridePGENVConfig('DATABASE');
overridePGENVConfig('HOST');
overridePGENVConfig('PORT');
overridePGENVConfig('BINARY');
overridePGENVConfig('CLIENT_ENCODING');
overridePGENVConfig('APPNAME');

var AgensGraph = function(){
	this.pg = require('pg');
	this.Client = this.pg.Client;
	this.Query = this.pg.Query;
	this.Pool = this.pg.Pool;
	this.Connection = this.pg.Connection;
};

module.exports = new AgensGraph();
