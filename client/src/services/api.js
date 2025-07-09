// client/src/services/api.js
import axios from 'axios';

// ✅ Set base URL
const API = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 1. Generate Playwright script from URL (Phase 4)
export const generateTests = async (url) => {
  try {
    const response = await API.post('/generate-tests', { url });
    return response.data; // { _id, script, status: 'pending', ... }
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong!';
  }
};

// ✅ 2. Immediately execute test suite after generating (Phase 5)
export const runTests = async (id) => {
  try {
    const response = await API.post(`/run-tests/${id}`);
    return response.data; // updated test with logs, screenshots
  } catch (error) {
    throw error.response?.data?.message || 'Failed to execute test.';
  }
};

// ✅ 3. Get all test runs (Dashboard page)
export const getAllTests = async () => {
  try {
    const response = await API.get('/results');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch test results.';
  }
};

// ✅ 4. Rerun specific test by ID (Rerun button)
export const rerunTestById = async (id) => {
  try {
    const response = await API.post(`/run-tests/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to rerun test.';
  }
};

// ✅ 5. Get test result by ID (Details page)
export const getTestById = async (id) => {
  try {
    const response = await API.get(`/results/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch test details.';
  }
};
