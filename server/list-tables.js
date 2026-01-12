const { query } = require('./connection/db');

async function listAllTables() {
    try {
        const result = await query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);
        console.log('Tables in public schema:');
        result.rows.forEach(row => console.log(`- ${row.table_name}`));

        // Also check columns for potential manager tables
        const managersCheck = result.rows.find(r => r.table_name === 'managers');
        if (managersCheck) {
            console.log('\nChecking managers table columns:');
            const cols = await query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'managers'`);
            cols.rows.forEach(c => console.log(`  - ${c.column_name} (${c.data_type})`));
        }

        process.exit(0);
    } catch (e) {
        console.error('Error:', e.message);
        process.exit(1);
    }
}

listAllTables();
