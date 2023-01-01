import axios from "axios";

const API_URL = "/api/tickets/";

const createTicket = async (ticketData, token) => {
  const config = getConfig(token);
  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

const getTickets = async (token) => {
  const config = getConfig(token);
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getTicket = async (token, id) => {
  const config = getConfig(token);
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

const getConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
};

export default ticketService;
