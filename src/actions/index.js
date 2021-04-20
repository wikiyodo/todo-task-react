import axios from "axios";
const baseUrl = process.env.API_ENDPOINT_URL || `http://localhost:3004/`;

const parseUrl = (url, params = {}) => {
  let keys = Object.keys(params);

  for (let key of keys) {
    url = url.replace(`:${key}`, params[key]);
  }

  return baseUrl + url;
};

const ROUTES = {
  getAllTodo: "todo/all",
  createNewTodo: "todo/add",
  completeTodo: "todo/complete/:id",
  deleteTodo: "todo/remove/:id",
};

export const requestGetTodos = async (data) =>
  await axios.get(
    parseUrl(ROUTES.getAllTodo),
    { ...data },
    { headers: { "Content-Type": "application/json" } }
  );

export const requestAddTodos = async (data, callback) => {
  let response = await axios.post(
    parseUrl(ROUTES.createNewTodo),
    { ...data },
    { headers: { "Content-Type": "application/json" } }
  );

  callback(response);

  return response;
};

export const requestCompleteTodos = async (data, callback) => {
  let response = await axios.put(
    parseUrl(ROUTES.completeTodo, data),
    { ...data },
    { headers: { "Content-Type": "application/json" } }
  );

  callback(response);

  return response;
};

export const requestDeleteTodos = async (data, callback) => {
  let response = await axios.delete(
    parseUrl(ROUTES.deleteTodo, data),
    { ...data },
    { headers: { "Content-Type": "application/json" } }
  );

  callback(response);

  return response;
};
