// Quick API Test Script
// Open browser console and run these commands to test the API

import { userService, campaignService, donationService, categoryService } from './services';

// Test 1: Get all categories
async function testCategories() {
  console.log('Testing Categories API...');
  try {
    const categories = await categoryService.getAllCategories();
    console.log('✅ Categories:', categories);
    return categories;
  } catch (error) {
    console.error('❌ Categories failed:', error.message);
  }
}

// Test 2: Register a new user
async function testRegister() {
  console.log('Testing User Registration...');
  const userData = {
    firstName: 'Test',
    lastName: 'User',
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    age: 25,
    gender: 'MALE',
    accountType: 'DONOR',
    agreeToTerms: true
  };
  
  try {
    const response = await userService.register(userData);
    console.log('✅ Registration successful:', response);
    return response;
  } catch (error) {
    console.error('❌ Registration failed:', error.message);
  }
}

// Test 3: Login
async function testLogin() {
  console.log('Testing Login...');
  const credentials = {
    email: 'test@example.com',
    password: 'password123'
  };
  
  try {
    const response = await userService.login(credentials);
    console.log('✅ Login successful:', response);
    return response;
  } catch (error) {
    console.error('❌ Login failed:', error.message);
  }
}

// Test 4: Get all campaigns
async function testCampaigns() {
  console.log('Testing Campaigns API...');
  try {
    const campaigns = await campaignService.getAllCampaigns();
    console.log('✅ Campaigns:', campaigns);
    return campaigns;
  } catch (error) {
    console.error('❌ Campaigns failed:', error.message);
  }
}

// Test 5: Create a campaign
async function testCreateCampaign() {
  console.log('Testing Create Campaign...');
  const campaignData = {
    title: 'Test Campaign ' + Date.now(),
    categoryId: '1',
    description: 'This is a test campaign',
    goal: 10000,
    daysLeft: 30
  };
  
  try {
    const campaign = await campaignService.createCampaign(campaignData);
    console.log('✅ Campaign created:', campaign);
    return campaign;
  } catch (error) {
    console.error('❌ Create campaign failed:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting API Integration Tests...\n');
  
  await testCategories();
  console.log('\n');
  
  await testRegister();
  console.log('\n');
  
  await testLogin();
  console.log('\n');
  
  await testCampaigns();
  console.log('\n');
  
  // Only test if logged in
  const currentUser = userService.getCurrentUser();
  if (currentUser) {
    await testCreateCampaign();
  }
  
  console.log('\n✅ All tests completed!');
}

// Export for use in browser console
window.apiTests = {
  testCategories,
  testRegister,
  testLogin,
  testCampaigns,
  testCreateCampaign,
  runAllTests
};

console.log('API Tests loaded! Run window.apiTests.runAllTests() to test all endpoints');
