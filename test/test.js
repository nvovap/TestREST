//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('../index');
//let should = chai.should();

chai.use(chaiHttp);
//Наш основной блок
describe('Books', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        // Book.remove({}, (err) => { 
        //    done();         
        // });

        console.log('========================')     

        console.log('Test is starting')
        done();
    });




/*
  * Тест для /GET 
  */



// describe('/GET me', () => {
//   it('it should GET error information about user', (done) => {
//     chai.request(server)
//       .get('/api/me')
//       .set('token', '1345054201052')
//       .end((err, res) => {
//         res.should.have.status(400);
//         console.log(res)
//         done();
//       });
//   });
// });


 



describe('/POST login', () => {
  it('it should login user nvovap@gmail.com', (done) => {
    
    // let user = {
    //   email: "nvovap@gmail.com",
    //   password: "123"
    // }

    chai.request('http://10.10.1.56:3000')
      .post('/api/login')
      .set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('connection', 'keep-alive')
//      .set('accept', '*/*')
//      .expect("Content-type",/json/)
      .send({ email: "nvovap2@gmail.com", password: "123"})
      .end((err, res) => {
 //       console.log(res.should.have.status)

 //         res.should.have.status(200);
          done();
      });
  });
});





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