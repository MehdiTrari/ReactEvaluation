import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Liste from './Liste';
import Detail from './Detail';
import Panier from './Panier';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Liste />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/panier" element={<Panier />} />
      </Routes>
    </Router>
  );
}

export default App;
