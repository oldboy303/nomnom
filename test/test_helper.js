const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/nom-nom_test');
  mongoose.connection
    .on('connected', () => {
      console.log('CONNECTED TO TEST DB');
      done();
    });
});

beforeEach((done) => {
  const { cookbooks } = mongoose.connection.collections;
  cookbooks.drop()
    .then(() => cookbooks.createIndex({ "email": 1 }, { unique: true }))
    .then(() => done())
    .catch(() => done());
});
