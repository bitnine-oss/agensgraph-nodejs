//  pegjs --output agens.js --allowed-start-rules EdgeArray,VertexArray,_Edge,_Vertex,_Path,GraphId agens.pegjs

{
    let edgeList: Edge[] = []
    let vertexList: Vertex[] = []
    const pathList: Path[] = []

    function num2GraphId(numstr: string) {
        const numpart = numstr.split('.')!
        return g.GraphId(numpart[0]!, numpart[1]!)
    }

    function mkEdge(label: string, id: string, sid: string, eid: string, props: object) {
        const eg = g.Edge(label, id, sid, eid, props)
        edgeList.push(eg);
        return eg;
    }

    function mkVertex(label: string, id: string, props: object) {
        const vtx = g.Vertex(label, id, props);
        vertexList.push(vtx);
        return vtx;
    }

    function mkPath() {
        const p = g.Path(vertexList, edgeList);

        vertexList = []
        edgeList = []

        pathList.push(p);
        return p;
    }
}

EdgeArray = "[" _Edge ("," _Edge)* "]"  { return edgeList }

VertexArray = "[" _Vertex ("," _Vertex)* "]"  { return vertexList }

_Vertex =  label:Id "[" id:GraphId "]" props:Object {  return mkVertex(label, id, props); }

_Edge = label:Id "[" id:GraphId "]" "[" from:GraphId "," to:GraphId  "]" props:Object   {  return mkEdge(label, id, from, to, props); }

_Path = "[" _Vertex "," _Edge "," _Vertex ("," _Edge "," _Vertex)* "]"  {  return mkPath(); }

Id = ([_\$A-Za-z][_\$0-9A-Za-z]*) { return text(); }

GraphId = graphid:Number { return num2GraphId(graphid);}




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
