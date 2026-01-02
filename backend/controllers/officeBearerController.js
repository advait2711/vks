import * as officeBearerModel from '../models/officeBearerModel.js';

/**
 * Get office bearers for current term (2025-2028)
 */
export const getCurrentOfficeBearers = async (req, res) => {
    try {
        const bearers = await officeBearerModel.getOfficeBearersByTerm('2025', '2028');
        res.json(bearers);
    } catch (error) {
        console.error('Error fetching office bearers:', error);
        res.status(500).json({ error: 'Failed to fetch office bearers' });
    }
};

/**
 * Get office bearers for a specific term
 */
export const getOfficeBearersByTerm = async (req, res) => {
    try {
        const { termStart, termEnd } = req.params;
        const bearers = await officeBearerModel.getOfficeBearersByTerm(termStart, termEnd);
        res.json(bearers);
    } catch (error) {
        console.error('Error fetching office bearers by term:', error);
        res.status(500).json({ error: 'Failed to fetch office bearers' });
    }
};

/**
 * Get all office bearers
 */
export const getAllOfficeBearers = async (req, res) => {
    try {
        const bearers = await officeBearerModel.getAllOfficeBearers();
        res.json(bearers);
    } catch (error) {
        console.error('Error fetching all office bearers:', error);
        res.status(500).json({ error: 'Failed to fetch office bearers' });
    }
};
