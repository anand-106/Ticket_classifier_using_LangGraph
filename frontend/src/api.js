import axios from "axios";

export const fetchTickets = async () => {
  try {
    const tickets = await axios.get("http://localhost:8001/tickets");
    return tickets.data;
  } catch (e) {
    console.log("error:", e);
  }
};
