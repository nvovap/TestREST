//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.HOSTPOSTGRES='10.10.1.242'
process.env.USERPOSTGRES='postgres'


//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('../index');
let should = chai.should();


let server = 'http://10.10.1.56:3000'

// let datamodel = require('../datamodel');
// datamodel.connnectToDatabase()
    



var token = '';
var idUser = '';
var idItem = ''

chai.use(chaiHttp);
//Наш основной блок
describe('Books', () => {
    
    // beforeEach((done) => { //Перед каждым тестом чистим базу
    //     // Book.remove({}, (err) => { 
    //     //    done();         
    //     // });
      

    //     console.log('========================')     

    //     console.log('Test is starting')
    //     done();
    // });




/*
  * Тест для /GET 
  */



 describe('/POST', () => {

  //DELETE user nvovap2@gmail.com"
  it('it should delete user nvovap2@gmail.com', (done) => {
    let datamodel = require('../datamodel');
    datamodel.connnectToDatabase()
    datamodel.findAllUsersByMail("nvovap2@gmail.com", (users) => {
      if (users.length > 0) {
        users[0].destroy()
      }
      done();
    });
  });

  it('it should create user nvovap2@gmail.com', (done) => {

    let user = {
      name: "test user",
      email: "nvovap2@gmail.com",
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
  


  it('it should login user nvovap2@gmail.com', (done) => {
    let user = {
        email: "nvovap2@gmail.com",
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



  it('it should login user nvovap2@gmail.com', (done) => {
    let user = {
        email: "nvovap2@gmail.com",
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


  //app.post('/api/item/:id/image',items_file.uploadItemImage);


  }); //POST



describe('/GET', () => {

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
        res.body.email.should.be.eql("nvovap2@gmail.com");
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
      .get('/api/user?email='+"nvovap2@gmail.com"+'&name=')
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


//   app.get('/api/item/:id', items_file.getItemByID); 
// app.get('/api/item?', items_file.getItems); 



});



describe('/PUT', () => {
// app.put('/api/me', authenticationFile.meUpdate);

// app.put('/api/item', items_file.createItem);
// app.put('/api/item/:id', items_file.updateItem);

  let item = {
        email: "nvovap2@gmail.com",
        password: "123"
    }

  it('it should PUT create ITEM /api/item', (done) => {
    chai.request(server)
      .put('/api/item')
      .set('authorization', token)
      .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('connection', 'keep-alive')
      .send(item)

  });

});


describe('/DELETE', () => {
  // app.delete('/api/item/:id/image',items_file.deleteItemImage);
// app.delete('/api/item/:id',items_file.deleteItem);

  it('it should DELETE /api/item/:id', (done) => {
    chai.request(server)
      .delete('/api/item/')
  });

});











// describe('/POST login', () => {
//   it('it should login user nvovap@gmail.com', (done) => {

//    // chai.request('http://10.10.1.56:3000')
//    chai.request(server)
//       .post('/api/login')
//       .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
//       .set('connection', 'keep-alive')
// //      .set('accept', '*/*')
// //      .expect("Content-type",/json/)
//       .send({ email: "nvovap2@gmail.com", password: "123"})
//       .end((err, res) => {
//  //       console.log(res.should.have.status)

//  //         res.should.have.status(200);
//           done();
//       });
//   });
// });





//   describe('/POST book', () => {
//       it('it should not POST a book without pages field', (done) => {
//         let book = {
//             title: "The Lord of the Rings",
//             author: "J.R.R. Tolkien",
//             year: 1954
//         }
//         chai.request(server)
//             .post('/book')
//             .send(book)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('errors');
//                 res.body.errors.should.have.property('pages');
//                 res.body.errors.pages.should.have.property('kind').eql('required');
//               done();
//             });
//       });

// describe('/POST login', () => {


//   it('it should login user nvovap@gmail.com', (done) => {
//     let user = {
//         "email": "nvovap@gmail.com",
//         "password": "123"
//     }
//     chai.request(server)
//       .post('/api/login')
//       .send(user)
//       .set('content-type', 'application/json')
//       .end((err, res) => {
//         res.should.have.status(200);
//         // res.body.should.be.a('object');
//         // res.body.should.have.property('token');

//         done();
//       }).catch(function (err) {
//                     throw err;
//                     console.log("HB END ERR :");
//                     console.log(err);
//                 });
//   });



// });

 
//   describe('/GET book', () => {
//       it('it should GET all the books', (done) => {
//         chai.request(server)
//             .get('/book')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                 res.body.length.should.be.eql(0);
//               done();
//             });
//       });
//   });



//   describe('/POST book', () => {
//       it('it should not POST a book without pages field', (done) => {
//         let book = {
//             title: "The Lord of the Rings",
//             author: "J.R.R. Tolkien",
//             year: 1954
//         }
//         chai.request(server)
//             .post('/book')
//             .send(book)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('errors');
//                 res.body.errors.should.have.property('pages');
//                 res.body.errors.pages.should.have.property('kind').eql('required');
//               done();
//             });
//       });


//       it('it should POST a book ', (done) => {
//         let book = {
//             title: "The Lord of the Rings",
//             author: "J.R.R. Tolkien",
//             year: 1954,
//             pages: 1170
//         }
//         chai.request(server)
//             .post('/book')
//             .send(book)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message').eql('Book successfully added!');
//                 res.body.book.should.have.property('title').eql('The Lord of the Rings');
//                 res.body.book.should.have.property('author');
//                 res.body.book.should.have.property('pages');
//                 res.body.book.should.have.property('year');
//               done();
//             });
//       });

//   });


//   describe('/GET/:id book', () => {
//       it('it should GET a book by the given id', (done) => {
//         let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
//         book.save((err, book) => {
//             chai.request(server)
//             .get('/book/' + book.id)
//             .send(book)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('title');
//                 res.body.should.have.property('author');
//                 res.body.should.have.property('pages');
//                 res.body.should.have.property('year');
//                 res.body.should.have.property('_id').eql(book.id);
//               done();
//             });
//         });

//       });
//   });

//   describe('/PUT/:id book', () => {
//       it('it should UPDATE a book given the id', (done) => {
//         let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
//         book.save((err, book) => {
//                 chai.request(server)
//                 .put('/book/' + book.id)
//                 .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('message').eql('Book updated!');
//                     res.body.book.should.have.property('year').eql(1950);
//                   done();
//                 });
//           });
//       });
//   });



// describe('/DELETE/:id book', () => {
//       it('it should DELETE a book given the id', (done) => {
//         let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
//         book.save((err, book) => {
//                 chai.request(server)
//                 .delete('/book/' + book.id)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('message').eql('Book successfully deleted!');
//                     res.body.result.should.have.property('ok').eql(1);
//                     res.body.result.should.have.property('n').eql(1);
//                   done();
//                 });
//           });
//       });
//   });
  

});