//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.HOSTPOSTGRES='10.10.1.242'
process.env.USERPOSTGRES='postgres'
process.env.MAX_SIZE_FILE=80000


//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();


let fs = require('fs')

//let server = 'http://10.10.1.56:3000'
let server = require('../index');

// let datamodel = require('../datamodel');
// datamodel.connnectToDatabase()
    



var token = '';
var idUser = '';
var idItem = '';
var userEmail = "nvovap2@gmail.com";

chai.use(chaiHttp);
//Наш основной блок
describe('Portfolio', () => {
    

  describe('BEGIN', () => {

    it('it should delete user nvovap2@gmail.com', (done) => {
      let datamodel = require('../datamodel');
      datamodel.connnectToDatabase()
      datamodel.findAllUsersByMail(userEmail, (users) => {
       if (users.length > 0) {
          users[0].destroy()
        }
        done();
      });
    });

  });


  describe('TEST USER ', () => {
    

    it('it should create user '+userEmail, (done) => {

      let user = {
          name: "test user",
          email: userEmail,
          password: "123",
          phone: "+38(097)276-56-27"
      }

      chai.request(server)
      //chai.request(server)
        .post('/api/register')
        .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('connection', 'keep-alive')
        .send(user)
        .end((err, res) => {

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          
          token = res.body.token;

          done();
        })
      });
  


    it('it should login user  '+userEmail, (done) => {
      let user = {
        email: userEmail,
        password: "123"
      }

      chai.request(server)
        .post('/api/login')
        .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('connection', 'keep-alive')
        .send(user)
        .end((err, res) => {

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');

          token = res.body.token;

          done();
        })
    });


    it('it should GET error token information about user', (done) => {
      chai.request(server)
        .get('/api/me')
        .set('authorization', '')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });


    it('it should GET information about user', (done) => {
      chai.request(server)
        .get('/api/me')
        .set('authorization', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('email');
            res.body.email.should.be.eql(userEmail);
            res.body.should.have.property('phone');
            res.body.should.have.property('name');
            res.body.should.have.property('id');
            idUser = res.body.id;

            done();
        });
    });

    ///api/user/:id' 
    it('it should GET /api/user/:id', (done) => {
      chai.request(server)
        .get('/api/user/'+idUser)
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.id.should.be.eql(idUser);
          res.body.should.have.property('phone');
          res.body.should.have.property('name');
          res.body.should.have.property('email');


          done();
        });
    });


    it('it should GET /api/user?', (done) => {
      chai.request(server)
        .get('/api/user?email='+userEmail+'&name=')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);

          res.body[0].should.have.property('id');
          res.body[0].id.should.be.eql(idUser);
          res.body[0].should.have.property('phone');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('email');


          done();
      });
    });



    it('it should PUT /api/me change user ', (done) => {

        let user = {
            name: "test user 2",
            email: '',
            password: "123",
            phone: "+38(097)276-56-28"
        }

        chai.request(server)
          .put('/api/me')
          .set('authorization', token)
          .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
          .set('connection', 'keep-alive')
          .send(user)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');

              res.body.should.have.property('id');
              res.body.id.should.be.eql(idUser);
              res.body.should.have.property('phone');
              res.body.phone.should.be.eql("+38(097)276-56-28");
              res.body.should.have.property('name');
              res.body.name.should.be.eql("test user 2");
              res.body.should.have.property('email');
              res.body.email.should.be.eql(userEmail);



              done();
        });
      });
    


  }); 



  describe('TEST Items', () => {


    it('it should PUT create ITEM /api/item', (done) => {
        let item = {
          title: "Title test",
          description: "description 123"
        }


        chai.request(server)
          .put('/api/item')
          .set('authorization', token)
          .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
          .set('connection', 'keep-alive')
          .send(item)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');

            res.body.should.have.property('title');
            res.body.title.should.be.eql('Title test');



            res.body.should.have.property('description');
            res.body.should.have.property('created_at');
        
            res.body.should.have.property('user_id'); 
            res.body.user_id.should.be.eql(idUser);
        
            res.body.should.have.property('user');

            // console.log(res.body)
            // console.log(res.body.user)

            res.body.user.should.be.a('object');
            res.body.user.should.have.property('email');
            res.body.user.email.should.be.eql(userEmail);

            res.body.should.have.property('id');
            idItem = res.body.id;

            done();
        });

    });




    it('it should POST upload Image OK', (done) => {

      chai.request(server)
          .post('/api/item/'+idItem+'/image')
          .set('authorization', token)
          .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
          .set('connection', 'keep-alive')
          .attach('File', fs.readFileSync('./test/testOK.jpg'), 'testOK.jpg')
          .end((err, res) => {
               res.should.have.status(200);

               done();
          });

    });



    it("it should POST upload Image don't OK SIZE ", (done) => {


      chai.request(server)
          .post('/api/item/'+idItem+'/image')
          .set('authorization', token)
          .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
          .set('connection', 'keep-alive')
          .attach('File', fs.readFileSync('./test/testDontOK.png'), 'testDontOK.png')
          .end((err, res) => {
               res.should.have.status(422);

               done();
          });

    });



    describe('/PUT and DELETE Item', () => {
      let item = {
        title: "Title test",
        description: "description 123"
      }

      it('it should PUT create ITEM /api/item', (done) => {
        chai.request(server)
          .put('/api/item')
          .set('authorization', token)
          .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
          .set('connection', 'keep-alive')
          .send(item)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');

            res.body.should.have.property('title');
            res.body.title.should.be.eql('Title test');



            res.body.should.have.property('description');
            res.body.should.have.property('created_at');
        
            res.body.should.have.property('user_id'); 
            res.body.user_id.should.be.eql(idUser);
        
            res.body.should.have.property('user');

            // console.log(res.body)
            // console.log(res.body.user)

            res.body.user.should.be.a('object');
            res.body.user.should.have.property('email');
            res.body.user.email.should.be.eql(userEmail);

            res.body.should.have.property('id');
            idTEMPItem = res.body.id;

            done();
        });

      });

      it('it should DELETE ITEM /api/item', (done) => {
        chai.request(server)
          .delete('/api/item/'+idTEMPItem)
          .set('authorization', token)
          .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
          .set('connection', 'keep-alive')
          .end((err, res) => {
            res.should.have.status(200);
            idTEMPItem = '';

            done();
        });

      });

    });



  });
  


  describe('END', () => {

    it('it should DELETE ITEM /api/item', (done) => {
      chai.request(server)
        .delete('/api/item/'+idItem)
        .set('authorization', token)
        .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('connection', 'keep-alive')
        .end((err, res) => {
            res.should.have.status(200);
            idItem = '';

            done();
        });

    });


    it('it should delete user nvovap2@gmail.com', (done) => {
      let datamodel = require('../datamodel');
      datamodel.connnectToDatabase()
      datamodel.findAllUsersByMail(userEmail, (users) => {
       if (users.length > 0) {
          users[0].destroy()
        }
        done();
      });
    });



  });




});