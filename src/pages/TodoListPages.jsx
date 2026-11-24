import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import TodoModal from "../components/TodoModal";
import "./TodoListPages.css";

export default function TodoListPage({ todos, onAddTodo, onDeleteTodo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const showFeedback = (message) => {
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleAdd = (newTodoData) => {
    onAddTodo(newTodoData);
    showFeedback(`Tugas "${newTodoData.title}" berhasil ditambahkan!`);
  };

  const handleDelete = (todo) => {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus tugas "${todo.title}"?`
    );
    if (confirmed) {
      onDeleteTodo(todo.id);
      showFeedback(`Tugas "${todo.title}" berhasil dihapus.`);
    }
  };

  const truncateTitle = (text, maxLength = 25) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="list-container">
      {feedback && <div className="feedback-banner">{feedback}</div>}

      <div className="list-header">
        <h1 className="list-title">Todo List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-add-todo"
        >
          Tambah Todo
        </button>
      </div>

      <div className="table-wrapper">
        <table className="todo-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Deadline</th>
              <th className="col-action-header">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-row">
                  Belum ada tugas. Klik tombol "Tambah Todo" untuk membuat tugas baru.
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td className="col-title">{truncateTitle(todo.title)}</td>
                  <td>{todo.status}</td>
                  <td>{todo.priority}</td>
                  <td>{todo.deadline}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => navigate(`/todo/${todo.id}`)}
                        title="Lihat Detail"
                        className="btn-icon btn-view"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(todo)}
                        title="Hapus Tugas"
                        className="btn-icon btn-delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdd}
      />
    </div>
  );
}