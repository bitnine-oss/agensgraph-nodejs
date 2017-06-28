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

var parseVertex = require('./vertex');
var parseEdge = require('./edge');

var Path = function(vertices, edges){
	this.vertices = vertices;
	this.edges = edges;
	this.start = function(){
		return this.vertices[0];
	};
	this.end = function(){
		return this.vertices[this.vertices.length-1];
	};
	this.len = function(){
		return this.edges.length;
	}
};

var parsePath = function(value){
	if (!value) return null;
	var s = 1;
	var depth = 0;
	var inGID = false;
	var vertices = [];
	var edges = [];
	var isVertex = true;
	for (var i = 1; i < value.length - 1; ++i){
		var c = value[i];
		if ('{' == c){
			depth += 1;
		}
		else if ('}' == c){
			depth -= 1;
		}
		else if (0 == depth && '[' == c){
			inGID = true;
		}
		else if (inGID && ']' == c){
			inGID = false;
		}
		else if (0 == depth && !inGID && ',' == c){
			if (isVertex){
				vertices.push(parseVertex(value.substring(s, i)));
			}
			else {
				edges.push(parseEdge(value.substring(s, i)));
			}
			isVertex = !isVertex;
			s = i + 1;
		}
		if (depth < 0) return null;
	}
	vertices.push(parseVertex(value.substring(s, i)));
	return new Path(vertices, edges);
};

module.exports = parsePath;
