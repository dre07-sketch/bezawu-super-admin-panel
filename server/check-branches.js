// Check branches table structure
const { query } = require('./connection/db');

async function checkBranchesTable() {
    try {
        console.log('Checking branches table structure...\n');

        const result = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'branches'
      ORDER BY ordinal_position;
    `);

        console.log('Branches table columns:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        result.rows.forEach(row => {
            console.log(`- ${row.column_name} (${row.data_type})`);
        });
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        const count = await query('SELECT COUNT(*) FROM branches');
        console.log(`Total branches: ${count.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

checkBranchesTable();
