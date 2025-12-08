import { BrowserRouter, Routes, Route, Link } from 'react-router';
import Home from './pages/Home.jsx';
import Vote from './pages/Vote.jsx';
import Result from './pages/Result.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/result" element={<Result />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
