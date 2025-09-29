// RouterPage.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import HomePage from "./HomePage";
import ConectUse from "./ConectUse";
import Cart from "./Cart";

function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ConectUse />} />

        {/* ברירת מחדל ל־Home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default RouterPage;
