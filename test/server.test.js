const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require('../src/server');

chai.use(chaiHttp);

describe('running http server', () => {

  var request = chai.request(server);
  var post = '{"breed": "doberman"}';
   
  it('posts', (done) => {
    request
        .post('/')
        .send(post)
        .end((err, response) => {
          if (err) console.log(err);
          assert.equal(response.statusCode, 200);
          done();
        });
  });
  
  it('gets posted resource', (done) => {
    request
        .get('/dogs/doberman.json')
        .end((err, response) => {
          assert.equal(response.text, post);
          done();
        });
  });
  
  it('deletes posted resource', (done) => {
    request
        .del('/dogs/doberman.json')
        .end((err, response) => {
          if (err) throw err;
          var resArray = response.text.split(' ');
          assert.equal('doberman.json', resArray[0]);
          done();
        });
  });
  
  // it('puts second resource', (done) => {
  //   var newPost = 
  //   request
  //       .put('/dogs/')
  //       .send(post)
  //       .end((err, response) => {
  //         if (err) console.log(err);
  //         assert.equal(response.statusCode, 200);
  //         done();
  //       });
  // });
  
  // it ('lists all file names in api at path /dogs', done => {
  //   request
  //       .get('/dogs')
  //       .end((err, response) => {
  //         if (err) throw err;
  //         assert.equal(1, 1); //  ! ! ! ! !
  //       });
  // });
  
  it('routes to 404 page when path is not recognized', (done) => {
    chai.request(server)
        .get('/random/path')
        .end((err, response) => {
          assert.equal(response.text, '404: Page Not Found');
          done();
        });
  });
});
  
  
  

