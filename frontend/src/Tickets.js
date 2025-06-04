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
                <div class="bg-gray-700 p-6 rounded-lg shadow-md mb-3">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-semibold text-indigo-400">
                      Ticket #001
                    </h3>
                    <span class="text-xs font-medium px-3 py-1 rounded-full bg-green-600 text-green-100">
                      Open
                    </span>
                  </div>
                  <p class="text-gray-300 leading-relaxed mb-3">
                    {ticket.message}
                  </p>
                  <div class="text-sm text-gray-500 flex justify-between items-center">
                    <span>Submitted: 2023-10-26 10:30 AM</span>
                    <span class="flex items-center">
                      <span class="material-icons text-base mr-1">Team:</span>
                      {ticket.team}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
