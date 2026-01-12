const express = require('express');
const router = express.Router();
const { query } = require('../connection/db');
const authMiddleware = require('../middleware/auth');

// GET /api/users - List all customers
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { search } = req.query;
        let sql = `
            SELECT 
                id, name, phone, email, is_verified, 
                profile_picture, default_car_plate as car_plate, 
                default_car_model as car_model, default_car_color as car_color
            FROM customers
        `;
        const params = [];

        if (search) {
            sql += ` WHERE name ILIKE $1 OR phone ILIKE $1 OR email ILIKE $1 OR id ILIKE $1`;
            params.push(`%${search}%`);
        }

        sql += ` ORDER BY name ASC`;

        const result = await query(sql, params);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// GET /api/users/:id - Get detailed user info with order history
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;

        // Fetch customer basic info
        const customerResult = await query(`
            SELECT 
                id, name, phone, email, is_verified, 
                profile_picture, default_car_plate as car_plate, 
                default_car_model as car_model, default_car_color as car_color
            FROM customers
            WHERE id = $1
        `, [userId]);

        if (customerResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        const customer = customerResult.rows[0];

        // Fetch orders with items
        const ordersResult = await query(`
            SELECT 
                o.id, b.name as branch_name, o.status, o.total_price, 
                o.car_model, o.car_plate, o.car_color, o.created_at
            FROM orders o
            JOIN branches b ON o.branch_id = b.id
            WHERE o.customer_id = $1
            ORDER BY o.created_at DESC
        `, [userId]);

        // For each order, fetch items
        const orders = [];
        for (const order of ordersResult.rows) {
            const itemsResult = await query(`
                SELECT 
                    oi.id, p.name, oi.quantity, oi.price_at_purchase as price, 
                    p.unit
                FROM order_items oi
                JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id = $1
            `, [order.id]);
            order.items = itemsResult.rows;
            orders.push(order);
        }

        customer.orders = orders;

        res.json({ success: true, data: customer });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
