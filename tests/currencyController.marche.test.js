const axios = require('axios');
const { convertCurrency } = require('../controllers/currencyController');

// Mock de axios pour éviter les appels réels à l'API
jest.mock('axios');

describe('convertCurrency', () => {
    it('should convert the currency correctly', async () => {
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

        // Vérification des valeurs passées à render
        expect(res.render).toHaveBeenCalledWith('index', {
            amount: 100,
            from: 'USD',
            to: 'EUR',
            convertedAmount: '85.00', // Résultat attendu
        });
    });

    it('should handle API errors gracefully', async () => {
        // Simuler une erreur d'API
        axios.get.mockRejectedValue(new Error('API Error'));

        const req = {
            body: {
                amount: 100,
                from: 'USD',
                to: 'EUR',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(), // Mock de méthode chaînée
            send: jest.fn(),
        };

        // Appeler la fonction de conversion
        await convertCurrency(req, res);

        // Vérification que l'erreur est gérée correctement
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: 'Erreur lors de la récupération des taux de change' });
    });
});
