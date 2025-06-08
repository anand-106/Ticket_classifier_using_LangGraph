import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export function AuthWrapper({ children }) {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const callAuthAPI = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "https://myapp.example.com/api",
        });

        console.log("Access Token:", token);

        const response = await fetch("http://localhost:8001/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Optional: handle response
        if (!response.ok) {
          console.error("Unauthorized or error:", await response.text());
        }
      } catch (err) {
        console.error("Error fetching access token or calling API:", err);
      }
    };

    if (isAuthenticated) {
      callAuthAPI();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <h1 className="text-white font-bold items-center">Loading....</h1>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
