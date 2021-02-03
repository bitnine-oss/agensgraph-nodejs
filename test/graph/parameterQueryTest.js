const assert = require('assert');
const ag = require('../../lib');
const config = require('../config');

describe('ParameterQueryTest suite', function () {
    let client;
    before('setUp', function () {
        client = new ag.Client(config);
        client.connect();
        client.query('DROP GRAPH IF EXISTS gpt CASCADE');
        client.query('CREATE GRAPH gpt');
        client.query('SET graph_path = gpt');
    });
    after('tearDown', function () {
        client.query('DROP GRAPH gpt CASCADE')
            .then(() => client.end());
    });
    it('Test Cypher Types', async function () {
        const q = {
            text: "CREATE (n:v {s: $1, l: $2, d: $3, f: $4, t: $5, a: $6, o: $7}) RETURN n",
            values: ['', 0, 0.0, false, true, [1, 2, 3], {name: 'bylee'}]
        }
        const wrappedValues = [];
        q.values.forEach((value) => {
            wrappedValues.push(JSON.stringify(value))
        });
        q.values = wrappedValues;
        const res = await client.query(q);
        const v = res.rows[0].n.props;
        assert.strictEqual(v.s, '');
        assert.strictEqual(v.l, 0);
        assert.strictEqual(v.d, 0.0);
        assert.strictEqual(v.f, false);
        assert.strictEqual(v.t, true);
        assert.deepStrictEqual(v.a, [1, 2, 3]);
        assert.deepStrictEqual(v.o, {name: 'bylee'});
    });
    it('Test Objects and Arrays', async function () {
        const q = {
            text: "CREATE (n:v {ss: $1, ll: $2, dd: $3, ff: $4, tt: $5, aa: $6, oo: $7}) RETURN n",
            values: [['a', 'b', 'c'], [0, 1, 2], [0.0, 0.1, 0.2], [false, 0, '0'], [true, 1, '1'], [[1], [2], [3]], [{name: 'lee'}, {name: 'kim'}]]
        }
        const wrappedValues = [];
        q.values.forEach((value) => {
            wrappedValues.push(JSON.stringify(value))
        });
        q.values = wrappedValues;
        const res = await client.query(q);

        const v = res.rows[0].n.props;
        assert.deepStrictEqual(v.ss, ['a', 'b', 'c']);
        assert.deepStrictEqual(v.ll, [0, 1, 2]);
        assert.deepStrictEqual(v.dd, [0.0, 0.1, 0.2]);
        assert.deepStrictEqual(v.ff, [false, 0, '0']);
        assert.deepStrictEqual(v.tt, [true, 1, '1']);
        assert.deepStrictEqual(v.aa, [[1], [2], [3]]);
        assert.deepStrictEqual(v.oo, [{name: 'lee'}, {name: 'kim'}]);
    });
});
