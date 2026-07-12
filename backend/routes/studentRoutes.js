const express = require("express");
const {addStudent,getAllStudents,updateStudent,deleteStudent,} = require("../controllers/studentController");

const router = express.Router();

router.get("/", getAllStudents);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;