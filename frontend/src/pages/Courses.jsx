import { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";


export default function Courses() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

const fetchCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/courses", {
    headers: {
      Authorization: token ? "Bearer " + token : "",
    },
  });

  const data = await res.json();
  setCourses(data);
};



  const handleEnroll = async (courseId, enrolled) => {
  console.log("Enroll Clicked Course ID:", courseId);

  if (enrolled) {
    window.location.href = `/course/${courseId}`;
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first!");
    return;
  }

  const res = await fetch("http://localhost:5000/api/enroll/enroll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ courseId }),
  });

  const data = await res.json();
  console.log("Enroll Response:", data);

  // 🔥 NEW LOGIC: REDIRECT TO PAYMENT PAGE
  if (data.message?.includes("Payment not completed")) {
    alert("Redirecting to payment...");
    window.location.href = `/payment/${courseId}`;
    return;
  }

  if (res.status === 200) {
    alert("Enrolled Successfully!");
    window.location.href = "/my-courses";
  } else {
    alert(data.message || "Enrollment failed");
  }
};

  return (
    <Container sx={{ mt: 5 }}>
      {user?.role === "admin" && (
        <Button color="inherit" href="/admin/dashboard">
         Admin Panel
        </Button>
      )}

      <Typography variant="h4" sx={{ mb: 3 }}>
        Available Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card sx={{ boxShadow: 4 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/400x200/?coding,technology"
                alt={course.title}
              />

              <CardContent>
                <Typography variant="h6">{course.title}</Typography>

                <Typography variant="body2" sx={{ my: 1 }}>
                  {course.description}
                </Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  ₹ {course.price}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  {user?.role === "user" && (
                    <Button
                     variant="contained"
                     fullWidth
                     sx={{ mt: 2 }}
                     onClick={() => handleEnroll(course._id, course.enrolled)}
                    >
                     {course.enrolled ? "View Course" : "Enroll"}
                    </Button>
                  )}

                  {user?.role === "admin" && (
                    <>
                      <Button
                        variant="outlined"
                        sx={{ mb: 1 }}
                        fullWidth
                        onClick={() =>
                          (window.location.href = `/admin/edit/${course._id}`)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() =>
                          (window.location.href = `/admin/delete/${course._id}`)
                        }
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
