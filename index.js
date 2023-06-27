const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');



const PORT = process.env.PORT || 3002;
const app = express();


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}!`);
  });
});
