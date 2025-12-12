import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";

export default function AdminAddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/courses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title, description, price, content }),
    });

    const data = await res.json();
    alert(data.message);

    window.location.href = "/admin/dashboard";
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ p: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Add New Course
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Description"
              value={description}
              multiline
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextField
              label="Course Content"
              multiline
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Button variant="contained" onClick={handleAdd}>
              Add Course
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
