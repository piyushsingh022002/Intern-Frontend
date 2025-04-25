// src/api/auth.js
export const login = async (username, password) => {
  try {
    const response = await fetch('http://localhost:5032/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    
    // Handle both string and object responses
    const token = data.token || data;
    
    if (!token || !response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('token', token);
    return { success: true, token };
    
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Network error'
    };
  }
};