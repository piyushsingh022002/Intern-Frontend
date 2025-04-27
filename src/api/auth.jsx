const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5032';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    const token = data.token;
    localStorage.setItem('token', token);
    return { success: true, token };
  } catch (error) {
    console.error('Login error:', error.message);
    return {
      success: false,
      message: error.message || 'Network error',
    };
  }
};

// Utility function to make authenticated requests
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};