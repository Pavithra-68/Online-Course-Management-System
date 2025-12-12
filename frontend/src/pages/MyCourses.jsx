import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login!");
      return (window.location.href = "/login");
    }

    const res = await fetch("http://localhost:5000/api/enroll/my-courses", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    setCourses(data);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        My Enrolled Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item._id}>
            <Card sx={{ p: 2, boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h5">
                  {item.courseId?.title}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  {item.courseId?.description}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  Price: ₹{item.courseId?.price}
                </Typography>

                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() =>
                    (window.location.href = `/course/${item.courseId._id}`)
                  }
                >
                  Start Course
                </Button>

                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() =>
                    (window.location.href = `/quiz/${item.courseId._id}`)
                  }
                >
                  Take Quiz
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
