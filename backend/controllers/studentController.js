const Student = require("../models/Student");

const addStudent = async (req, res) => {
  try {
    const { name, email, course, city } = req.body;

    if (!name || !email || !course || !city) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const student = await Student.create({
      name,
      email,
      course,
      city,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add student",
      error: error.message,
    });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};
const updateStudent = async (req, res) => {
  try {
    const { name, email, course, city } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        course,
        city,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update student",
      error: error.message,
    });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
