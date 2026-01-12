// Check customers table structure
const { query } = require('./connection/db');

async function checkCustomersTable() {
    try {
        console.log('Checking customers table structure...\n');

        const result = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'customers'
      ORDER BY ordinal_position;
    `);

        console.log('Customers table columns:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        result.rows.forEach(row => {
            console.log(`- ${row.column_name} (${row.data_type})`);
        });
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        const count = await query('SELECT COUNT(*) FROM customers');
        console.log(`Total customers: ${count.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

checkCustomersTable();
