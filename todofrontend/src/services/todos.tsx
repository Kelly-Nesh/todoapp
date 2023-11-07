import axios from "axios";

const localhost = "http://192.168.109.53:8000/api/";
const c = console.log;
class TodoDataService {
  getAll(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get(localhost + "todos");
  }

  createTodo(data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post(localhost + "todos/", data);
  }
  updateTodo(id, data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(localhost + "todos/" + id, data);
  }
  deleteTodo(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(localhost + id);
  }
  completeTodo(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(localhost + "todos/" + id + "/complete");
  }
  login(data) {
    return axios.post(localhost + "login/", data);
  }
  signup(data) {
    return axios.post(localhost + "signup/", data);
  }
}

export default new TodoDataService();
