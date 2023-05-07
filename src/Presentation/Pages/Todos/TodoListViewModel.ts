import { useState } from "react";
import TodoAPIDataSourceImpl from "../../../Data/DataSource/API/TodoAPIDataSourceImpl";
import { TodoRepositoryImpl } from "../../../Data/Repository/TodoRepositoryImpl";
import { Todo } from "../../../Domain/Model/Todo";
import { GetTodos } from "../../../Domain/UseCase/Todo/GetTodos";

import { useAppSelector, useAppDispatch } from "@/Domain/Store/hooks";
import { decrement, increment } from "@/Domain/Reducer/counterSlice";

export default function TodoListViewModel() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const UseCase = new GetTodos(
    new TodoRepositoryImpl(new TodoAPIDataSourceImpl())
  );

  async function getTodos() {
    setTodos(await UseCase.invoke());
  }

  return {
    getTodos,
    todos,

    count,
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  };
}
