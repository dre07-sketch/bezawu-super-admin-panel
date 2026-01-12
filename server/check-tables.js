// Script to check database tables
const { query } = require('./connection/db');

async function checkTables() {
    try {
        console.log('Checking database tables...\n');

        // Get all tables
        const result = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

        console.log('Available tables:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        result.rows.forEach(row => {
            console.log(`- ${row.table_name}`);
        });
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Check admins table
        const adminCount = await query('SELECT COUNT(*) FROM admins');
        console.log(`Admins: ${adminCount.rows[0].count} records`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

checkTables();
