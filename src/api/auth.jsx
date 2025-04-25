export const login = async (username, password) => {
  try {
    const response = await fetch('https://your-backend-api.com/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // if needed
    })
      .then(async response => {
        if (!response.ok) {
          const errorText = await response.text(); // or response.json() if your API sends JSON errors
          throw new Error(`Server responded with ${response.status}: ${errorText}`);
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error('Fetch error:', error));
    
    

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
