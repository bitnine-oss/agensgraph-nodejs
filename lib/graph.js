const GraphId = function (oid, id) {
    this.oid = String(oid);
    this.id = String(id);
};

const Vertex = function (label, id, props) {
    this.label = label;
    this.id = id;
    this.props = props;
};

const Edge = function (label, id, sid, eid, props) {
    this.label = label;
    this.id = id;
    this.start = sid;
    this.end = eid;
    this.props = props;
};

const Path = function (vertices, edges) {
    this.vertices = vertices;
    this.edges = edges;
    this.start = function () {
        return this.vertices[0];
    };
    this.end = function () {
        return this.vertices[this.vertices.length - 1];
    };
    this.len = function () {
        return this.edges.length;
    }
};

module.exports = {
    GraphId: GraphId,
    Vertex: Vertex,
    Edge: Edge,
    Path: Path
};
