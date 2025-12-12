import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Box,
} from "@mui/material";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/courses", {
      headers: { Authorization: "Bearer " + token },
    });

    const data = await res.json();
    setCourses(data);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete course?")) return;

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });

    alert("Course Deleted!");
    fetchCourses();
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Courses
      </Typography>

      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => (window.location.href = "/admin/courses/add")}
        >
          + Add Course
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Price</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>₹ {course.price}</TableCell>

              <TableCell>
                <Button
                  variant="outlined"
                  sx={{ mr: 1 }}
                  onClick={() =>
                    (window.location.href = `/admin/courses/edit/${course._id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
