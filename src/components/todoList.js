import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import TodoListItem from "./todoListItem";
import { TodoListContext } from "../App";

const useStyles = createUseStyles({
  list: {
    margin: 0,
    padding: 0,
  },
});

function TodoList(props) {
  const classes = useStyles();
  const { todos } = useContext(TodoListContext);

  return (
    <ul className={classes.list}>
      {todos.list.map((todo, i) => (
        <TodoListItem todo={todo} todoId={i} key={i + todo.title} />
      ))}
    </ul>
  );
}

export default TodoList;
