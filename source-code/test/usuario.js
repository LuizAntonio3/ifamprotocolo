var _usuarios = require('../models/usuario');

var _ = require('lodash');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../bin/www');

var should = chai.should();

chai.use(chaiHttp);

describe('users', () => {
    beforeEach((done) => {
        _usuarios
        .fetchAll()
        .then(function(usuarios) {
            _.each(usuarios, function (model) { //I am looping over models using underscore, you can use any loop
                    if (model) {
                        model.destroy();
                    }

                    
            })
        })
        .catch(function(error) {
            console.log(error);
        });
    });
    describe('/get user', ()=>{ 
        it('should get all the users', (done) => {
            chai.request(server)
            .get('/usuario')
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });
});


