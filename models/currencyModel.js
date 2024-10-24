// models/currencyModel.js
const axios = require('axios');

const getExchangeRates = async (currency) => {
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
        return response.data.rates;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des taux de change');
    }
};

module.exports = { getExchangeRates };
