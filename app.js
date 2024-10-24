// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const currencyController = require('./controllers/currencyController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); // Utilisation d'EJS comme moteur de template
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', currencyController.showHomePage);
app.post('/convert', currencyController.convertCurrency);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
