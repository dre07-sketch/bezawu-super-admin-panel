// Test script for Dashboard API
const axios = require('axios');

const API_BASE = 'http://localhost:5001/api';

async function testDashboardAPI() {
    console.log('🧪 Testing Dashboard API\n');

    try {
        // Step 1: Login to get token
        console.log('1️⃣ Logging in...');
        const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
            email: 'admin@bezawu.com',
            password: 'Admin@123'
        });

        const token = loginResponse.data.token;
        console.log('✅ Login successful!\n');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Step 2: Get Dashboard Stats
        console.log('2️⃣ Fetching dashboard stats...');
        const statsResponse = await axios.get(`${API_BASE}/dashboard/stats`, { headers });

        if (statsResponse.data.success) {
            console.log('✅ Stats fetched successfully!');
            console.log('\n📊 Dashboard Statistics:');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`Total Revenue: ETB ${statsResponse.data.stats.totalRevenue}`);
            console.log(`Platform Commission: ETB ${statsResponse.data.stats.platformCommission}`);
            console.log(`Total Users: ${statsResponse.data.stats.totalUsers}`);
            console.log(`Total Branches: ${statsResponse.data.stats.totalBranches}`);
            console.log(`Revenue Growth: ${statsResponse.data.stats.revenueGrowth}`);
            console.log(`User Growth: ${statsResponse.data.stats.userGrowth}`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }

        // Step 3: Get Revenue Chart Data
        console.log('3️⃣ Fetching revenue chart data...');
        const chartResponse = await axios.get(`${API_BASE}/dashboard/revenue-chart`, { headers });

        if (chartResponse.data.success) {
            console.log('✅ Revenue chart data fetched!');
            console.log(`\n📈 Monthly Revenue (${chartResponse.data.data.length} months):`);
            chartResponse.data.data.forEach(month => {
                console.log(`  ${month.month}: ETB ${month.revenue} (${month.orders} orders)`);
            });
            console.log('');
        }

        // Step 4: Get Top Supermarkets
        console.log('4️⃣ Fetching top supermarkets...');
        const supermarketsResponse = await axios.get(`${API_BASE}/dashboard/top-supermarkets`, { headers });

        if (supermarketsResponse.data.success) {
            console.log('✅ Top supermarkets fetched!');
            console.log(`\n🏪 Top ${supermarketsResponse.data.data.length} Supermarkets:`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            supermarketsResponse.data.data.forEach((sm, idx) => {
                console.log(`${idx + 1}. ${sm.name}`);
                console.log(`   Revenue: ETB ${sm.revenue} | Branches: ${sm.branches} | Growth: ${sm.growth}`);
            });
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }

        // Step 5: Get Top Products
        console.log('5️⃣ Fetching top products...');
        const productsResponse = await axios.get(`${API_BASE}/dashboard/top-products`, { headers });

        if (productsResponse.data.success) {
            console.log('✅ Top products fetched!');
            console.log(`\n📦 Top ${productsResponse.data.data.length} Product Categories:`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            productsResponse.data.data.forEach((prod, idx) => {
                console.log(`${idx + 1}. ${prod.name}: ${prod.value}% (ETB ${prod.sales})`);
            });
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }

        console.log('✨ All Dashboard API tests passed!\n');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

testDashboardAPI();
