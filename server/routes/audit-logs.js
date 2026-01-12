const express = require('express');
const router = express.Router();
const { query } = require('../connection/db');
const authMiddleware = require('../middleware/auth');

// GET /api/audit-logs - Fetch all audit logs
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { search, severity } = req.query;
        let sql = `
            SELECT 
                al.id, al.action, al.severity, al.created_at, 
                a.full_name as admin_name
            FROM audit_logs al
            LEFT JOIN admins a ON al.admin_id = a.id
        `;
        const params = [];
        const conditions = [];

        if (search) {
            conditions.push(`(al.action ILIKE $${params.length + 1} OR a.full_name ILIKE $${params.length + 1} OR al.id::text ILIKE $${params.length + 1})`);
            params.push(`%${search}%`);
        }

        if (severity && severity !== 'ALL') {
            conditions.push(`al.severity = $${params.length + 1}`);
            params.push(severity);
        }

        if (conditions.length > 0) {
            sql += ` WHERE ` + conditions.join(' AND ');
        }

        sql += ` ORDER BY al.created_at DESC`;

        const result = await query(sql, params);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
