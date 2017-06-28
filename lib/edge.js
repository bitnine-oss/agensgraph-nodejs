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

var GID = require('./gid');

var Edge = function(label, id, sid, eid, props){
	this.label = label;
	this.eid = id;
	this.svid = sid;
	this.evid = eid;
	this.props = props;
};

var parseEdge = function(value){
	if (!value) return null;
	var pattern = /(.+)\[(\d+)\.(\d+)\]\[(\d+)\.(\d+),(\d+)\.(\d+)\](.*)/;
	var elems = pattern.exec(value);
	if (!elems) return null;
	return new Edge(
			elems[1]
		,	new GID(elems[2], elems[3])
		,	new GID(elems[4], elems[5])
		,	new GID(elems[6], elems[7])
		,	JSON.parse(elems[8]));
};

module.exports = parseEdge;
