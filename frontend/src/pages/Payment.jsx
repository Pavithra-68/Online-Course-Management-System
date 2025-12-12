import { useParams } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

export default function Payment() {
  const { courseId } = useParams();

  const completePayment = () => {
    alert("Payment Successful!");
    window.location.href = `/course/${courseId}`;
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Payment Page</Typography>
      <Typography sx={{ mt: 2 }}>
        Pay to enroll in course ID: {courseId}
      </Typography>

      <Button variant="contained" sx={{ mt: 3 }} onClick={completePayment}>
        Pay Now
      </Button>
    </Container>
  );
}
