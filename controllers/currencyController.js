// controllers/currencyController.js
const axios = require('axios');

// Fonction pour afficher la page principale
// controllers/currencyController.js

exports.showHomePage = (req, res) => {
    const { amount, from, to, convertedAmount } = req.body; // ou req.query selon la méthode utilisée
    res.render('index', {
        amount: amount || 0,
        from: from || 'USD',
        to: to || 'EUR',
        convertedAmount: convertedAmount || null
    });
};



// Fonction pour effectuer la conversion de devise
exports.convertCurrency = async (req, res) => {
    const { amount, from, to } = req.body;

    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const rates = response.data.rates;
        const convertedAmount = (amount * rates[to]).toFixed(2);
        res.render('index', { convertedAmount, from, to, amount }); // Passer les données à la vue
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération des taux de change' });
    }
};
