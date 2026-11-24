import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoModal from "../components/TodoModal";
import "./TodoDetailPages.css";

export default function TodoDetailPage({ todos, onUpdateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const todo = todos.find((item) => String(item.id) === String(id));

  if (!todo) {
    return (
      <div className="detail-container">
        <p className="not-found-text">
          Tugas dengan ID #{id} tidak ditemukan.
        </p>
        <button onClick={() => navigate("/")} className="btn-return-home">
          Kembali ke Daftar Tugas
        </button>
      </div>
    );
  }

  const handleUpdate = (updatedData) => {
    onUpdateTodo(updatedData);
    setFeedback("Informasi tugas berhasil diperbarui!");
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div className="detail-container">
      {feedback && <div className="detail-feedback">{feedback}</div>}

      <div className="detail-card">
        <div className="detail-grid">
          <div className="detail-left">
            <div>
              <h3 className="detail-heading">Judul</h3>
              <p className="detail-title-text">{todo.title}</p>
            </div>

            <div>
              <h3 className="detail-heading">Deskripsi</h3>
              <div className="detail-desc-box">
                {todo.description || "Tidak ada deskripsi."}
              </div>
            </div>
          </div>

          <div className="detail-right">
            <div className="detail-meta-list">
              <div>
                <h4 className="meta-label">Status</h4>
                <p className="meta-value">{todo.status}</p>
              </div>

              <div>
                <h4 className="meta-label">Prioritas</h4>
                <p className="meta-value">{todo.priority}</p>
              </div>

              <div>
                <h4 className="meta-label">Deadline</h4>
                <p className="meta-value">{todo.deadline}</p>
              </div>
            </div>

            <div className="detail-actions">
              <button onClick={() => navigate("/")} className="btn-back">
                Kembali
              </button>
              <button
                onClick={() => setIsUpdateOpen(true)}
                className="btn-update"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        onSubmit={handleUpdate}
        initialData={todo}
      />
    </div>
  );
}