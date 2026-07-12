import { useEffect, useState } from "react";
import axios from "axios";

function StudentForm({
  onStudentAdded,
  editingStudent,
  onStudentUpdated,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    city: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
        city: editingStudent.city,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        course: "",
        city: "",
      });
    }
  }, [editingStudent]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const { name, email, course, city } = formData;

    if (!name || !email || !course || !city) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setSubmitting(true);

      if (editingStudent) {
        const response = await axios.put(
          `http://localhost:5001/api/students/${editingStudent._id}`,
          formData
        );

        onStudentUpdated(response.data);
      } else {
        const response = await axios.post(
          "http://localhost:5001/api/students",
          formData
        );

        onStudentAdded(response.data);
      }

      setFormData({
        name: "",
        email: "",
        course: "",
        city: "",
      });
    } catch (error) {
      setError(
        editingStudent
          ? "Could not update student."
          : "Could not add student."
      );

      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>

      {error && <p className="form-error">{error}</p>}

      <input
        className="form-input"
        type="text"
        name="name"
        placeholder="Student name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        className="form-input"
        type="email"
        name="email"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        className="form-input"
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
      />

      <input
        className="form-input"
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <button
        className="primary-button"
        type="submit"
        disabled={submitting}
      >
        {submitting
          ? editingStudent
            ? "Updating..."
            : "Adding..."
          : editingStudent
          ? "Update Student"
          : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;