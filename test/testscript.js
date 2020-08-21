//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
/*
  * Test the /GET route
  */
 let objUrl = {
	"url":"https://www.amazon.in/gp/product/B072F3S8RX?pf_rd_r=RVA5VY0MSNK5W8T4P3DP&pf_rd_p=649eac15-05ce-45c0-86ac-3e413b8ba3d4"
   };
  describe('/post url', () => {
      it('it should GET all the information', (done) => {
        chai.request(server)
            .post('/api/scrape')
            .send(objUrl)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('title');
              done();
            });
      });
  });
