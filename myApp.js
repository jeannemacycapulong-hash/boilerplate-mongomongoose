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

const arrayOfPeople = [
  { name: "Mary", age: 30, favoriteFoods: ["Burrito"] },
  { name: "John", age: 25, favoriteFoods: ["Vegetables"] },
  { name: "Bob", age: 40, favoriteFoods: ["Pizza"] }
];

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = function(personName, done) {
  Person.find({ name: personName }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = function(food, done) {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = function(personId, done) {
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = function(personId, done) {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);
    
    person.favoriteFoods.push(foodToAdd);

    person.save(function(err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = function(personName, done) {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function(err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson);
    }
  );
};

const removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, function(err, removedPerson) {
    if (err) return console.error(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = function(done) {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(err, result) {
    if (err) return console.error(err);
    done(null, result);
  });
};

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.arrayOfPeople = arrayOfPeople;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;