export const login = async (username, password) => {
  try {
    const response = await fetch('https://internmanagementapi-backend.onrender.com', {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        // add any custom headers if needed
      },
      credentials: 'include', // only if you're using cookies or auth headers
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    

    const data = await response.json(); // ✅ safely parse

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    const token = data.token || data;

    if (!token) {
      throw new Error("Token not received");
    }

    localStorage.setItem("token", token);
    return { success: true, token };
  } catch (error) {
    console.error("Login error", error.message);
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};
