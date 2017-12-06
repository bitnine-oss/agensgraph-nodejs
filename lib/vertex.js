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
var agens = require("./agens.js");

var GID = require('./gid');

var Vertex = function(label, gid, props){
	this.label = label;
	this.vid = gid;
	this.props = props;
};

var parseVertex = function(value){

	if (!value) return null;
	var elems = /(.+)\[(\d+)\.(\d+)\](.+)/.exec(value);
	if (!elems) return null;
	return new Vertex(
			elems[1]
		, 	new GID(elems[2], elems[3])
		, 	JSON.parse(elems[4]));
};

var parse = function(value){
	console.log('vertex value', value)
    if (!value) return null;
    return agens.parse(value, {startRule: '_Vertex'})
};

module.exports = parse;