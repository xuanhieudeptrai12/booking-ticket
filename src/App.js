import './App.css';
import { createBrowserHistory } from 'history'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomeTemplate } from './teamplates/HomeTemplate/HomeTemplate'
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

export const history = createBrowserHistory();

function App() {

  return (
    <Router history={history}>
      <Routes>
        <Route path="/home" element={<HomeTemplate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomeTemplate />} />
      </Routes>
    </Router>
  )
}

export default App;