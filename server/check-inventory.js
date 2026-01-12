const { query } = require('./connection/db');

async function checkInventoryTables() {
    try {
        const tables = ['inventory', 'branch_inventory', 'products'];
        for (const table of tables) {
            console.log(`\nTable: ${table}`);
            const cols = await query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1`, [table]);
            cols.rows.forEach(c => console.log(`  - ${c.column_name} (${c.data_type})`));
        }
        process.exit(0);
    } catch (e) {
        console.error('Error:', e.message);
        process.exit(1);
    }
}

checkInventoryTables();
