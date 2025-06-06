import { Link } from "react-router-dom";

export function TicketList({ tickets }) {
  return (
    <div>
      <div className="text-center mt-4 ">
        <h1 className="text-white text-2xl font-bold">Tickets</h1>
        <hr />
      </div>
      <div className="space-y-6">
        <div className="space-y-6">
          <ul className="list-disc pl-5 mt-3 mb-3 list-none">
            {tickets.map((ticket) => (
              <li>
                <Link to={`/ticket/${ticket.ticket_no}`}>
                  <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-indigo-400">
                        Ticket # {ticket.ticket_no}
                      </h3>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          ticket.isOpen
                            ? "bg-green-600 text-green-100"
                            : "bg-red-600 text-red-100"
                        } `}
                      >
                        {ticket.isOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-3">
                      {ticket.message}
                    </p>
                    <div className="text-sm text-gray-500 flex justify-between items-center">
                      <span>Submitted: {ticket.time}</span>
                      <span className="flex items-center">
                        <span className="material-icons text-base mr-1">
                          Team:
                        </span>
                        {ticket.team}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
