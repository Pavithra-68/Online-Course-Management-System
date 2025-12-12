import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

export default function CourseView() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    fetchCourse();
    checkEnrollment();
  }, []);

  // Fetch course data
  const fetchCourse = async () => {
    const res = await fetch(`http://localhost:5000/api/courses/${id}`);
    const data = await res.json();
    setCourse(data);
  };

  // Check if user enrolled
  const checkEnrollment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/enroll/my-courses", {
      headers: { Authorization: "Bearer " + token },
    });

    const enrolledCourses = await res.json();

    const match = enrolledCourses.find(
      (item) => item.courseId?._id === id
    );

    setIsEnrolled(!!match);
  };

  if (!course) return <h2>Loading...</h2>;

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {course.title}
          </Typography>

          <Typography variant="h6" sx={{ mb: 1 }}>
            Price: ₹ {course.price}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {course.description}
          </Typography>

          <Typography variant="body2" sx={{ mb: 4 }}>
            <strong>Content:</strong> {course.content}
          </Typography>

          {/* USER BUTTONS */}
          {user?.role === "user" && (
            <>
              {!isEnrolled ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() =>
                    (window.location.href = `/enroll/${course._id}`)
                  }
                >
                  ENROLL NOW
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mb: 2 }}
                    onClick={() =>
                      (window.location.href = `/course/${course._id}/learn`)
                    }
                  >
                    Start Learning
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() =>
                      (window.location.href = `/quiz/${course._id}`)
                    }
                  >
                    Take Quiz
                  </Button>
                </>
              )}
            </>
          )}

          {/* ADMIN BUTTONS */}
          {user?.role === "admin" && (
            <Box>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() =>
                  (window.location.href = `/admin/edit/${course._id}`)
                }
              >
                Edit Course
              </Button>

              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() =>
                  (window.location.href = `/admin/delete/${course._id}`)
                }
              >
                Delete Course
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
