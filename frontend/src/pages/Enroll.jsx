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

export default function Enroll() {
  const { id } = useParams(); // courseId
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    const res = await fetch(`http://localhost:5000/api/courses/${id}`);
    const data = await res.json();
    setCourse(data);
  };

  const handlePaymentAndEnroll = async () => {
    const token = localStorage.getItem("token");

    if (!token) return alert("Please login first!");

    try {
      // STEP 1: Make dummy payment
      const paymentRes = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ courseId: id, amount: course.price }),
      });

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok) {
        return alert("Payment failed!");
      }

      // STEP 2: Enroll user in the course
      const enrollRes = await fetch("http://localhost:5000/api/enroll/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ courseId: id }),
      });

      const enrollData = await enrollRes.json();

      if (!enrollRes.ok) {
        return alert("Enrollment failed: " + enrollData.message);
      }

      alert("Enrollment successful!");
      window.location.href = "/my-courses";

    } catch (err) {
      alert("Something went wrong!");
    }
  };

  if (!course) return <h3>Loading...</h3>;

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ p: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4">{course.title}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Price: ₹ {course.price}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {course.description}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handlePaymentAndEnroll}
            >
              Make Payment & Enroll
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
