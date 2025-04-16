import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import GeminiSp from "../pages/GeminiSp";
import AiAssistant from "../pages/AiAssistant";
import Login from "../pages/Auth/LoginPage";
import Register from "../pages/Auth/Register";

const AppRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Courses" element={<Courses />} />
      <Route path="/GeminiSp" element={<GeminiSp />} />
      <Route path="/AiAssistant" element={<AiAssistant />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register/>} />

      {/* <Route path="/Resources" element={<Resources />} />
      <Route path="/Research" element={<Research />} />
      <Route path="/Community" element={<Community />} />
      <Route path="/Docs" element={<Documentaries />} />
      <Route path="/Started" element={<Started />} /> */}
    </Routes>
  );
};

export default AppRouters;
