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
import {parse} from './agens'
import pgTypes from 'pg-types'

function makeParser(startRuleName: string) {
    return function (rawStr?: string | null) {
        if (!rawStr) return null;
        return parse(rawStr, {startRule: startRuleName})
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

pgTypes.setTypeParser(7012, makeParser('_Vertex'));
pgTypes.setTypeParser(7011, makeParser('VertexArray'));
pgTypes.setTypeParser(7022, makeParser('_Edge'));
pgTypes.setTypeParser(7021, makeParser('EdgeArray'));
pgTypes.setTypeParser(7032, makeParser('_Path'));


// override connection parameters
const overridePGENVConfig = function (key: string) {
    const uKey = key.toUpperCase();
    const val = process.env['AG' + uKey];
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

const AgensGraph = function () {
    const pg = require('pg');
    return {
        pg: pg,
        Client: pg.Client,
        Query: pg.Query,
        Pool: pg.Pool,
        Connection: pg.Connection,
    }
};

module.exports = AgensGraph();
