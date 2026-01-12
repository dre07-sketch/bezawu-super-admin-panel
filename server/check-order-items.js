// Check order_items table structure
const { query } = require('./connection/db');

async function checkOrderItemsTable() {
    try {
        console.log('Checking order_items table structure...\n');

        // Get column information
        const result = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'order_items'
      ORDER BY ordinal_position;
    `);

        console.log('Order_items table columns:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        result.rows.forEach(row => {
            console.log(`- ${row.column_name} (${row.data_type})`);
        });
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Get sample data
        const sampleData = await query('SELECT * FROM order_items LIMIT 1');
        if (sampleData.rows.length > 0) {
            console.log('Sample order_item:');
            console.log(JSON.stringify(sampleData.rows[0], null, 2));
        } else {
            console.log('No order_items in database');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

checkOrderItemsTable();
