const express = require('express');
const router = express.Router();
const { query } = require('../connection/db');
const authMiddleware = require('../middleware/auth');

// GET /api/system/config - Get all system configurations
router.get('/config', authMiddleware, async (req, res) => {
    try {
        const result = await query('SELECT name, value FROM system');
        const config = {};
        result.rows.forEach(row => {
            config[row.name] = row.value;
        });

        res.json({
            success: true,
            data: config
        });
    } catch (error) {
        console.error('Error fetching system config:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// POST /api/system/update - Update a system configuration key
router.post('/update', authMiddleware, async (req, res) => {
    try {
        const { name, value } = req.body;

        if (!name || value === undefined) {
            return res.status(400).json({ success: false, message: 'Name and value are required' });
        }

        // Check if the key exists
        const checkResult = await query('SELECT name FROM system WHERE name = $1', [name]);

        if (checkResult.rows.length === 0) {
            // Insert if not exists
            await query(
                'INSERT INTO system (name, value, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP)',
                [name, value.toString()]
            );
        } else {
            // Update if exists
            await query(
                'UPDATE system SET value = $1, updated_at = CURRENT_TIMESTAMP WHERE name = $2',
                [value.toString(), name]
            );
        }

        res.json({ success: true, message: `System configuration '${name}' updated successfully` });
    } catch (error) {
        console.error('Error updating system config:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
