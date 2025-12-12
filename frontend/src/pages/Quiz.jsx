import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
  Divider,
} from "@mui/material";

export default function Quiz() {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/quiz/${courseId}`, {
      headers: { Authorization: "Bearer " + token },
    });

    const data = await res.json();
    setQuestions(data);
  };

  const handleSelect = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const ansArray = questions.map((_, i) => answers[i] || "");

    const res = await fetch("http://localhost:5000/api/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        courseId,
        answers: ansArray,
      }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Course Quiz
      </Typography>

      {!result ? (
        <>
          {questions.map((q, index) => (
            <Card key={index} sx={{ mb: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {index + 1}. {q.question}
                </Typography>

                <RadioGroup
                  onChange={(e) => handleSelect(index, e.target.value)}
                >
                  {q.options.map((opt, i) => (
                    <FormControlLabel
                      key={i}
                      value={opt}
                      control={<Radio />}
                      label={opt}
                    />
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          {questions.length > 0 && (
            <Button variant="contained" size="large" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
        </>
      ) : (
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Quiz Result
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6">
            Score: <strong>{result.score}</strong>
          </Typography>

          <Typography variant="h6">
            Passing Marks: <strong>{result.passingMarks}</strong>
          </Typography>

          <Typography
            variant="h5"
            sx={{ mt: 2 }}
            color={result.passed ? "green" : "red"}
          >
            {result.passed ? "🎉 You Passed!" : "❌ You Failed"}
          </Typography>

          {result.passed && (
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => (window.location.href = `/certificate/${courseId}`)}
            >
              Download Certificate
            </Button>
          )}
        </Card>
      )}
    </Container>
  );
}
