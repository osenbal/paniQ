import { Todo } from "@/Domain/Model/Todo";
import { TodoRepository } from "@/Contracts/Repository/TodoRepository";
import TodoDataSource from "@/Contracts/DataSource/ITodoDataSource";

export class TodoRepositoryImpl implements TodoRepository {
  dataSource: TodoDataSource;

  constructor(_datasource: TodoDataSource) {
    this.dataSource = _datasource;
  }

  async getTodos(): Promise<Todo[]> {
    return this.dataSource.getTodos();
  }
}
