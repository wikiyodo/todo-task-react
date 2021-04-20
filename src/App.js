import "./App.css";
import TodoList from "./components/todoList";
import HeaderInput from "./components/Input";
import { useReducer, createContext } from "react";

const todo = {
  list: [],
};

function reducer(state, payload) {
  switch (payload.type) {
    case "ADD_NEW":
      let { item } = payload;

      if (item == "") return state;
      item = { title: item, status: "pending" };

      return [...state, item];
    case "COMPLETE":
      state[payload.id].status = "completed";
      console.log(state);
      return [...state];
    case "DELETE":
      state[payload.id].status = "deleted";
      console.log(state);
      return [...state];
    default:
      return state;
  }
}
export const TodoListContext = createContext();

function App() {
  const [todos, todoAction] = useReducer(reducer, []);

  return (
    <div className="App">
      <TodoListContext.Provider value={{ todos, todoAction }}>
        <HeaderInput />
        <TodoList />
      </TodoListContext.Provider>
    </div>
  );
}

export default App;
