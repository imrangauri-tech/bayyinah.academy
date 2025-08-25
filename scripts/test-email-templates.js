#!/usr/bin/env node

/**
 * Test script for email templates
 * Run with: node scripts/test-email-templates.js
 */

const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_EMAIL = process.env.TEST_EMAIL || 'test@example.com';

// Test data for different forms
const testData = {
  trial: {
    firstName: "Test",
    lastName: "User",
    email: TEST_EMAIL,
    country: "United Kingdom",
    phone: "+447700183406",
    learningInterest: "Quran",
    studentCount: "1",
    preferredTeacher: "Male",
    referralSource: "Google",
    preferredDate: "2025-01-20",
    preferredTime: "10:00 AM"
  },
  student: {
    firstName: "Test",
    lastName: "Student",
    email: TEST_EMAIL,
    country: "United Kingdom",
    phone: "+447700183406",
    ageGroup: "18-25",
    gender: "Male",
    learningInterest: "Quran",
    studentCount: "1",
    pricingPlan: "Premium",
    planDuration: "6 months",
    preferredTeacher: "Male",
    referralSource: "Google",
    daysPerWeek: ["Monday", "Wednesday", "Friday"],
    preferredDate: "2025-01-20",
    preferredTime: "10:00 AM"
  },
  teacher: {
    firstName: "Test",
    lastName: "Teacher",
    email: TEST_EMAIL,
    gender: "Female",
    phone: "+447700183406",
    country: "United Kingdom",
    dob: "1990-01-01",
    maritalStatus: "Single",
    aboutMe: "Experienced Quran teacher",
    facebook: "",
    qualification: "Bachelor's in Islamic Studies",
    experience: "5 years",
    motherLanguage: "Arabic",
    otherLanguage: "English",
    applyingFor: "Quran Teacher",
    teachTajweedInEnglish: "Yes",
    preferredInterviewTime: "10:00 AM",
    hoursPerWeek: "20",
    haveIjazah: "Yes",
    haveChildren: "No",
    expectedSalary: "£25/hour",
    employmentType: "Part-time",
    idealCandidate: "Passionate about teaching",
    discoverySources: ["Google"],
    declaration: true
  },
  contact: {
    name: "Test Contact",
    email: TEST_EMAIL,
    subject: "Test Message",
    message: "This is a test contact form submission",
    phone: "+447700183406"
  },
  callback: {
    firstName: "Test",
    lastName: "Callback",
    email: TEST_EMAIL,
    phone: "+447700183406",
    country: "United Kingdom",
    preferredDate: "2025-01-20",
    preferredTime: "10:00 AM",
    message: "Test callback request"
  },
  newsletter: {
    email: TEST_EMAIL,
    firstName: "Test",
    lastName: "Newsletter"
  }
};

// Helper function to make HTTP requests
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 3000),
      path: urlObj.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = (urlObj.protocol === 'https:' ? https : http).request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function testEndpoint(name, endpoint, method = 'GET', data = null) {
  console.log(`\n🧪 Testing ${name}...`);
  try {
    const response = await makeRequest(`${BASE_URL}${endpoint}`, method, data);
    if (response.status >= 200 && response.status < 300) {
      console.log(`✅ ${name}: SUCCESS (${response.status})`);
      if (response.data && typeof response.data === 'object') {
        console.log(`   Response:`, JSON.stringify(response.data, null, 2));
      }
    } else {
      console.log(`❌ ${name}: FAILED (${response.status})`);
      console.log(`   Response:`, response.data);
    }
  } catch (error) {
    console.log(`❌ ${name}: ERROR`);
    console.log(`   ${error.message}`);
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting Email Template Tests');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📧 Test Email: ${TEST_EMAIL}`);
  console.log('=' .repeat(50));

  // Test GET endpoints
  await testEndpoint('Trial API (GET)', '/api/trial');
  await testEndpoint('Student Form API (GET)', '/api/student-form');
  await testEndpoint('Teacher Apply API (GET)', '/api/teacher-apply');
  await testEndpoint('Contact API (GET)', '/api/contact');
  await testEndpoint('Callback API (GET)', '/api/callback');
  await testEndpoint('Newsletter API (GET)', '/api/newsletter');

  // Test POST endpoints (these will actually send emails!)
  console.log('\n📤 Testing POST endpoints (will send actual emails)...');
  
  if (process.env.SKIP_EMAILS !== 'true') {
    await testEndpoint('Trial API (POST)', '/api/trial', 'POST', testData.trial);
    await testEndpoint('Student Form API (POST)', '/api/student-form', 'POST', testData.student);
    await testEndpoint('Contact API (POST)', '/api/contact', 'POST', testData.contact);
    await testEndpoint('Callback API (POST)', '/api/callback', 'POST', testData.callback);
    await testEndpoint('Newsletter API (POST)', '/api/newsletter', 'POST', testData.newsletter);
    
    // Note: Teacher application requires file uploads, so we'll skip it in this test
    console.log('\n⚠️  Teacher application test skipped (requires file uploads)');
  } else {
    console.log('\n⏭️  Email sending skipped (SKIP_EMAILS=true)');
  }

  console.log('\n🎯 Test Summary');
  console.log('=' .repeat(50));
  console.log('✅ All GET endpoints should return 200 status');
  console.log('✅ POST endpoints should return 200 status and send emails');
  console.log('✅ Check your email inbox for confirmation emails');
  console.log('✅ Check your admin email for notification emails');
  console.log('✅ Check Brevo dashboard for contact list additions');
}

// Run tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, testData };
