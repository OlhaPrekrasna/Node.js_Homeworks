import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3003;
const URL = `http://localhost:${PORT}`;

const uniqueUsername = `user_${Date.now()}`;
const uniqueEmail = `user_${Date.now()}@example.com`;

const registerUser = async () => {
  try {
    const res = await axios.post(`${URL}/register`, {
      username: uniqueUsername,
      email: uniqueEmail,
      password: 'testpassword',
    });
    console.log('Registration success:', res.data);
  } catch (err) {
    console.error('Registration error:', err.response?.data || err.message);
  }
};

const loginUser = async () => {
  try {
    const res = await axios.post(`${URL}/login`, {
      username: uniqueUsername,
      password: 'testpassword',
    });
    console.log('Login success:', res.data);
    return res.data.token || null;
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message);
    return null;
  }
};

const getProfile = async token => {
  try {
    const res = await axios.get(`${URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Profile data:', res.data);
  } catch (err) {
    console.error('Profile error:', err.response?.data || err.message);
  }
};

(async () => {
  await registerUser();
  const token = await loginUser();
  if (token) {
    await getProfile(token);
  }
})();
