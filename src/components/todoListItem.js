import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import { TodoListContext } from "../App";

const useStyles = createUseStyles({
  item: {
    cursor: "pointer",
    position: "relative",
    padding: "12px 8px 12px 40px",
    listStyleType: "none",
    background: "#eee",
    fontSize: 18,
    transition: "0.2s",
    textAlign: "left",
    // -webkit-user-select: none;
    // -moz-user-select: none;
    // -ms-user-select: none;
    userSelect: "none",

    "&:nth-child(even)": {
      background: "#f9f9f9",
    },
    "&:hover": {
      background: "#ddd",
    },
  },
  checkedItem: {
    background: "#888 !important",
    color: "#fff",
    textDecoration: "line-through",
    "&::before": {
      content: '" "',
      position: "absolute",
      borderColor: "#fff",
      borderStyle: "solid",
      borderWidth: "0 2px 2px 0",
      top: 10,
      left: 16,
      transform: "rotate(45deg)",
      height: 15,
      width: 7,
    },
  },
});

function TodoListItem(props) {
  const classes = useStyles();
  const { title, status, _id } = props.todo;
  const itemProps = {};
  const { todoAction } = useContext(TodoListContext);

  if (status == "deleted") return null;

  if (status == "completed")
    itemProps.className = [classes.checkedItem, classes.item].join(" ");
  else {
    itemProps.className = classes.item;
    itemProps.onClick = () => {
      todoAction({ type: "COMPLETE", id: props.todoId, _id });
    };
  }

  return (
    <li {...itemProps}>
      {title}{" "}
      {status != "completed" ? (
        <span
          className="close"
          onClick={(e) => {
            e.stopPropagation();
            todoAction({ type: "DELETE", id: props.todoId, _id });
          }}
        >
          ×
        </span>
      ) : null}
    </li>
  );
}

export default TodoListItem;
