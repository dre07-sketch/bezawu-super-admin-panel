const express = require('express');
const router = express.Router();
const { query } = require('../connection/db');
const authMiddleware = require('../middleware/auth');

// GET /api/feedback - Get all feedback with analytics
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { search, sentiment } = req.query;
        let sql = `
            SELECT 
                f.id, f.order_id, f.rating, f.comment, f.sentiment, f.created_at, f.customer_id, f.branch_id,
                c.name as customer_name
            FROM feedback f
            LEFT JOIN customers c ON f.customer_id = c.id
        `;
        const params = [];
        const conditions = [];

        if (search) {
            conditions.push(`(f.order_id ILIKE $${params.length + 1} OR f.comment ILIKE $${params.length + 1} OR f.id ILIKE $${params.length + 1} OR c.name ILIKE $${params.length + 1})`);
            params.push(`%${search}%`);
        }

        if (sentiment && sentiment !== 'ALL') {
            conditions.push(`f.sentiment = $${params.length + 1}`);
            params.push(sentiment);
        }

        if (conditions.length > 0) {
            sql += ` WHERE ` + conditions.join(' AND ');
        }

        sql += ` ORDER BY f.created_at DESC`;

        const result = await query(sql, params);

        // Calculate analytics based on ALL feedback (ignoring filters for the high-level stats)
        const statsResult = await query(`
            SELECT 
                AVG(rating) as avg_rating,
                COUNT(*) as total_count,
                COUNT(*) FILTER (WHERE sentiment = 'POSITIVE') as positive_count
            FROM feedback
        `);

        const stats = {
            avgRating: parseFloat(statsResult.rows[0].avg_rating || 0).toFixed(1),
            totalCount: parseInt(statsResult.rows[0].total_count || 0),
            positiveRatio: statsResult.rows[0].total_count > 0
                ? Math.round((statsResult.rows[0].positive_count / statsResult.rows[0].total_count) * 100)
                : 0
        };

        res.json({
            success: true,
            data: result.rows,
            analytics: stats
        });
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
