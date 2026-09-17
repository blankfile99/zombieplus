const Movie = require('../models/Movie');
const TvShow = require('../models/TvShow');

class FeaturedController {
  async index(req, res) {
    try {
      // MOCK DATA para teste de conectividade
      const data = [
        { id: '1', title: 'Teste Movie', overview: 'Descrição de teste', release_year: 2024, cover: 'http://via.placeholder.com/150' },
        { id: '2', title: 'Teste TV Show', overview: 'Descrição de teste', release_year: 2024, cover: 'http://via.placeholder.com/150' }
      ];

      console.log('Returning mock data for catalog...');
      return res.json({ data, total: data.length });
    } catch (error) {
      console.error('Error in FeaturedController.index:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new FeaturedController();
