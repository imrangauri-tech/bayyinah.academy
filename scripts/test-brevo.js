#!/usr/bin/env node

/**
 * Test script for Brevo integration
 * Run with: node scripts/test-brevo.js
 */

const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3001'; // Change if your dev server runs on different port
const API_ENDPOINTS = [
  '/api/newsletter',
  '/api/contact',
  '/api/form',
  '/api/brevo'
];

// Test data
const testNewsletterData = {
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User'
};

const testContactData = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Message',
  message: 'This is a test message from the test script.',
  phone: '+1234567890'
};

const testFormData = {
  formType: 'trial',
  data: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    country: 'Test Country',
    phone: '+1234567890',
    learningInterest: 'Quran',
    studentCount: '1',
    preferredTeacher: 'Male',
    referralSource: 'Google',
    preferredDate: '2024-01-15',
    preferredTime: '14:00'
  }
};

// Helper function to make HTTP requests
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
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

// Test functions
async function testNewsletterAPI() {
  console.log('\n🧪 Testing Newsletter API...');
  
  try {
    // Test GET endpoint
    const getResponse = await makeRequest('/api/newsletter');
    console.log('✅ GET /api/newsletter:', getResponse.status);
    
    // Test POST endpoint
    const postResponse = await makeRequest('/api/newsletter', 'POST', testNewsletterData);
    console.log('✅ POST /api/newsletter:', postResponse.status);
    
    if (postResponse.data.ok) {
      console.log('   📧 Newsletter subscription successful');
    } else {
      console.log('   ❌ Newsletter subscription failed:', postResponse.data.error);
    }
  } catch (error) {
    console.log('❌ Newsletter API test failed:', error.message);
  }
}

async function testContactAPI() {
  console.log('\n🧪 Testing Contact API...');
  
  try {
    // Test GET endpoint
    const getResponse = await makeRequest('/api/contact');
    console.log('✅ GET /api/contact:', getResponse.status);
    
    // Test POST endpoint
    const postResponse = await makeRequest('/api/contact', 'POST', testContactData);
    console.log('✅ POST /api/contact:', postResponse.status);
    
    if (postResponse.data.ok) {
      console.log('   📧 Contact form submission successful');
    } else {
      console.log('   ❌ Contact form submission failed:', postResponse.data.error);
    }
  } catch (error) {
    console.log('❌ Contact API test failed:', error.message);
  }
}

async function testFormAPI() {
  console.log('\n🧪 Testing Form API...');
  
  try {
    // Test GET endpoint
    const getResponse = await makeRequest('/api/form');
    console.log('✅ GET /api/form:', getResponse.status);
    
    // Test POST endpoint
    const postResponse = await makeRequest('/api/form', 'POST', testFormData);
    console.log('✅ POST /api/form:', postResponse.status);
    
    if (postResponse.data.ok) {
      console.log('   📧 Form submission successful');
    } else {
      console.log('   ❌ Form submission failed:', postResponse.data.error);
    }
  } catch (error) {
    console.log('❌ Form API test failed:', error.message);
  }
}

async function testBrevoAPI() {
  console.log('\n🧪 Testing Brevo Management API...');
  
  try {
    // Test GET endpoints
    const listsResponse = await makeRequest('/api/brevo?action=lists');
    console.log('✅ GET /api/brevo?action=lists:', listsResponse.status);
    
    const contactsResponse = await makeRequest('/api/brevo?action=contacts&listId=1&limit=10');
    console.log('✅ GET /api/brevo?action=contacts:', contactsResponse.status);
    
    // Test POST endpoints
    const emailResponse = await makeRequest('/api/brevo', 'POST', {
      action: 'send-email',
      data: {
        to: 'test@example.com',
        subject: 'Test Email',
        textContent: 'This is a test email from the test script.'
      }
    });
    console.log('✅ POST /api/brevo (send-email):', emailResponse.status);
    
  } catch (error) {
    console.log('❌ Brevo API test failed:', error.message);
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Brevo Integration Tests...');
  console.log('📍 Testing against:', BASE_URL);
  console.log('⏰ Started at:', new Date().toISOString());
  
  try {
    await testNewsletterAPI();
    await testContactAPI();
    await testFormAPI();
    await testBrevoAPI();
    
    console.log('\n🎉 All tests completed!');
    console.log('⏰ Finished at:', new Date().toISOString());
    
  } catch (error) {
    console.log('\n💥 Test suite failed:', error.message);
    process.exit(1);
  }
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
    await runTests();
  } else {
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testNewsletterAPI,
  testContactAPI,
  testFormAPI,
  testBrevoAPI,
  runTests
};
