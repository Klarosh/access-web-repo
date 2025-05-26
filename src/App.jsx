import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import GameCard from "./components/GameCard";
import Store from "./components/Store";
import Footer  from "./components/Footer";
import Hidden  from "./components/hidden";
import Contact from "./components/Contact";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <About />
              <Features />
              <Contact />
              <GameCard />
              <Footer />
            </main>
          }
        />
        <Route path="/Hidden" element={<Hidden/> } />
        <Route path="/store" element={<Store/> } />
      </Routes>
    </Router>
  );
}

export default App;
