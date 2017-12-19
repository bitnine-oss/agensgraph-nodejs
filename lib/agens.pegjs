//  pegjs --allowed-start-rules EdgeArray,VertexArray,_Edge,_Vertex,_Path agens.pegjs

{
    var EdgeList = []
    var VertexList = []
    var PathList = []

    var GID = function(oid, id){
    	this.oid = oid;
    	this.id = id;
    };

    var Edge = function(label, id, sid, eid, props){
    	this.label = label;
    	this.eid = id;
    	this.svid = sid;
    	this.evid = eid;
    	this.props = props;
    };

    var Vertex = function(label, gid, props){
    	this.label = label;
    	this.vid = gid;
    	this.props = props;
    };

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

    function num2Gid(numstr) {
        var numpart = numstr.split('.')
        return new GID(numpart[0],numpart[1])
    }

    function mkEdge(label, id, sid, eid, props){
        var eg =  new Edge(label, id, sid, eid, props)
        EdgeList.push(eg);
        return eg;
    }

    function mkVertex(label, id, props) {
        var vtx = new Vertex(label, id, props);
        VertexList.push(vtx);
        return vtx;
    }

    function mkPath() {
        var p = new Path(VertexList, EdgeList);

        VertexList = []
        EdgeList = []

        PathList.push(p);
        return p;
    }
}

EdgeArray = "[" _Edge ("," _Edge)* "]"  { return EdgeList }

VertexArray = "[" _Vertex ("," _Vertex)* "]"  { return VertexList }

_Vertex =  label:Id "[" id:Gid "]" props:Object {  return mkVertex(label, id, props); }

_Edge = label:Id "[" id:Gid "]" "[" from:Gid "," to:Gid  "]" props:Object   {  return mkEdge(label, id, from, to, props); }

_Path = "[" _Vertex "," _Edge "," _Vertex ("," _Edge "," _Vertex)* "]"  {  return mkPath(); }

Id = ([_\$A-Za-z][_\$0-9A-Za-z]*) { return text(); }

Gid = gid:Number { return num2Gid(text());}




JSON = S? ( Object / Array / String / True / False / Null / Number ) S?

Object = "{"
             ( String ":" JSON ( "," String ":" JSON )*
             / S? )
         "}"  { return JSON.parse(text()); }

Array = "["
            ( JSON ( "," JSON )*
            / S? )
        "]"

String = S? ["] ( Escape / [^"\u0000-\u001F] )* ["] S?

Escape = [\\] ( ["] / [/] / [\] / [b] / [f] / [n] / [r] / [t] / UnicodeEscape )

UnicodeEscape = "u" [0-9A-Fa-f]{4}

True = "true"

False = "false"

Null = "null"

Number = (Minus? IntegralPart FractionalPart? ExponentPart?)

Minus = "-"

IntegralPart = "0" / [1-9] [0-9]*

FractionalPart = "." [0-9]+

ExponentPart = ( "e" / "E" ) ( "+" / "-" )? [0-9]+

S = [\u0009\u000A\u000D\u0020]+
