const homeModel = require('../models/homeModel');

exports.showHomePage = (req, res) => {
  const message = homeModel.getMessage();  // Appel du modèle pour obtenir un message
  res.render('home', { message });  // Rendre la vue home.ejs avec le message
};
