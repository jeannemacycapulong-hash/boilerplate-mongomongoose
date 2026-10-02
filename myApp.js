require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = function(done) {
  const document = new Person({
    name: "Jeanne",
    age: 21,
    favoriteFoods: ["Ramyun", "Pizza", "Coffee"]
  });

  document.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;