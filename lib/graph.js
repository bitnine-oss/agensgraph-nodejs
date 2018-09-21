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

var GraphId = function(oid, id){
    this.oid = String(oid);
    this.id = String(id);
};

var Vertex = function(label, id, props){
    this.label = label;
    this.id = id;
    this.props = props;
};

var Edge = function(label, id, sid, eid, props){
    this.label = label;
    this.id = id;
    this.start = sid;
    this.end = eid;
    this.props = props;
};

var Path = function(vertices, edges) {
    this.vertices = vertices;
    this.edges = edges;
    this.start = function() {
        return this.vertices[0];
    };
    this.end = function() {
        return this.vertices[this.vertices.length-1];
    };
    this.len = function() {
        return this.edges.length;
    }
};

module.exports = {
    GraphId: GraphId,
    Vertex: Vertex,
    Edge: Edge,
    Path: Path
};
