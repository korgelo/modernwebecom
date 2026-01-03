import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import ListCategory from "./pages/ListCategory";
import DealFinder from "./pages/DealFinder";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            {/* Catch all for category pages (simulated) */}
            <Route path="/category/:cat" element={<ListCategory />} />
            <Route path="/deal" element={<DealFinder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
