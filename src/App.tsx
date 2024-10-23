import React, { useEffect } from 'react';
import { useStore } from "./store/storeContext";



const TodoList = () => {

  const { todoStore, counterStore } = useStore();
  const { fetchTodos, todos, removeTodo, loading, error } = todoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
