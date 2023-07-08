import { Todo } from "@/Domain/Model/Todo";

export interface TodoRepository {
  getTodos(): Promise<Todo[]>;
}
