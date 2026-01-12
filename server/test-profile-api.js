// Test script for the /api/auth/me endpoint
const axios = require('axios');

const API_BASE = 'http://localhost:5001/api/auth';

async function testProfileEndpoint() {
    console.log('🧪 Testing Profile API Endpoint\n');

    try {
        // Step 1: Login to get token
        console.log('1️⃣ Logging in...');
        const loginResponse = await axios.post(`${API_BASE}/login`, {
            email: 'admin@bezawu.com',
            password: 'Admin@123'
        });

        if (!loginResponse.data.success) {
            console.error('❌ Login failed');
            return;
        }

        const token = loginResponse.data.token;
        console.log('✅ Login successful!');
        console.log('Token:', token.substring(0, 30) + '...\n');

        // Step 2: Get profile using token
        console.log('2️⃣ Fetching admin profile...');
        const profileResponse = await axios.get(`${API_BASE}/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (profileResponse.data.success) {
            console.log('✅ Profile fetched successfully!');
            console.log('\n📋 Admin Profile:');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('Name:', profileResponse.data.admin.fullName);
            console.log('Email:', profileResponse.data.admin.email);
            console.log('Role:', profileResponse.data.admin.role);
            console.log('Status:', profileResponse.data.admin.isActive ? '🟢 Active' : '🔴 Inactive');
            console.log('Last Login:', profileResponse.data.admin.lastLogin || 'N/A');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }

        // Step 3: Test without token (should fail)
        console.log('3️⃣ Testing without token (should fail)...');
        try {
            await axios.get(`${API_BASE}/me`);
            console.log('❌ Should have failed without token');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('✅ Correctly rejected request without token\n');
            }
        }

        // Step 4: Test with invalid token (should fail)
        console.log('4️⃣ Testing with invalid token (should fail)...');
        try {
            await axios.get(`${API_BASE}/me`, {
                headers: {
                    'Authorization': 'Bearer invalid-token-here'
                }
            });
            console.log('❌ Should have failed with invalid token');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('✅ Correctly rejected invalid token\n');
            }
        }

        console.log('✨ All profile endpoint tests passed!\n');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

testProfileEndpoint();
