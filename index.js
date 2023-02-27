const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

Recipe.create({
  title: 'Pizza Margherita',
  level: 'Easy Peasy',
  ingredients: ['flour', 'water', 'yeast', 'tomatoes', 'mozzarella', 'basil'],
  cuisine: 'Italian',
  dishType: 'main_course',
  duration: 60,
  creator: 'Chef Luigi'
}).then(recipe => {
  console.log(`Created recipe: ${recipe.title}`);
}).catch(error => {
  console.error('Error creating recipe:', error);
});

const recipes = require('./data.json');

Recipe.insertMany(recipes).then(recipes => {
  recipes.forEach(recipe => {
    console.log(`Inserted recipe: ${recipe.title}`);
  });
}).catch(error => {
  console.error('Error inserting recipes:', error);
});

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }).then(recipe => {
  console.log(`Updated recipe: ${recipe.title}`);
}).catch(error => {
  console.error('Error updating recipe:', error);
});

Recipe.deleteOne({ title: 'Carrot Cake' }).then(() => {
  console.log('Deleted recipe: Carrot Cake');
}).catch(error => {
  console.error('Error deleting recipe:', error);
});