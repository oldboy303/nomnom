// const app = require('../app');
// const request = require('supertest');
// const should = require('chai').should();

// describe('Yummly API call tests', () => {

//   it('A POST call to recipe search returns 10 recipes', (done) => {
//     request(app)
//     .post('/api/v1/recipes/search')
//     .send({ q: 'Chicken' })
//     .end((err, data) => {
//       data.body.matches.length.should.equal(10);
//       done();
//     });
//   });

//   it('Passing "maxResult" limits results', (done) => {
//     request(app)
//     .post('/api/v1/recipes/search')
//     .send({
//       q: 'Chicken',
//       maxResult: '3'
//     })
//     .end((err, data) => {
//       data.body.matches.length.should.equal(3);
//       done();
//     });
//   });

//   it('Passing "start" skips results', (done) => {
//     request(app)
//     .post('/api/v1/recipes/search')
//     .send({ q: 'Chicken' })
//     .end((err, data) => {
//       request(app)
//       .post('/api/v1/recipes/search')
//       .send({
//         q: 'Chicken',
//         start: '3'
//       })
//       .end((err, data2) => {
//         data2.body.matches[0].id.should.equal(data.body.matches[3].id);
//         done();
//       });
//     });
//   });

//   it('A GET call to recipe gets detailed recipe', (done) => {
//     request(app)
//     .post('/api/v1/recipes/search')
//     .send({
//       q: 'Chicken',
//       maxResult: '1'
//     })
//     .end((err, data) => {
//       request(app)
//       .get(`/api/v1/recipe/${ data.body.matches[0].id }`)
//       .end((err, data2) => {
//         data2.body.name.should.equal(data.body.matches[0].recipeName);
//         done();
//       });
//     });
//   })
// });
