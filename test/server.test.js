const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require('../src/server');

chai.use(chaiHttp);

describe('running http server', () => {
  // WIP 
  it(' responds with list on GET /dogs', (done) => { 
    assert.equal('true', false);
    done();
  });

  it('puts', (done) => {
    assert.equal('true', false);
    done();
  });
  
  it('receives post request', (done) => {
    var post = '{"breed": "doberman"}';
    chai.request(server)
        .post('/')
        .send(post)
        .end((err, response) => { 
  
          if (err) throw err;
          fs.readFile('./data/doberman.json', (err, data) => {
            if (err) throw err;
            assert.equal(data.toString(), post);  
            done();
          });  
    
          
        });
        
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
  
  
  

