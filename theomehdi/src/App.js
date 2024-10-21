import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Liste from './Liste';
import Detail from './Detail';
import Panier from './Panier';
import Layout from './Layout'; // Importer le Layout

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
