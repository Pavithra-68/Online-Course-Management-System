import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography, Box } from "@mui/material";

export default function Certificate() {
  const { courseId } = useParams();
  const [cert, setCert] = useState(null);

  useEffect(() => {
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/certificate/${courseId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    console.log("CERTIFICATE DATA:", data);
    setCert(data);
  };

  if (!cert) return <h2>Loading Certificate...</h2>;

  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <Paper
        elevation={5}
        sx={{
          padding: 5,
          border: "2px solid #333",
          width: "80%",
          margin: "auto",
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Certificate of Completion
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          This certificate is proudly presented to
        </Typography>

        <Typography variant="h4" fontWeight="bold" sx={{ my: 2 }}>
          {cert.studentName || "UNKNOWN STUDENT"}
        </Typography>

        <Typography variant="h6">
          for successfully completing the course
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ my: 2 }}>
          {cert.courseName || "UNKNOWN COURSE"}
        </Typography>

        <Typography variant="body1" sx={{ mt: 3 }}>
          Date Issued: {cert.issuedDate}
        </Typography>
      </Paper>
    </Container>
  );
}
