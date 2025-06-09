import { data, Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RequireRole } from "./Auth/roleRequirer";

export function TicketDetails() {
  const { ticketNo } = useParams();
  const [Ticket, setTicket] = useState(null);
  const [isClosing, setisClosing] = useState(false);
  const [isOpen, setisOpen] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8001/ticket/${ticketNo}`
        );
        setTicket(response.data);
        setisOpen(response.data.isOpen);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTicket();
  }, [ticketNo]);

  if (!Ticket)
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const closeTicket = async () => {
    setisClosing(true);
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8001/ticket/${ticketNo}`,
        { isOpen: false }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setisClosing(false);
      setisOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">Ticket Details</h1>
            <Link to={"/"}>
              <button className="text-blue-400 hover:text-blue-300 text-lg">
                ← Back to Tickets
              </button>
            </Link>
          </div>

          {/* Ticket Header Info */}
          <div className="bg-slate-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold text-blue-400">
                  Ticket # {Ticket.ticket_no}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                    Ticket.priority
                  )}`}
                >
                  {Ticket.priority}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isOpen ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  {isOpen ? "Open" : "Closed"}
                </span>
              </div>
              <div className="text-right text-gray-400">
                <div>
                  Team: <span className="text-white">{Ticket.team}</span>
                </div>
                <div>Submitted: {Ticket.time}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Rounded Box for All Ticket Details */}
        <div className="bg-slate-800 rounded-lg p-8">
          {/* Ticket Metadata Section */}
          <div className="mb-8 pb-6 border-b border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <span className="text-gray-400 text-sm">Ticket ID:</span>
                <p className="text-white font-mono text-sm">{Ticket.id}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Team:</span>
                <p className="text-white">{Ticket.team}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Created:</span>
                <p className="text-white">{Ticket.time}</p>
              </div>
            </div>
          </div>

          {/* Original Request */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Original Request
            </h3>
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-gray-300">{Ticket.message}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Summary
            </h3>
            <p className="text-gray-300 leading-relaxed">{Ticket.summary}</p>
          </div>

          {/* Technical Analysis */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Technical Analysis
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {Ticket.technical_analysis}
            </p>
          </div>

          {/* Suggested Approach */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Suggested Approach
            </h3>
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {Ticket.suggested_approach}
            </div>
          </div>

          {/* Additional Notes */}
          {Ticket.additional_notes && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                Additional Notes
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {Ticket.additional_notes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="pt-6 border-t border-slate-700">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <RequireRole role={"admin"}>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                  onClick={closeTicket}
                  disabled={isClosing}
                >
                  {isClosing ? (
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
                      Closing...
                    </>
                  ) : (
                    "Close Ticket"
                  )}
                </button>
              </RequireRole>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
