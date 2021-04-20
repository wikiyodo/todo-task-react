import {
  requestAddTodos,
  requestCompleteTodos,
  requestDeleteTodos,
} from "../actions";

function reducer(state, payload) {
  switch (payload.type) {
    case "ADD_NEW":
      let { item } = payload;

      if (item == "") return state;
      requestAddTodos({ title: item }, (data) => {
        state.refresh(data);
      });

      item = { title: item, status: "pending" };
      state.list.push(item);
      return { ...state };
    case "COMPLETE":
      state.list[payload.id].status = "completed";

      requestCompleteTodos({ id: payload._id }, () => {
        state.refresh(payload.id);
      });

      return { ...state };
    case "DELETE":
      state.list[payload.id].status = "deleted";

      requestDeleteTodos({ id: payload._id }, () => {});

      return { ...state };
    case "GET":
      return { ...state, list: payload.data };
    default:
      return state;
  }
}

export default reducer;
