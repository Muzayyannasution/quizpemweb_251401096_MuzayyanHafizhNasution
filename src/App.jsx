import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialTodos } from "./data/dummyTodos";
import TodoListPage from "./pages/TodoListPages";
import TodoDetailPage from "./pages/TodoDetailPages";

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (newTodo) => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    const createdTodo = {
      id: nextId,
      ...newTodo,
    };
    setTodos((prev) => [createdTodo, ...prev]);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <TodoListPage
              todos={todos}
              onAddTodo={handleAddTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={
            <TodoDetailPage
              todos={todos}
              onUpdateTodo={handleUpdateTodo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}