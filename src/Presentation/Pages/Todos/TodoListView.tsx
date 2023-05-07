import React from "react";
import { useEffect } from "react";
import useViewModel from "./TodoListViewModel";

export default function TodoListView() {
  const { getTodos, todos, count, increment, decrement } = useViewModel();

  useEffect(() => {
    getTodos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <button onClick={increment}>+</button>
      <p>counter : {count}</p>
      <button onClick={decrement}>-</button>
      <br />
      <br />
      <br />

      {todos.map((todo) => (
        <div key={todo.id}>
          <span>{todo.title}</span>
          <span>{todo.isComplete ? "Completed" : "Not completed"}</span>
        </div>
      ))}
    </div>
  );
}
