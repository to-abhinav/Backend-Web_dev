const mongoose = require('mongoose');

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a fruit schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the fruit."]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// Create a fruit model
const Fruit = mongoose.model('Fruit', fruitSchema);

// Create fruit documents
const apple = new Fruit({
  name: 'Apple',
  rating: 8,
  review: 'Sweet and crunchy.'
});

const banana = new Fruit({
  name: 'Banana',
  rating: 9,
  review: 'Great source of potassium.'
});

const orange = new Fruit({
  name: 'Orange',
  rating: 7,
  review: 'Juicy and refreshing.'
});

// Save fruit documents to the database
apple.save();
banana.save();
orange.save();

// Close the database connection
mongoose.connection.close();
