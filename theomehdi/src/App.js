import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Liste from './pages/Liste';
import Detail from './pages/Detail';
import Panier from './pages/Panier';
import Layout from './components/Layout'; // Importer le Layout

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Liste />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/panier" element={<Panier />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
