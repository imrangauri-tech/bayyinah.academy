#!/usr/bin/env node

/**
 * Test script for Admin Notifications
 * Run with: node scripts/test-admin-notifications.js
 */

const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const timestamp = Date.now();
const TEST_EMAILS = [
  `admin-test-1-${timestamp}@example.com`,
  `admin-test-2-${timestamp}@example.com`,
  `admin-test-3-${timestamp}@example.com`
];

// Helper function to make HTTP requests
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: url,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            data: parsed
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test admin notification for newsletter subscription
async function testAdminNotification(email) {
  console.log(`\n📧 Testing admin notification for: ${email}`);
  
  try {
    // Subscribe to newsletter (this should trigger admin notification)
    const subscribeResponse = await makeRequest('/api/newsletter', 'POST', {
      email
    });
    
    if (subscribeResponse.status === 200 && subscribeResponse.data.ok) {
      console.log(`✅ Newsletter subscription successful`);
      console.log(`   📋 Contact ID: ${subscribeResponse.data.contactId}`);
      console.log(`   📋 List ID: ${subscribeResponse.data.listId}`);
      
      // Wait a moment for admin notification to be sent
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Verify contact is in list
      const verifyResponse = await makeRequest(`/api/newsletter?action=verify&email=${encodeURIComponent(email)}`);
      
      if (verifyResponse.status === 200 && verifyResponse.data.ok) {
        const verification = verifyResponse.data.verification;
        if (verification.isInList) {
          console.log(`✅ Contact verified in newsletter list: ${verification.contactListIds.join(', ')}`);
        } else {
          console.log(`❌ Contact NOT in newsletter list. Current lists: ${verification.contactListIds.join(', ')}`);
        }
      }
      
      console.log(`📧 Admin notification should have been sent to: auth.netexa@gmail.com`);
      console.log(`   Check the email inbox for the detailed notification`);
      console.log(`   Subject: "📧 New Newsletter Subscription - Bayyinah Academy"`);
      
    } else {
      console.log(`❌ Newsletter subscription failed:`, subscribeResponse.data);
    }
  } catch (error) {
    console.log(`❌ Test failed for ${email}:`, error.message);
  }
}

// Test multiple admin notifications
async function testMultipleAdminNotifications() {
  console.log('🚀 Starting Admin Notification Tests...');
  console.log('📍 Testing against:', BASE_URL);
  console.log('📧 Admin notification email: auth.netexa@gmail.com');
  console.log('⏰ Started at:', new Date().toISOString());
  
  for (let i = 0; i < TEST_EMAILS.length; i++) {
    const email = TEST_EMAILS[i];
    
    await testAdminNotification(email);
    
    // Wait between tests
    if (i < TEST_EMAILS.length - 1) {
      console.log(`⏳ Waiting 3 seconds before next test...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('\n🎉 All admin notification tests completed!');
  console.log('⏰ Finished at:', new Date().toISOString());
  console.log('\n📋 Next steps:');
  console.log('1. Check auth.netexa@gmail.com inbox for admin notifications');
  console.log('2. Verify each notification contains subscriber details');
  console.log('3. Check Brevo dashboard to see contacts in list ID 9');
  console.log('4. Verify admin notifications have proper formatting and details');
}

// Check if dev server is running
async function checkServer() {
  try {
    const response = await makeRequest('/');
    console.log('✅ Development server is running');
    return true;
  } catch (error) {
    console.log('❌ Development server is not running');
    console.log('   Please start your dev server with: pnpm dev');
    return false;
  }
}

// Run tests if server is available
async function main() {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await testMultipleAdminNotifications();
  } else {
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testAdminNotification,
  testMultipleAdminNotifications
};
