const { query } = require('./connection/db');

async function checkTable(tableName) {
    try {
        const result = await query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = $1
            ORDER BY ordinal_position;
        `, [tableName]);

        console.log(`\nTable: ${tableName}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        result.rows.forEach(row => {
            console.log(`- ${row.column_name} (${row.data_type})`);
        });
    } catch (e) {
        console.error(`Error checking ${tableName}:`, e.message);
    }
}

async function run() {
    await checkTable('supermarkets');
    await checkTable('branches');
    await checkTable('customers');
    await checkTable('products');
    await checkTable('categories');
    await checkTable('orders');
    await checkTable('bank_accounts');
    await checkTable('order_items');
    process.exit(0);
}

run();
