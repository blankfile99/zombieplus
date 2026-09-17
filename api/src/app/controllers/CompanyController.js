'use strict';

const Company = require('../models/Company');

class CompanyController {
    async index(req, res) {
        const name = req.query.name || '';
        const result = await Company.findAndCountAll({
            order: ['id'],
            where: {
                name: {
                    $iLike: `%${name}%`,
                },
            },
            attributes: ['id', 'name'],
        });

        return res.json({
            data: result.rows,
            total: result.count,
        });
    }
}

module.exports = new CompanyController();
