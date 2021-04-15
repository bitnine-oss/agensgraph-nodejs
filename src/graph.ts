const GraphId = function (oid: string, id: string) {
    return {
        oid: String(oid),
        id: String(id),
    }
};

interface Vertex {
    label: string;
    id: string;
    props: object;
}

const Vertex = function (label: string, id: string, props: object): Vertex {
    return {
        label,
        id,
        props
    }
};

interface Edge {
    label: string;
    id: string;
    start: string;
    end: string;
    props: object;
}

const Edge = function (label: string, id: string, sid: string, eid: string, props: object): Edge {
    return {
        label,
        id,
        start: sid,
        end: eid,
        props
    }
};

interface Path {
    vertices: Vertex[],
    edges: Edge[],
    start: () => Vertex,
    end: () => Vertex,
    len: () => number
}

const Path = function (vertices: Vertex[], edges: Edge[]): Path {
    return {
        vertices: vertices,
        edges: edges,
        start: function (): Vertex {
            return vertices[0]!;
        },
        end: function (): Vertex {
            return vertices[vertices.length - 1]!;
        },
        len: function () {
            return edges.length;
        }
    }
};

export type {
    GraphId,
    Vertex,
    Edge,
    Path
}
export default {
    GraphId,
    Vertex,
    Edge,
    Path
}
