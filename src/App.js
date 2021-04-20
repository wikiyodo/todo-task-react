import "./App.css";
import TodoList from "./components/todoList";
import HeaderInput from "./components/Input";
import { useReducer, createContext, useEffect, useState } from "react";
import { requestGetTodos } from "./actions";
import reducer from "./reducers";

const todo = {
  list: [],
};

function errorReducer(state, error) {
  return error;
}

const getTodos = async () => {
  let data = await requestGetTodos();

  return data;
};

export const TodoListContext = createContext();

function App() {
  const [doRefresh, refresh] = useState(0);
  const [todos, todoAction] = useReducer(reducer, {
    list: [],
    refresh: (data) => refresh(data),
  });
  const [error, setError] = useReducer(errorReducer, "");

  useEffect(async () => {
    if (doRefresh != 0 && typeof doRefresh == "object") {
      let { data } = doRefresh;
      if (!data.status) {
        setError(data.message);
        return;
      }
    }

    let { data } = await getTodos();

    if (!data.status) {
      setError(data.message);
      return;
    }

    todoAction({ type: "GET", data: data.extras.tasks });
  }, [doRefresh]);

  return (
    <div className="App">
      <TodoListContext.Provider value={{ todos, todoAction }}>
        <HeaderInput error={error} />
        <TodoList />
      </TodoListContext.Provider>
    </div>
  );
}

export default App;
