const express = require('express');
const router = express.Router();
const { query } = require('../connection/db');
const authMiddleware = require('../middleware/auth');

// GET /api/supermarkets - Get all supermarkets with basic stats
router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await query(`
            SELECT 
                s.*,
                COUNT(DISTINCT b.id) as branch_count,
                COALESCE(SUM(o.total_price), 0) as total_revenue,
                COUNT(DISTINCT o.customer_id) as total_customers
            FROM supermarkets s
            LEFT JOIN branches b ON s.id = b.supermarket_id
            LEFT JOIN orders o ON b.id = o.branch_id AND o.status NOT ILIKE 'CANCELLED'
            GROUP BY s.id
            ORDER BY s.created_at DESC
        `);

        // Get bank accounts for each supermarket to match the UI interface structure
        const supermarkets = await Promise.all(result.rows.map(async (s) => {
            const bankAccounts = await query('SELECT * FROM bank_accounts WHERE supermarket_id = $1', [s.id]);

            // Also need inventory count - summing up products in all categories of this supermarket
            const inventoryResult = await query(`
                SELECT COUNT(*) as product_count
                FROM products p
                JOIN categories c ON p.category_id = c.id
                WHERE c.supermarket_id = $1
            `, [s.id]);

            return {
                ...s,
                branches: parseInt(s.branch_count),
                total_revenue: parseFloat(s.total_revenue),
                total_customers: parseInt(s.total_customers),
                total_inventory: parseInt(inventoryResult.rows[0].product_count),
                bankAccounts: bankAccounts.rows,
                reg_code: s.id // Using ID as reg_code for now
            };
        }));

        res.json({
            success: true,
            data: supermarkets
        });

    } catch (error) {
        console.error('Error fetching supermarkets:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch supermarkets'
        });
    }
});

// GET /api/supermarkets/:id - Get detailed supermarket info
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query('SELECT * FROM supermarkets WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Supermarket not found' });
        }

        const supermarket = result.rows[0];
        const bankAccounts = await query('SELECT * FROM bank_accounts WHERE supermarket_id = $1', [id]);

        // Basic stats
        const statsResult = await query(`
            SELECT 
                COUNT(DISTINCT b.id) as branch_count,
                COALESCE(SUM(o.total_price), 0) as total_revenue,
                COUNT(DISTINCT o.customer_id) as total_customers
            FROM branches b
            LEFT JOIN orders o ON b.id = o.branch_id AND o.status NOT ILIKE 'CANCELLED'
            WHERE b.supermarket_id = $1
        `, [id]);

        const inventoryResult = await query(`
            SELECT COUNT(*) as product_count
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE c.supermarket_id = $1
        `, [id]);

        res.json({
            success: true,
            data: {
                ...supermarket,
                branches: parseInt(statsResult.rows[0].branch_count),
                total_revenue: parseFloat(statsResult.rows[0].total_revenue),
                total_customers: parseInt(statsResult.rows[0].total_customers),
                total_inventory: parseInt(inventoryResult.rows[0].product_count),
                bankAccounts: bankAccounts.rows,
                reg_code: supermarket.id
            }
        });

    } catch (error) {
        console.error('Error fetching supermarket detail:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch supermarket details'
        });
    }
});

// PATCH /api/supermarkets/:id/status - Update supermarket status
router.patch('/:id/status', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const result = await query(
            'UPDATE supermarkets SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Supermarket not found' });
        }

        res.json({
            success: true,
            message: 'Status updated successfully',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update supermarket status'
        });
    }
});

// POST /api/supermarkets - Create a new supermarket


module.exports = router;
