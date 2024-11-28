import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fruitlist from './components/Fruitlist';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Fruitlist />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
