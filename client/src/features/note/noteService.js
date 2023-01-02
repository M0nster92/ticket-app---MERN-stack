import axios from "axios";

const API_URL = "/api/tickets/";

export const getNotes = async (id, token) => {
  const config = getConfig(token);
  const response = await axios.get(`${API_URL}/${id}/notes`, config);
  return response.data;
};

export const createNote = async (note, id, token) => {
  const config = getConfig(token);
  const response = await axios.post(
    `${API_URL}/${id}/notes`,
    { text: note },
    config
  );
  return response.data;
};

const getConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
