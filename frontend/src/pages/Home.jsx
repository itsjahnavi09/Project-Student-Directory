import { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "../components/StudentForm";
import StudentCard from "../components/StudentCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchStudents() {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/students"
      );

      setStudents(response.data);
    } catch (error) {
      console.log("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  function handleStudentAdded(newStudent) {
    setStudents((previousStudents) => [
      newStudent,
      ...previousStudents,
    ]);

    setShowForm(false);
  }

  function handleEditStudent(student) {
    setEditingStudent(student);
    setShowForm(true);
  }

  function handleStudentUpdated(updatedStudent) {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student._id === updatedStudent._id
          ? updatedStudent
          : student
      )
    );

    setEditingStudent(null);
    setShowForm(false);
  }

  async function handleDeleteStudent(id) {
    try {
      await axios.delete(
        `http://localhost:5001/api/students/${id}`
      );

      setStudents((previousStudents) =>
        previousStudents.filter(
          (student) => student._id !== id
        )
      );
    } catch (error) {
      console.log("Failed to delete student:", error);
    }
  }

  function handleFormButton() {
    if (showForm) {
      setShowForm(false);
      setEditingStudent(null);
    } else {
      setEditingStudent(null);
      setShowForm(true);
    }
  }
  const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
  <main className="page">
    <header className="header">
      <div>
        <h1>Student Directory</h1>
        <p>Manage student information in one place.</p>
      </div>

      <button className="primary-button" onClick={handleFormButton}>
        {showForm ? "Close" : "Add Student"}
      </button>
    </header>

    {showForm && (
      <StudentForm
        onStudentAdded={handleStudentAdded}
        editingStudent={editingStudent}
        onStudentUpdated={handleStudentUpdated}
      />
    )}

    <section className="students-section">
      <div className="section-header">
        <h2>Students</h2>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {loading ? (
        <p className="status-message">Loading students...</p>
      ) : filteredStudents.length === 0 ? (
        <p className="status-message">No students found.</p>
      ) : (
        <div className="student-grid">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          ))}
        </div>
      )}
    </section>
  </main>
);
}

export default Home;