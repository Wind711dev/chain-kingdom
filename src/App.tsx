import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import HomeScreen from './screen/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
