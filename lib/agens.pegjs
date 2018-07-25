//  pegjs --output agens.js --allowed-start-rules EdgeArray,VertexArray,_Edge,_Vertex,_Path,GraphId agens.pegjs

{
    var g = require("./graph.js")

    var EdgeList = []
    var VertexList = []
    var PathList = []

    function num2GraphId(numstr) {
        var numpart = numstr.split('.')
        return new g.GraphId(numpart[0],numpart[1])
    }

    function mkEdge(label, id, sid, eid, props) {
        var eg =  new g.Edge(label, id, sid, eid, props)
        EdgeList.push(eg);
        return eg;
    }

    function mkVertex(label, id, props) {
        var vtx = new g.Vertex(label, id, props);
        VertexList.push(vtx);
        return vtx;
    }

    function mkPath() {
        var p = new g.Path(VertexList, EdgeList);

        VertexList = []
        EdgeList = []

        PathList.push(p);
        return p;
    }
}

EdgeArray = "[" _Edge ("," _Edge)* "]"  { return EdgeList }

VertexArray = "[" _Vertex ("," _Vertex)* "]"  { return VertexList }

_Vertex =  label:Id "[" id:GraphId "]" props:Object {  return mkVertex(label, id, props); }

_Edge = label:Id "[" id:GraphId "]" "[" from:GraphId "," to:GraphId  "]" props:Object   {  return mkEdge(label, id, from, to, props); }

_Path = "[" _Vertex "," _Edge "," _Vertex ("," _Edge "," _Vertex)* "]"  {  return mkPath(); }

Id = ([_\$A-Za-z][_\$0-9A-Za-z]*) { return text(); }

GraphId = graphid:Number { return num2GraphId(text());}




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
