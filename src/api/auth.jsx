export const login = async (username, password) => {
  try {
    const response = await fetch(
      `https://intern-frontend-sooty.vercel.app/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

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
