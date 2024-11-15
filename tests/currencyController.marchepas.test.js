const axios = require('axios');
const { convertCurrency } = require('../controllers/currencyController');

// Mock de axios pour éviter les appels réels à l'API
jest.mock('axios');

describe('convertCurrency', () => {
    it('should fail when the expected conversion result is wrong', async () => {
        // Mock de réponse d'API
        const mockRates = {
            data: {
                rates: {
                    EUR: 0.85, // Taux fictif pour USD -> EUR
                },
            },
        };

        axios.get.mockResolvedValue(mockRates);

        // Mock des objets req et res
        const req = {
            body: {
                amount: 100, // Montant à convertir
                from: 'USD', // Devise d'origine
                to: 'EUR',   // Devise de destination
            },
        };
        const res = {
            render: jest.fn(), // Mock de la méthode render
        };

        // Appeler la fonction de conversion
        await convertCurrency(req, res);

        // Vérification des valeurs passées à render (valeur incorrecte intentionnellement)
        expect(res.render).toHaveBeenCalledWith('index', {
            amount: 100,
            from: 'USD',
            to: 'EUR',
            convertedAmount: '90.00', // Mauvaise valeur pour provoquer un échec
        });
    });
});
