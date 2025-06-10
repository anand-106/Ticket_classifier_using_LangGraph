import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TicketList } from "./Tickets.js";
import { fetchTickets } from "./api.js";
import { TicketDetails } from "./ticketDetails.js";
import { AuthWrapper } from "./Auth/authWrapper.js";
import { LoginPage } from "./Auth/Login.js";
import { useAuth0 } from "@auth0/auth0-react";
import { RequireRole } from "./Auth/roleRequirer.js";
import { useApi } from "./Auth/API/useApi.js";
import { RoleRedirect } from "./Auth/roleBasedRedirect.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthWrapper>
              <RoleRedirect />
            </AuthWrapper>
          }
        />
        <Route
          path="/admin-home"
          element={
            <AuthWrapper>
              <Home link={"http://localhost:8001/tickets"} />{" "}
            </AuthWrapper>
          }
        />
        <Route
          path="/user-home"
          element={
            <AuthWrapper>
              <Home link={"http://localhost:8001/my-tickets"} />{" "}
            </AuthWrapper>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ticket/:ticketNo" element={<TicketDetails />} />{" "}
      </Routes>
    </Router>
  );
}

function Home({ link }) {
  const [tickets, setTickets] = useState([]);
  const { callAPI } = useApi();

  const getTickets = useCallback(async () => {
    try {
      console.log("trying to get tickets");
      const data = await callAPI(link, "get");
      setTickets(data);
    } catch (e) {
      console.log("Failed to load Tickets ", e);
    }
  }, [callAPI]);

  useEffect(() => {
    getTickets();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto px-4">
        <Header />
        <TicketInput getTickets={getTickets} />
        {/* <RequireRole role={"admin"}> */}
        <TicketList tickets={tickets} />
        {/* </RequireRole> */}
      </div>
    </div>
  );
}

function Header() {
  const namespace = "https://myapp.local";
  const { user } = useAuth0();
  const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        <h2 className="text-white">Log Out</h2>
      </button>
    );
  };
  const roles = user?.[`${namespace}/roles`] || [];
  return (
    <div className="text-center mb-8">
      <div className="">
        <h1 className="text-3xl font-bold text-white mb-2">
          Ticket Submission Portal
        </h1>
        <div className="flex justify-end">
          <LogoutButton />
        </div>
      </div>
      {roles.includes("user") && (
        <p className="text-gray-400 text-sm">Hello User....</p>
      )}
      {roles.includes("admin") && (
        <p className="text-gray-400 text-sm">Hello Admin....</p>
      )}
      {roles.includes("developer") && (
        <p className="text-gray-400 text-sm">Hello Admin....</p>
      )}
      <p className="text-gray-400 text-sm">
        Submit your support requests below
      </p>
    </div>
  );
}

function TicketInput({ getTickets }) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      alert("Please enter ticket details!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with your actual endpoint

      const token = await getAccessTokenSilently();
      const response = await fetch("http://localhost:8001/add-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: inputValue,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        alert("Ticket submitted successfully!");
        setInputValue("");
        getTickets(); // Clear form after successful submission
      } else {
        throw new Error("Failed to submit ticket");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
      <div className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-3"
            htmlFor="ticket-details"
          >
            Ticket Details
          </label>

          <textarea
            id="ticket-details"
            value={inputValue}
            onChange={handleChange}
            placeholder="Describe your issue or request in detail..."
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition duration-200"
            rows="4"
            disabled={isSubmitting}
          />
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Ticket"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
