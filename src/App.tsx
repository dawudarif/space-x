import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PastLaunches from './pages/PastLaunches';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route index path='/past-launches' element={<PastLaunches />} />
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
