const { query } = require('./connection/db');

async function checkData() {
    try {
        const supermarkets = await query("SELECT id, name, status FROM supermarkets LIMIT 5");
        console.log('Supermarkets:', supermarkets.rows);

        const activeSupermarkets = await query("SELECT COUNT(*) FROM supermarkets WHERE status = 'ACTIVE'");
        console.log('Active Supermarkets Count:', activeSupermarkets.rows[0].count);

        const branches = await query("SELECT id, supermarket_id, status FROM branches LIMIT 5");
        console.log('Branches:', branches.rows);

        const activeBranches = await query("SELECT COUNT(*) FROM branches WHERE status = 'ACTIVE'");
        console.log('Active Branches Count:', activeBranches.rows[0].count);

        const orders = await query("SELECT COUNT(*) FROM orders");
        console.log('Total Orders:', orders.rows[0].count);

        process.exit(0);
    } catch (e) {
        console.error('Error:', e.message);
        process.exit(1);
    }
}

checkData();
