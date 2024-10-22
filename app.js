const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuration de EJS pour le rendu des vues
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware pour servir les fichiers statiques (CSS, images, etc.)
app.use(express.static('public'));

// Middleware pour parser les données des formulaires
app.use(bodyParser.urlencoded({ extended: true }));

// Importer le contrôleur
const homeController = require('./controllers/homeController');

// Route pour la page d'accueil
app.get('/', homeController.showHomePage);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
