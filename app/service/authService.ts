const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL!;

export async function login(payload: { username: string; password: string }) {
  const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Login failed");

  const data = await response.json(); // CustomUserLoginResponseDTO
  if (data?.token) {
    localStorage.setItem("authToken", data.token);
  }

  return data;
}

export function logout() {
  localStorage.removeItem("authToken");
}

// REGISTER
export async function register(payload: {
  username: string;
  email: string;
  password: string;
}) {
  
  try {
    const response = await fetch(`${AUTH_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorMessage = `Registration failed (Status: ${response.status})`;
      
      
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } else {
          
          errorMessage = responseText || errorMessage;
        }
      } catch (parseError) {

        errorMessage = responseText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }
    
    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.warn("Success response was not JSON:", e);
      return { message: "Registration successful" };
    }
    
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}