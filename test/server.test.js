const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require('../src/server');

chai.use(chaiHttp);

describe('running http server', () => {
  
  const request = chai.request(server);
  
  // // WIP 
  // it(' responds with list on GET /dogs', (done) => { 
  //   assert.equal('true', false);
  //   done();
  // });

  // it('puts', (done) => {
  //   assert.equal('true', false);
  //   done();
  // });
  
  it('END 2 End post request', (done) => {
    var post = '{"breed": "doberman"}';
    request
        .post('/')
        .send(post)
        .then(res => {
          return res.id;
        })
        .then( id => {
          return request.get(`/dogs/${id}`);
        })
        .then( res => {
          assert.equal(res.statusCode, 200);
          done();
        })
        .catch( done );
        
  });
  
  it('routes to 404 page when path is not recognized', (done) => {
    chai.request(server)
        .get('/random/path')
        .end((err, response) => {
          assert.equal(response.text, '404: Page Not Found');
          done();
        });
  });
});
  
  
  

