import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Welcome!</h1>
        <p className="mb-6 text-white">Please log in or sign up to continue</p>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Log In / Sign Up
        </button>
      </div>
    </div>
  );
}
