#!/usr/bin/env node

/**
 * Test script for Trial Form Redirect
 * Run with: node scripts/test-trial-form-redirect.js
 */

const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const timestamp = Date.now();

// Test trial form submission
const testTrialData = {
  formType: "trial",
  data: {
    firstName: `Test${timestamp}`,
    lastName: "User",
    email: `trial-test-${timestamp}@example.com`,
    country: "United Kingdom",
    phone: "+447700183406",
    learningInterest: "Quran",
    studentCount: "1",
    preferredTeacher: "Male",
    referralSource: "Google",
    preferredDate: "2024-12-25",
    preferredTime: "14:00"
  },
  meta: {
    page: "/trial",
    ts: Date.now(),
    tz: "Europe/London",
    ua: "Test Script"
  }
};

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

// Test trial form submission
async function testTrialFormSubmission() {
  console.log('🧪 Testing Trial Form Submission and Redirect...');
  console.log('📍 Testing against:', BASE_URL);
  console.log('📧 Test email:', testTrialData.data.email);
  console.log('⏰ Started at:', new Date().toISOString());
  
  try {
    // Submit trial form
    console.log('\n📝 Submitting trial form...');
    const submitResponse = await makeRequest('/api/trial', 'POST', testTrialData);
    
    if (submitResponse.status === 200 && submitResponse.data.ok) {
      console.log('✅ Trial form submitted successfully');
      console.log('   📋 Response:', submitResponse.data);
      
      // Check if thank-you page exists and is accessible
      console.log('\n🔍 Checking thank-you page accessibility...');
      const thankYouResponse = await makeRequest('/thank-you');
      
      if (thankYouResponse.status === 200) {
        console.log('✅ Thank-you page is accessible');
        console.log('   📄 Status:', thankYouResponse.status);
      } else {
        console.log('❌ Thank-you page not accessible');
        console.log('   📄 Status:', thankYouResponse.status);
      }
      
      console.log('\n📋 Next steps:');
      console.log('1. Open your browser and go to: http://localhost:3000/trial');
      console.log('2. Fill out the trial form with test data');
      console.log('3. Submit the form');
      console.log('4. Verify you are redirected to: http://localhost:3000/thank-you');
      console.log('5. Check that admin notifications are sent');
      
    } else {
      console.log('❌ Trial form submission failed');
      console.log('   📋 Response:', submitResponse.data);
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
  
  console.log('\n🎉 Trial form redirect test completed!');
  console.log('⏰ Finished at:', new Date().toISOString());
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
    await testTrialFormSubmission();
  } else {
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testTrialFormSubmission
};
