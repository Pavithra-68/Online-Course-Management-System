import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseView from "./pages/CourseView";
import Enroll from "./pages/Enroll";
import MyCourses from "./pages/MyCourses";
import Payment from "./pages/Payment";
import LearnCourse from "./pages/LearnCourse";
import Quiz from "./pages/Quiz";
import Certificate from "./pages/Certificates";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminAddCourse from "./pages/admin/AdminAddCourse";
import AdminEditCourse from "./pages/admin/AdminEditCourse";

function App() {
  return (
    <Routes>
      {/* Home shows courses */}
      <Route path="/" element={<Courses />} />

      {/* Important: /courses route */}
      <Route path="/courses" element={<Courses />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Single course view */}
      <Route path="/course/:id" element={<CourseView />} />
      <Route path="/enroll/:id" element={<Enroll />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/payment/:courseId" element={<Payment />} />
      <Route path="/course/:id/learn" element={<LearnCourse />} />
      <Route path="/quiz/:courseId" element={<Quiz />} />
      <Route path="/certificate/:courseId" element={<Certificate />} />
       {/* ADMIN ROUTES */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/courses" element={<AdminCourses />} />
      <Route path="/admin/courses/add" element={<AdminAddCourse />} />
      <Route path="/admin/courses/edit/:id" element={<AdminEditCourse />} />


    </Routes>
  );
}

export default App;

