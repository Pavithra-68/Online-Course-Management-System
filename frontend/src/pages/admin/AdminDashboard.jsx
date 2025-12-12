import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();  // <-- FIX

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

  const deleteCourse = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await res.json();
    alert(data.message);
    fetchCourses();
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Admin Dashboard
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => navigate("/admin/courses/add")}
      >
        Add New Course
      </Button>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course._id}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>

                <Button
                  variant="outlined"
                  sx={{ mr: 1 }}
                  onClick={() => navigate(`/admin/courses/edit/${course._id}`)}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteCourse(course._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
