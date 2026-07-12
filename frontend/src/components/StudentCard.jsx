function StudentCard({ student, onDelete, onEdit }) {
  return (
    <article className="student-card">
      <div className="student-avatar">
        {student.name.charAt(0).toUpperCase()}
      </div>

      <div className="student-details">
        <h3>{student.name}</h3>
        <p>{student.email}</p>

        <div className="student-meta">
          <span>{student.course}</span>
          <span>{student.city}</span>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="edit-button"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(student._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default StudentCard;