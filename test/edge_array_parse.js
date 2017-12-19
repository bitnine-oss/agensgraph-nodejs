var assert = require('assert');
var ag = require('../lib');

var config = {
    user: 'agraph',
    password: 'agraph',
    database: 'imdb',
    host: '27.117.163.21',
    port: 15602
};

var config_local = {
    user: 'agraph',
    password: 'agraph',
    database: 'imdb',
    host: '192.168.0.56',
    port: 6179
};


describe('Query', function() {
    describe('Multi Degree', function() {
        it('should return Vertex,Edge or Path', function(done) {

            var client = new ag.Client(config);
            client.connect(function (err) {
                if (err) throw err;

                // client.query('MATCH (a)-[r*..]->(b) RETURN *  limit 3;', [], function (err, result) {
                client.query('MATCH p=(a)-[r]->(b) RETURN *  limit 3;', [], function (err, result) {
                    if (err) throw err;

                    console.log( result );

                    client.end(function (err) {
                        if (err) throw err;
                    });

                    done()
                });
            });


        });
    });
});