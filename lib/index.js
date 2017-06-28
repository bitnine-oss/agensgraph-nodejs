/*
 * Copyright (c) 2014-2016, Bitnine Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// add graph data types
var dfltTypes = require('pg').types;
dfltTypes.setTypeParser(7012, require('./vertex'));
dfltTypes.setTypeParser(7022, require('./edge'));
dfltTypes.setTypeParser(7032, require('./path'));

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
