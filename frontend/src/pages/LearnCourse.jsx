import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

export default function LearnCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    fetchCourse();
    checkEnrollment();
  }, []);

  const fetchCourse = async () => {
    const res = await fetch(`http://localhost:5000/api/courses/${id}`);
    const data = await res.json();

    // Split long content into sections based on "." or "\n"
    const sections = data.content.split(". ").map((s) => s.trim());
    data.sections = sections;

    setCourse(data);
  };

  const checkEnrollment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/enroll/my-courses", {
      headers: { Authorization: "Bearer " + token },
    });

    const data = await res.json();
    const enrolled = data.some((e) => e.courseId?._id === id);
    setIsEnrolled(enrolled);
  };

  if (!course) return <h2>Loading...</h2>;

  if (!isEnrolled)
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" color="error">
          You are not enrolled in this course.
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        {course.title}
      </Typography>

      <Box sx={{ display: "flex", gap: 3 }}>
        {/* LEFT SIDEBAR – CHAPTER LIST */}
        <Card sx={{ width: "30%", maxHeight: "80vh", overflowY: "auto", p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Course Chapters
          </Typography>

          <List>
            {course.sections.map((section, index) => (
              <div key={index}>
                <ListItem button>
                  <ListItemText primary={`Chapter ${index + 1}`} secondary={section.substring(0, 60) + "..."} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Card>

        {/* RIGHT SIDE – MAIN CONTENT */}
        <Card sx={{ width: "70%", p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Course Content
          </Typography>

          <CardContent sx={{ maxHeight: "70vh", overflowY: "auto" }}>
            {course.sections.map((section, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Chapter {index + 1}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {section}.
                </Typography>
              </Box>
            ))}
          </CardContent>

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button variant="outlined" size="large">
              Mark as Completed
            </Button>

            <Button
              variant="contained"
              size="large"
              onClick={() => (window.location.href = `/quiz/${course._id}`)}
            >
              Take Quiz
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
