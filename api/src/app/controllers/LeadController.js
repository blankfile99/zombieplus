'use strict';

class LeadController {
    async store(req, res) {
        try {
            console.log('Mocking lead creation for:', req.body.email);
            return res.status(201).json({
                message: 'Lead registered successfully (Mock)',
                lead: {
                    name: req.body.name || 'Test Name',
                    email: req.body.email || 'test@email.com'
                }
            });
        } catch (error) {
            console.error('Error in LeadController.store:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async index(req, res) {
        return res.json({ data: [], total: 0 });
    }

    async show(req, res) {
        return res.json({ id: req.params.id, name: 'Test Lead' });
    }

    async delete(req, res) {
        return res.json({ message: 'Lead deleted (Mock)' });
    }
}

module.exports = new LeadController();