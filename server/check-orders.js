// Check orders table structure
const { query } = require('./connection/db');

async function checkOrdersTable() {
    try {
        console.log('Checking orders table structure...\n');

        // Get column information
        const result = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'orders'
      ORDER BY ordinal_position;
    `);

        console.log('Orders table columns:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        result.rows.forEach(row => {
            console.log(`- ${row.column_name} (${row.data_type})`);
        });
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Get sample data
        const sampleData = await query('SELECT * FROM orders LIMIT 1');
        if (sampleData.rows.length > 0) {
            console.log('Sample order:');
            console.log(JSON.stringify(sampleData.rows[0], null, 2));
        } else {
            console.log('No orders in database');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

checkOrdersTable();
