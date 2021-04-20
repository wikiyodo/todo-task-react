import React, { useState, useContext } from "react";
import { createUseStyles } from "react-jss";
import { TodoListContext } from "../App";

const useStyles = createUseStyles({
  wrapper: {
    backgroundColor: "#f6f7f9",
    padding: "30px 40px",
    color: "#212e52",
    textAlign: "left",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    "&:after": {
      content: "",
      display: "table",
      clear: "both",
    },
  },
  headerText: {
    marginBottom: 22,
  },
  input: {
    margin: 0,
    borderRadius: 0,
    width: "75%",
    padding: 10.5,
    float: "left",
    fontSize: 16,
    color: "#bbc7e4",
    border: "solid 1px #bbc7e4",
  },
  button: {
    padding: 10,
    width: "25%",
    background: "#48919e",
    color: "#fff",
    float: "left",
    textAlign: "center",
    fontSize: 16,
    cursor: "pointer",
    transition: "0.3s",
    borderRadius: 0,
    fontWeight: "500",
    "&:hover": {
      backgroundColor: "#bbb",
    },
  },
  inputWrapper: {
    display: "flex",
  },
});

function HeaderInput(props) {
  let [input, setInput] = useState("");
  const classes = useStyles();
  let { title = "To Do", placeholder = "Title...", btnLabel = "Add" } = props;
  const { todos, todoAction } = useContext(TodoListContext);

  return (
    <div id="myDIV" className={classes.wrapper}>
      <h2 className={classes.headerText}>{title}</h2>
      <div className={classes.inputWrapper}>
        <input
          type="text"
          id="myInput"
          className={classes.input}
          placeholder={placeholder}
          maxLength={60}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <span
          className={classes.button}
          onClick={() => {
            todoAction({ item: input, type: "ADD_NEW" });
            setInput("");
          }}
        >
          {btnLabel}
        </span>
      </div>
    </div>
  );
}

export default HeaderInput;
