const { query } = require('../connection/db');

/**
 * Fetches a system configuration value from the 'system' table.
 * @param {string} name - The name of the configuration key.
 * @param {any} defaultValue - The value to return if the key is not found.
 * @returns {Promise<any>}
 */
async function getSystemConfig(name, defaultValue = null) {
    try {
        const result = await query('SELECT value FROM system WHERE name = $1', [name]);
        if (result.rows.length > 0) {
            return result.rows[0].value;
        }
        return defaultValue;
    } catch (error) {
        console.error(`Error fetching system config '${name}':`, error);
        return defaultValue;
    }
}

/**
 * Fetches the global commission rate and returns it as a decimal (e.g., 0.05).
 * @returns {Promise<number>}
 */
async function getCommissionRate() {
    const rate = await getSystemConfig('commission_rate', '5.00');
    return parseFloat(rate) / 100;
}

module.exports = {
    getSystemConfig,
    getCommissionRate
};
