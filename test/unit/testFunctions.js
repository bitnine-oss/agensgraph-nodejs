var GraphId = function(oid, id){
	this.oid = String(oid);
	this.id = String(id);
};

function num2GraphId(numstr) {
        var numpart = numstr.toString().split('.')
        return new GraphId(numpart[0],numpart[1])
    }


var Vertex = function(label, id, props){
    	this.label = label;
		  this.id = new num2GraphId(id);
    	this.props = props;
};

var Edge = function(label, id, sid, eid, props){
    	this.label = label;
		  this.id = new num2GraphId(id);
    	this.startVertexId = new num2GraphId(sid);
    	this.endVertexId = new num2GraphId(eid);
    	this.props = props;
};

module.exports = {
  GraphId: GraphId,
  Vertex: Vertex,
  Edge: Edge
 };
