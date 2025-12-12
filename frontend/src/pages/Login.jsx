import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) return alert(data.message || "Login failed");

      // Save token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); // <-- IMPORTANT

      alert("Login successful!");

      // Redirect based on role
      if (data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/courses";
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}
    >
      <Card sx={{ width: "100%", padding: 2, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ paddingY: 1.3 }}
            >
              Login
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, cursor: "pointer" }}
              onClick={() => (window.location.href = "/register")}
            >
              Don't have an account? Register
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
