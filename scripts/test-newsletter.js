#!/usr/bin/env node

/**
 * Test script for Newsletter integration
 * Run with: node scripts/test-newsletter.js
 */

const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const timestamp = Date.now();
const TEST_EMAILS = [
  `newsletter-test-1-${timestamp}@example.com`,
  `newsletter-test-2-${timestamp}@example.com`,
  `newsletter-test-3-${timestamp}@example.com`
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

// Test newsletter subscription
async function testNewsletterSubscription(email) {
  console.log(`\n📧 Testing newsletter subscription for: ${email}`);
  
  try {
    // Subscribe to newsletter
    const subscribeResponse = await makeRequest('/api/newsletter', 'POST', {
      email
    });
    
    if (subscribeResponse.status === 200 && subscribeResponse.data.ok) {
      console.log(`✅ Subscription successful - Contact ID: ${subscribeResponse.data.contactId}, List ID: ${subscribeResponse.data.listId}`);
      
      // Wait a moment for Brevo to process
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
      } else {
        console.log(`❌ Verification failed:`, verifyResponse.data);
      }
    } else {
      console.log(`❌ Subscription failed:`, subscribeResponse.data);
    }
  } catch (error) {
    console.log(`❌ Test failed for ${email}:`, error.message);
  }
}

// Test multiple subscriptions
async function testMultipleSubscriptions() {
  console.log('🚀 Starting Newsletter Integration Tests...');
  console.log('📍 Testing against:', BASE_URL);
  console.log('⏰ Started at:', new Date().toISOString());
  
  for (let i = 0; i < TEST_EMAILS.length; i++) {
    const email = TEST_EMAILS[i];
    
    await testNewsletterSubscription(email);
    
    // Wait between tests
    if (i < TEST_EMAILS.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n🎉 All newsletter tests completed!');
  console.log('⏰ Finished at:', new Date().toISOString());
  console.log('\n📋 Next steps:');
  console.log('1. Check your Brevo dashboard to see if contacts appear in list ID 9');
  console.log('2. Verify the contacts have the correct email addresses');
  console.log('3. Check if you receive any admin notification emails');
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
    await testMultipleSubscriptions();
  } else {
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testNewsletterSubscription,
  testMultipleSubscriptions
};
